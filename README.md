# react-visual-docs-cli

## Setup & Usage


### 1. Install `react-visual-docs-cli`

(NOTE: packages are not yet published!)

Use `npm` or `yarn` to install react-visual-docs-cli and add it to your project's dev dependencies via the command prompt (Windows) or terminal (Mac/Linux).

```shell
$ npm install react-visual-docs-cli --save-dev
# or
$ yarn add react-visual-docs-cli --dev
```

NOTE: This package is designed to be used in conjunction with [react-visual-docs-ui](). You will find the install guide for that package on it's respective repo.

### 2. Add to your project's scripts

Add the following command to your project's scripts in the `package.json` file: `"docs": "react-visual-docs-cli"`.

**Example scripts from a `create-react-app` project:**
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject",
  "docs": "react-visual-docs-cli"
}
```

The command name (`docs` in the example above) can be anything you want.

### 3. Generate documentation

Run the newly-added `docs` command with npm or yarn:

```shell
$ npm run docs parse
# or
$ yarn run docs parse
```

The command above runs `react-visual-docs-cli parse` on your project's `src/` directory.   You can also pass an alternative path as a parameter if your source directory is differently named, or you if you want to only parse a subdirectory of your project:

```shell
$ npm run docs parse another/source-location
# or
$ yarn run docs parse another/source-location
```

### 4. Access the generated documentation

The generated documentation is saved at `/docs/visual-docs-data.json` from your project's root.

### 5. [Optional] Add to `.gitignore`

Since react-visual-docs-cli creates generated documentation, we recommend that you gitignore the generated files by adding this to your project's `.gitignore` file:
```
docs/visual-docs-data.json
```
