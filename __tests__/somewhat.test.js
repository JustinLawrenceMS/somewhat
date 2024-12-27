const Somewhat = require("../src/Somewhat.js");

describe("Somewhat class tests", () => {
  let searcher;

  beforeEach(() => {
    searcher = new Somewhat();
    document.body.innerHTML = `
      <div id="test-container">
        <p class="test-class">Hello, world!</p>
        <span data-attr="test">Some text</span>
      </div>
    `;
  });

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

    const resultsA = searcher.searchObject(obj, "a*");
    expect(resultsA).toMatchObject([{ path: "a", value: "apple" }]);
    expect(resultsA.length).toBe(1);

    const resultsCat = searcher.searchObject(obj, "*at");
    expect(resultsCat).toMatchObject([{ path: "b.c", value: "cat" }]);
    expect(resultsCat.length).toBe(1);
  });

  test("matchWithWildcard method", () => {
    expect(searcher.matchWithWildcard("apple", "a*")).toBe(true);
    expect(searcher.matchWithWildcard("cat", "*at")).toBe(true);
    expect(searcher.matchWithWildcard("dog", "*at")).toBe(false);
  });

  test("searchDOM method", () => {
    // Mock document content
    document.body.innerHTML = `
      <div id="test-container">
        <p class="test-class">Hello, world!</p>
        <span data-attr="test">Some text</span>
      </div>
    `;
  
    const searcher = new Somewhat();
  
    // Search for attributes
    const resultsAttr = searcher.searchDOM(document.body, "*-attr");
    expect(resultsAttr).toMatchObject([
      { path: ".children[0].children[1]@data-attr", value: "test" },
    ]);
    expect(resultsAttr.length).toBe(1);
  
    // Search for text content
    const resultsText = searcher.searchDOM(document.body, "*Hello*");
    expect(resultsText).toMatchObject([
      { path: ".children[0].children[0].textContent", value: "Hello, world!" },
    ]);
    expect(resultsText.length).toBe(1);
  });
  
  test("searchDocument method", () => {
    // Mock document content
    document.body.innerHTML = `
      <div>
        Hello, world!
      </div>
    `;
  
    const searcher = new Somewhat();
    const results = searcher.searchDocument("*world*");
  
    expect(results).toMatchObject([
      { path: ".children[0].textContent", value: "Hello, world!" },
    ]);
    expect(results.length).toBe(1);
  });
}); 