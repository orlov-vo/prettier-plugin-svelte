import test, { ExecutionContext } from 'ava';
import { readdirSync, readFileSync } from 'fs';
import { format } from 'prettier';

const tests = readdirSync('test/printer/samples').filter(name => name.endsWith('.html'));

for (const file of tests) {
    const input = readFileSync(`test/printer/samples/${file}`, 'utf-8').replace(/\r?\n/g, '\n');

    test(`printer ${file.slice(0, file.length - '.html'.length)}`, t => testPrint(input, t));
}

function testPrint(input: string, t: ExecutionContext<any>) {
    const actualOutput = format(input, {
        parser: 'svelte' as any,
        plugins: [require.resolve('../../src')],
        tabWidth: 4,
        sveltePath: require.resolve('svelte/compiler'),
    } as any);
    t.is(input, actualOutput);
}
