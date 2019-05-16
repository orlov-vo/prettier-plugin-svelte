# Prettier for Svelte 3 components

Format your svelte components using prettier.

## Features

-   Format your html, css, and javascript using prettier
-   Format Svelte syntax, e.g. each loops, if statements, await blocks, etc.
-   Format the javascript expressions embedded in the svelte syntax
    -   e.g. expressions inside of `{}`, event bindings `on:click=""`, and more

## Different from [original](https://github.com/UnwrittenFun/prettier-plugin-svelte)

This fork:

-  Doesn't collapse non-closable tags like `<div></div>`
-  Have "true" order in components: scripts, template, styles
-  Generate valid attributes (example: `<div bind:value="{myValue}"></div>`)

## How to use

Install `@orlov_vo/prettier-plugin-svelte` as a dev dependency in your project.

```
npm install --save-dev @orlov_vo/prettier-plugin-svelte
```

Then format your code using prettier cli. You may need to add `--plugin-search-dir=.`

```
prettier --write --plugin-search-dir=. ./**/*.html
```

## Options

**`sort-order`** Sort order for scripts, html, and css. Defaults to `scripts-css-html`.

```
prettier --write --sort-order scripts-html-css ./**/*.svelte
```
