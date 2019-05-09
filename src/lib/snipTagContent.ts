export function snipTagContent(
    tagName: string,
    source: string,
    placeholder: string | true = '',
): [string, string[]] {
    const regex = new RegExp(`<${tagName}([^]*?)>([^]*?)<\/${tagName}>`, 'gi');
    const tags: string[] = [];
    const text = source.replace(regex, (_, attributes, content) => {
        const encodedContext = Buffer.from(content).toString('base64');
        tags.push(
            `<${tagName}${attributes} ✂prettier:content✂="${encodedContext}">${
                placeholder === true ? content : placeholder
            }</${tagName}>`,
        );
        return '';
    });
    return [text, tags];
}
