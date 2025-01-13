# Somewhat

Somewhat is a lightweight utility package that simplifies wildcard searches in JavaScript objects, DOM elements, and JSON. This package is ideal for developers who need quick and effective searching capabilities in their applications.

![npm version](https://img.shields.io/npm/v/somewhat) ![MIT License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Wildcard Search**: Supports flexible pattern matching.
- **Cross-Context Support**: Works with objects, JSON, and the DOM.
- **Lightweight**: Minimal dependencies for faster performance.

## Installation

Install the package via npm:

```bash
npm install --save-dev https://github.com/JustinLawrenceMS/somewhat 
```

## Quick Start

```javascript
import Somewhat from "somewhat";

const obj = { a: "apple", b: "banana" };
const searcher = new Somewhat();
const results = searcher.searchObject(obj, "a*");

console.log(results); // Output: [ { path: "a", value: "apple" } ]
```

## Usage

### Searching Objects

You can use `Somewhat` to search JavaScript objects:

```javascript
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
const results = searcher.searchDOM(document.body, "data-*");
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

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## Support

If you encounter issues, please open an issue on [GitHub](https://github.com/JustinLawrenceMS/somewhat/issues).

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Donate

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.com/donate/?business=XL47W3LL7V2A2&no_recurring=0&item_name=Buy+a+WordPress+developer+a+coffee.+This+is+100+percent+optional.&currency_code=USD)
