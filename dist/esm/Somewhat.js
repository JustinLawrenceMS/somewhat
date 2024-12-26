var module = {
  exports: {}
};
var exports = module.exports;
/**
 * Somewhat.js
 * A helper for recursively searching through objects and DOM elements.
 * Officially created by Justin Lawrence, MS, but actually created by our chatbot overlords.
 * Licensed under the GNU General Public License v2.0.
 */
class Somewhat {
  constructor(value = null, pattern = "") {
    this.value = value;
    this.pattern = pattern;
  }

  /**
   * Matches a string against a wildcard pattern.
   * @param {string} value - The string to test.
   * @param {string} pattern - The wildcard pattern to match against.
   * @returns {boolean} - True if the string matches the pattern.
   */
  matchWithWildcard(value, pattern) {
    const regexPattern = new RegExp(`^${pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".")}$`);
    return regexPattern.test(value);
  }

  /**
   * Recursively searches an object for keys or values matching a pattern.
   * @param {object} obj - The object to search.
   * @param {string} searchTerm - The wildcard pattern to search for.
   * @param {string} [path=""] - The current path in the object tree.
   * @param {Set} [visited=new Set()] - Set of visited objects to prevent circular references.
   * @returns {Array<{path: string, value: any}>} - Array of matching paths and values.
   */
  searchObject(obj, searchTerm = this.pattern, path = "", visited = new Set()) {
    let results = [];
    if (visited.has(obj)) {
      return results;
    }
    visited.add(obj);
    const keys = [...new Set([...Object.keys(obj), ...Object.getOwnPropertyNames(obj)])];
    for (const key of keys) {
      const currentPath = path ? `${path}.${key}` : key;
      try {
        const value = obj[key];
        if (typeof value === "object" && value !== null) {
          results = results.concat(this.searchObject(value, searchTerm, currentPath, visited));
        } else {
          if (this.matchWithWildcard(key, searchTerm) || typeof value === "string" && this.matchWithWildcard(value, searchTerm)) {
            // Add unique results only
            const result = {
              path: String(currentPath),
              value: String(value)
            };
            if (!results.some(r => r.path === result.path && r.value === result.value)) {
              results.push(result);
            }
          }
        }
      } catch (e) {
        console.warn(`Could not access property ${currentPath}: ${e.message}`);
      }
    }
    return results;
  }

  /**
   * Recursively searches the DOM for attributes or text content matching a pattern.
   * @param {Element} element - The DOM element to search.
   * @param {string} searchTerm - The wildcard pattern to search for.
   * @param {string} [path=""] - The current path in the DOM tree.
   * @returns {Array<{path: string, value: any}>} - Array of matching paths and values.
   */
  searchDOM(element, searchTerm = this.pattern, path = "") {
    let results = [];

    // Search attributes
    if (element.attributes) {
      for (const attr of element.attributes) {
        const attrPath = `${path}@${attr.name}`;
        if (this.matchWithWildcard(attr.name, searchTerm) || this.matchWithWildcard(attr.value, searchTerm)) {
          results.push({
            path: attrPath,
            value: attr.value
          });
        }
      }
    }

    // Search the node's content
    if (element.textContent && element.textContent.trim()) {
      const trimmedContent = element.textContent.trim();
      if (this.matchWithWildcard(trimmedContent, searchTerm)) {
        results.push({
          path: `${path}.textContent`,
          value: trimmedContent
        });
        return results; // Stop further traversal if a match is found in this node
      }
    }

    // Recursively search child nodes
    if (element.children) {
      Array.from(element.children).forEach((child, index) => {
        const childPath = `${path}.children[${index}]`;
        results = results.concat(this.searchDOM(child, searchTerm, childPath));
      });
    }
    return results;
  }

  /**
   * Searches the global `document` object for matches.
   * @param {string} [searchTerm=this.pattern] - The wildcard pattern to search for.
   * @returns {Array<{path: string, value: any}>} - Array of matching paths and values.
   */
  searchDocument(searchTerm = this.pattern) {
    if (typeof document === "undefined") {
      console.warn("The 'document' object is not available in this environment.");
      return [];
    }
    return this.searchDOM(document, searchTerm);
  }
}
module.exports = Somewhat;
export default module.exports;