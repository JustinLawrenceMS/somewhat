const Somewhat = require("../SomewhatEffective.js");

test("hello world!", () => {
  expect(1 + 1).toBe(2);
});

test("helper searches object", () => {
  const obj = {
    a: "apple",
    b: {
      c: "cat",
      d: "dog",
    },
    e: "elephant",
  };

  const searcher = new Somewhat();

  // Test for a key that starts with 'a'
  const resultsA = searcher.searchObject(obj, "a*");
  expect(resultsA).toEqual([{ path: "a", value: "apple" }]);

  // Test the count of results
  expect(resultsA.length).toBe(1);

  // Test for a value that ends with 'at'
  const resultsCat = searcher.searchObject(obj, "*at");
  expect(resultsCat).toEqual([{ path: "b.c", value: "cat" }]);

  // Test the count of results
  expect(resultsCat.length).toBe(1);
});

test("matchWithWildcard method", () => {
  const searcher = new Somewhat();

  // Exact match
  expect(searcher.matchWithWildcard("apple", "apple")).toBe(true);

  // Wildcard match
  expect(searcher.matchWithWildcard("apple", "a*")).toBe(true);
  expect(searcher.matchWithWildcard("apple", "*e")).toBe(true);
  expect(searcher.matchWithWildcard("apple", "a?ple")).toBe(true);

  // No match
  expect(searcher.matchWithWildcard("apple", "b*")).toBe(false);
  expect(searcher.matchWithWildcard("apple", "a*p")).toBe(false);
});

test("searchDOM method", () => {
  document.body.innerHTML = `
    <div id="test-container">
      <p class="test-class">Hello, world!</p>
      <span data-attr="test">Some text</span>
    </div>
  `;

  const searcher = new Somewhat();

  // Search for attributes
  const resultsAttr = searcher.searchDOM(document.body, "*-attr");
  expect(resultsAttr).toEqual([
    { path: ".childNodes[1].childNodes[3]@data-attr", value: "test" },
  ]);
  expect(resultsAttr.length).toBe(1);
});