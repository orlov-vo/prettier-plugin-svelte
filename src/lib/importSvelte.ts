export function importSvelte(importPath: string) {
    const svelte = require(`${importPath}/compiler`);

    return {
        parse(text: string) {
            return svelte.compile(text, { generate: false }).ast;
        },
    };
}
