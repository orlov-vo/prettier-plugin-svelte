import { SupportLanguage, Parser, Printer, SupportOption } from 'prettier';
import { print } from './print';
import { embed } from './embed';
import { snipTagContent } from './lib/snipTagContent';

function locStart(node: any) {
    return node.start;
}

function locEnd(node: any) {
    return node.end;
}

export const languages: Partial<SupportLanguage>[] = [
    {
        name: 'svelte',
        parsers: ['svelte'],
        extensions: ['.svelte', '.html'],
        vscodeLanguageIds: ['html'],
    },
];

export const parsers: Record<string, Parser> = {
    svelte: {
        parse: text => {
            return require('svelte/compiler').compile(text, { generate: false }).ast;
        },
        preprocess: text => {
            let styles: string[] = [];
            let scripts: string[] = [];
            [text, styles] = snipTagContent('style', text);
            [text, scripts] = snipTagContent('script', text, true);
            return [...scripts, text.trim(), ...styles].join('');
        },
        locStart,
        locEnd,
        astFormat: 'svelte-ast',
    },
};

export const printers: Record<string, Printer> = {
    'svelte-ast': {
        print,
        embed,
    },
};
