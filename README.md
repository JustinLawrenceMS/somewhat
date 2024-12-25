# Somewhat

`Somewhat` 

## Features

- Match keys and values in objects using wildcard patterns.
- Search through DOM elements and their attributes.
- Search the entire `document` for matching text or attributes.

## Installation

```bash
npm install https://github.com/JustinLawrenceMS/somewhat
```

## Usage

### Import the Class

```javascript
const Somewhat = require('somewhat');
```

### Basic Example

#### Object Search

```javascript
const obj = {
  a: "apple",
  b: {
    c: "cat",
    d: "dog",
  },
  e: "elephant",
};

const searcher = new Somewhat();
const results = searcher.searchObject(obj, "a*");
console.log(results);
// Output: [ { path: "a", value: "apple" } ]
```

#### DOM Search

```javascript
// Example HTML
// <div id="test-container">
//   <p class="test-class">Hello, world!</p>
//   <span data-attr="test">Some text</span>
// </div>

document.body.innerHTML = `
  <div id="test-container">
    <p class="test-class">Hello, world!</p>
    <span data-attr="test">Some text</span>
  </div>
`;

const results = searcher.searchDOM(document.body, "*class");
console.log(results);
// Output: [ { path: ".children[0]@class", value: "test-class" } ]
```

#### Document Search

```javascript
const results = searcher.searchDocument("*world*");
console.log(results);
// Output: [ { path: ".children[0].children[0].textContent", value: "Hello, world!" } ]
```

### Match with Wildcards

```javascript
console.log(searcher.matchWithWildcard("apple", "a*")
// Output: true

console.log(searcher.matchWithWildcard("banana", "*na")
// Output: true

console.log(searcher.matchWithWildcard("grape", "*ap*")
// Output: true
```

## API

### `matchWithWildcard(value, pattern)`

Matches a string value against a wildcard pattern where:
- `*` matches any number of characters.
- `?` matches a single character.

**Parameters:**
- `value` (string): The value to match.
- `pattern` (string): The wildcard pattern to match against.

**Returns:**
- `boolean`: `true` if the value matches the pattern, `false` otherwise.

### `searchObject(obj, searchTerm, path = "", visited = new Set())`

Recursively searches an object for keys or values that match a wildcard pattern.

**Parameters:**
- `obj` (object): The object to search.
- `searchTerm` (string): The wildcard pattern to match.
- `path` (string): Current traversal path (used internally).
- `visited` (Set): Tracks visited nodes to prevent circular references.

**Returns:**
- `Array`: An array of objects with matching paths and values.

### `searchDOM(element, searchTerm, path = "")`

Recursively searches a DOM element and its children for matching attributes or text content.

**Parameters:**
- `element` (HTMLElement): The DOM element to search.
- `searchTerm` (string): The wildcard pattern to match.
- `path` (string): Current traversal path (used internally).

**Returns:**
- `Array`: An array of objects with matching paths and values.

### `searchDocument(searchTerm)`

Searches the entire `document` for matching attributes or text content.

**Parameters:**
- `searchTerm` (string): The wildcard pattern to match.

**Returns:**
- `Array`: An array of objects with matching paths and values.

## Testing

The project includes unit tests written with [Jest](https://jestjs.io/). To run the tests:

```bash
npm test
```

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

