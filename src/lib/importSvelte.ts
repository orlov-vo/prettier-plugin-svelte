export function importSvelte(importPath: string) {
    const svelte = require(importPath);

    return {
        parse(text: string) {
            return svelte.compile(text, { generate: false }).ast;
        },
    };
}
