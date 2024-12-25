"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Somewhat.js
 * A helper for recursively searching through objects and DOM elements.
 * Officially created by Justin Lawrence, MS, but actually created by our chatbot overlords.
 * Licensed under the GNU General Public License v2.0.
 */
var Somewhat = /*#__PURE__*/function () {
  function Somewhat() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    _classCallCheck(this, Somewhat);
    this.value = value;
    this.pattern = pattern;
  }

  /**
   * Matches a string against a wildcard pattern.
   * @param {string} value - The string to test.
   * @param {string} pattern - The wildcard pattern to match against.
   * @returns {boolean} - True if the string matches the pattern.
   */
  return _createClass(Somewhat, [{
    key: "matchWithWildcard",
    value: function matchWithWildcard(value, pattern) {
      var regexPattern = new RegExp("^".concat(pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, "."), "$"));
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
  }, {
    key: "searchObject",
    value: function searchObject(obj) {
      var _this = this;
      var searchTerm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.pattern;
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var visited = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Set();
      var results = [];
      if (visited.has(obj)) {
        return results;
      }
      visited.add(obj);
      var keys = _toConsumableArray(new Set([].concat(_toConsumableArray(Object.keys(obj)), _toConsumableArray(Object.getOwnPropertyNames(obj)))));
      var _iterator = _createForOfIteratorHelper(keys),
        _step;
      try {
        var _loop = function _loop() {
          var key = _step.value;
          var currentPath = path ? "".concat(path, ".").concat(key) : key;
          try {
            var value = obj[key];
            if (_typeof(value) === "object" && value !== null) {
              results = results.concat(_this.searchObject(value, searchTerm, currentPath, visited));
            } else {
              if (_this.matchWithWildcard(key, searchTerm) || typeof value === "string" && _this.matchWithWildcard(value, searchTerm)) {
                // Add unique results only
                var result = {
                  path: String(currentPath),
                  value: String(value)
                };
                if (!results.some(function (r) {
                  return r.path === result.path && r.value === result.value;
                })) {
                  results.push(result);
                }
              }
            }
          } catch (e) {
            console.warn("Could not access property ".concat(currentPath, ": ").concat(e.message));
          }
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
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
  }, {
    key: "searchDOM",
    value: function searchDOM(element) {
      var _this2 = this;
      var searchTerm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.pattern;
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var results = [];

      // Search attributes
      if (element.attributes) {
        var _iterator2 = _createForOfIteratorHelper(element.attributes),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var attr = _step2.value;
            var attrPath = "".concat(path, "@").concat(attr.name);
            if (this.matchWithWildcard(attr.name, searchTerm) || this.matchWithWildcard(attr.value, searchTerm)) {
              results.push({
                path: attrPath,
                value: attr.value
              });
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      // Search the node's content
      if (element.textContent && element.textContent.trim()) {
        var trimmedContent = element.textContent.trim();
        if (this.matchWithWildcard(trimmedContent, searchTerm)) {
          results.push({
            path: "".concat(path, ".textContent"),
            value: trimmedContent
          });
          return results; // Stop further traversal if a match is found in this node
        }
      }

      // Recursively search child nodes
      if (element.children) {
        Array.from(element.children).forEach(function (child, index) {
          var childPath = "".concat(path, ".children[").concat(index, "]");
          results = results.concat(_this2.searchDOM(child, searchTerm, childPath));
        });
      }
      return results;
    }

    /**
     * Searches the global `document` object for matches.
     * @param {string} [searchTerm=this.pattern] - The wildcard pattern to search for.
     * @returns {Array<{path: string, value: any}>} - Array of matching paths and values.
     */
  }, {
    key: "searchDocument",
    value: function searchDocument() {
      var searchTerm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.pattern;
      if (typeof document === "undefined") {
        console.warn("The 'document' object is not available in this environment.");
        return [];
      }
      return this.searchDOM(document, searchTerm);
    }
  }]);
}();
modules["export"] = Somewhat;