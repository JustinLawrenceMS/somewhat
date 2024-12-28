# Somewhat

Somewhat is a lightweight utility package that simplifies wildcard searches in JavaScript objects, DOM elements, and JSON. This package is ideal for developers who need quick and effective searching capabilities in their applications.

## Installation

Install the package via npm:

```bash
npm install --save-dev https://github.com/JustinLawrenceMS/somewhat 
```

## Usage

### Importing the Package

Use the following import statement in an ESModule-compatible environment:

```javascript
import Somewhat from "somewhat";
```

### Searching Objects

You can use `Somewhat` to search JavaScript objects:

```javascript
const searcher = new Somewhat();
const obj = {
  a: "apple",
  b: "banana",
  c: "cherry",
};

const results = searcher.searchObject(obj, "a*");
console.log(results);
// Output: [ { path: "a", value: "apple" } ]
```

### Searching the DOM

Search the DOM for elements matching a wildcard pattern:

```javascript
// Assuming the DOM contains:
// <div id="test-container">
//   <p class="test-class">Hello, world!</p>
//   <span data-attr="test">Some text</span>
// </div>

const results = searcher.searchDOM(document.body, "*-attr");
console.log(results);
// Output: [ { path: ".children[0].children[1]@data-attr", value: "test" } ]
```

### Searching JSON

You can search JSON data using the same method as objects:

```javascript
const jsonData = {
  a: "apple",
  b: "banana",
  nested: {
    c: "cherry",
  },
};

const results = searcher.searchObject(jsonData, "*erry");
console.log(results);
// Output: [ { path: "nested.c", value: "cherry" } ]
```

### Searching the Entire Document

Search the entire document for text content matching a pattern:

```javascript
const results = searcher.searchDocument("*world*");
console.log(results);
// Output: [ { path: ".children[0].textContent", value: "Hello, world!" } ]
```

## Testing

Run the tests using Jest:

```bash
npm test
```

## Build

To build the package for both CommonJS and ESM:

```bash
npm run build
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

