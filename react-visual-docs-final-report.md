# React Visual Docs: Known Issues & Future Improvements

Author: David Leger
Date:   28 August, 2017

---

## Introduction

This report outlines the current state of the React Visual Docs project, providing details about known issues and future improvements of the project.

---

## React Visual Docs CLI

The [React Visual Docs CLI](_) is used to parse the codebase of an existing React.js project and generate JSON documentation programatically.

In this section, I discuss the known issues with the React Visual Docs CLI.

#### Direct Exports & Implicit Indexes

A feature in [ECMA-Script stage-1]() allows JavaScript modules to immediately export an imported file with the follwoing syntax:

```js
// ES stage-1 feature
export Module from './Module';
```

This a cleaner alternative to the current ES2016 equivalent syntax:

```js
// ES2016 feature
import Module from './Module';

export { Module };
```

This feature is useful for grouping a directory's exported modules into a single `index.js` file, making importing from a directory easier.

However, this creates an issue when querying an Abstract Syntax Tree (AST) for imports since the syntax is not an `import`. It is parsed differently than traditional import statements and so these types of imports get missed in the import extraction process. This is evident when viewing the interdependency graph in the React Visual Docs UI.

To fix this issue it would be necessary to identify the AST structure produced by this statement and extract it along with the other import statements.


#### Production Build

Before the project can be released as an npm package I have to decide how to build the project for production. Currently users must download and build the project themselves, and link it as a global npm package before they can use it.

Looking at how other npm packages manage this workflow will guide me to a solution in this project.

#### Flow Type Support

The parser does not recognize syntax for Flow types and crashes.

Support for flow types can be added to the parser via Babel plugins.

---

## React Visual Docs UI

The [React Visual Docs UI](_) is a web app that consumes output produced by React Visual Docs CLI and displays it in an easy to navigate UI.

In this section, I discuss the known issues with the React Visual Docs CLI.

#### Orphan Files

When the project is parsed, it creates a document consisting of all files in a directory and its subdirectories, then it proceeds to derive from this document a dependency map for consumption by the D3.js to produce an interdependency graph. The issue is that if a file has no interdependencies (does not import anything and is not imported itself), it is omitted by in the generated dependency map. However, D3 also derives nodes itself from the dependency map.

The solution to this is to have D3 consume the original document that is generated from the parser as graph nodes and derive a dependency map from the nodes.

#### Dynamically Resizing the Graph

When the browser window is resized, the graph doesn't re-render to fill the available space.

I'm unsure of the solution for this at the moment. More investigation is required.

#### Loading a Dynamic Data File

The UI currently cannot access the local file system while running so `/docs.json` is imported as a standard module. This is rather inconvenient since the user will have to run the UI in dev mode in order to modify the data viewed in the UI.

#### Production build

Like the CLI, the UI also needs to be converted to a production build for publishing and needs to have the ability to launch from the command line and opposed to the current create-react-app dev environment.

#### Complex Prop Types

The UI can handle all primitive props types, but not complex prop types like objects and arrays with explicitly typed fields and values.
