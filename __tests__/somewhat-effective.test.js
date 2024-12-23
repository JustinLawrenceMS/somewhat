const Somewhat = require('../SomewhatEffective.js');

test('hello world!', () => {
	expect(1 + 1).toBe(2);
});

test('helper searches object', () => {
	const obj = {
		a: "apple",
		b: {
		  c: "cat",
		  d: "dog"
		},
		e: "elephant"
	  };
	  
	  const searcher = new Somewhat();
	  expect(searcher.searchObject(obj, "a*")).toEqual([{ path: "a", value: "apple" }] );
	  expect(searcher.searchObject(obj, "*at")).toEqual([{ path: "b.c", value: "cat" }] );
});