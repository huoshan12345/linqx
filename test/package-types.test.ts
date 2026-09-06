import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { expect, test } from 'vitest';

test.each(['NodeNext', 'Bundler'] as const)(
  'published declarations support strict %s consumers',
  moduleResolution => {
    const root = resolve(import.meta.dirname, '..');
    const cacheRoot = join(root, 'node_modules', '.cache');
    const require = createRequire(import.meta.url);
    const compiler = join(dirname(require.resolve('typescript/package.json')), 'bin', 'tsc');
    mkdirSync(cacheRoot, { recursive: true });
    const temporary = mkdtempSync(join(cacheRoot, 'linqx-package-types-'));

    function compile(args: string[]): void {
      const result = spawnSync(process.execPath, [compiler, ...args], {
        cwd: root,
        encoding: 'utf8',
        windowsHide: true,
        timeout: 30_000,
      });
      if (result.error) {
        throw result.error;
      }
      expect(result.status, `${result.stdout}\n${result.stderr}`).toBe(0);
    }

    try {
      const packageRoot = join(temporary, 'node_modules', 'linqx');
      mkdirSync(packageRoot, { recursive: true });
      writeFileSync(join(packageRoot, 'package.json'), readFileSync(join(root, 'package.json')));
      compile(['-p', 'tsconfig.build.json', '--outDir', join(packageRoot, 'dist')]);
      writeFileSync(join(temporary, 'package.json'), JSON.stringify({ type: 'module' }));
      writeFileSync(join(temporary, 'consumer.ts'), [
        "import { Enumerable } from 'linqx';",
        "import 'linqx/extensions';",
        'const sequence: Enumerable.IEnumerable<number> = Enumerable.from([1, 2]).select(x => x * 2);',
        'const array: Enumerable.IEnumerable<number> = [1, 2].asEnumerable();',
        'const map: Enumerable.IEnumerable<[string, number]> = new Map<string, number>().asEnumerable();',
        "const element = document.createElement('div');",
        'const attributes: Enumerable.IEnumerable<Attr> = element.attributes.asEnumerable();',
        'const nodes: Enumerable.IEnumerable<Node> = element.childNodes.asEnumerable();',
        'const children: Enumerable.IEnumerable<Element> = element.children.asEnumerable();',
        '// @ts-expect-error Extension return types must preserve their element type.',
        'const strings: Enumerable.IEnumerable<string> = [1, 2].asEnumerable();',
        'void [sequence, array, map, attributes, nodes, children, strings];',
      ].join('\n'));
      const config = join(temporary, 'tsconfig.json');
      writeFileSync(config, JSON.stringify({
        compilerOptions: {
          target: 'ES2021',
          module: moduleResolution === 'NodeNext' ? 'NodeNext' : 'ESNext',
          moduleResolution,
          strict: true,
          skipLibCheck: false,
          noEmit: true,
          types: [],
          lib: ['ESNext', 'DOM', 'DOM.Iterable'],
        },
        files: ['consumer.ts'],
      }, null, 2));
      compile(['-p', config]);
    } finally {
      if (dirname(temporary) === cacheRoot) {
        rmSync(temporary, { recursive: true, force: true });
      }
    }
  },
  60_000,
);
