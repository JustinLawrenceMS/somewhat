/*
 *   SomewhatEffective.js
 *   Lets you recursively search through large objects,
 *   including window and document.
 *   Officially created by Justin Lawrence, MS,
 *   but actually created by our chatbot overlords.
 *   Licensed under the GNU General Public License v2.0.
 */
class Somewhat {
    constructor(value = null, pattern = null) {
      this.value = value;
      this.pattern = pattern;
    }
  
    /**
     * Match a string against a wildcard pattern.
     * @param {string} value - The string to test.
     * @param {string} pattern - The wildcard pattern to match against.
     * @returns {boolean} - True if the string matches the pattern.
     */
    matchWithWildcard(value, pattern) {
      const regexPattern = new RegExp(
        `^${pattern
          .replace(/[.+^${}()|[\]\\]/g, "\\$&")
          .replace(/\*/g, ".*")
          .replace(/\?/g, ".")}$`
      );
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
      for (const key of Object.keys(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        try {
          const value = obj[key];
          if (typeof value === "object" && value !== null) {
            results = results.concat(
              this.searchObject(value, searchTerm, currentPath, visited)
            );
          } else {
            if (
              this.matchWithWildcard(key, searchTerm) ||
              (typeof value === "string" && this.matchWithWildcard(value, searchTerm))
            ) {
              results.push({ path: currentPath, value: value });
            }
          }
        } catch (e) {
          console.warn(`Could not access property ${currentPath}: ${e.message}`);
        }
      }
      return results;
    }
  }

module.exports = Somewhat;
  