import test, { ExecutionContext } from 'ava';
import { readdirSync, readFileSync } from 'fs';
import { format } from 'prettier';

const commonTests = readdirSync('test/printer/samples').filter(name => name.endsWith('.html'));
const v3Tests = readdirSync('test/printer/samples/v3').filter(name => name.endsWith('.html'));

for (const file of commonTests) {
    const input = readFileSync(`test/printer/samples/${file}`, 'utf-8').replace(/\r?\n/g, '\n');

    test(`printer::common(v3): ${file.slice(0, file.length - '.html'.length)}`, t =>
        testV3(input, t));
}

for (const file of v3Tests) {
    const input = readFileSync(`test/printer/samples/v3/${file}`, 'utf-8').replace(/\r?\n/g, '\n');

    test(`printer::v3: ${file.slice(0, file.length - '.html'.length)}`, t => testV3(input, t));
}

function testV3(input: string, t: ExecutionContext<any>) {
    const actualOutput = format(input, {
        parser: 'svelte' as any,
        plugins: [require.resolve('../../src')],
        tabWidth: 4,
        sveltePath: require.resolve('svelte/compiler'),
    } as any);
    t.is(input, actualOutput);
}
