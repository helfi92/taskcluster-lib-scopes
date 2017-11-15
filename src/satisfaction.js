import assert from 'assert';
import {validateScopeSets} from './validate';

function validateScopePatterns(scopePatterns) {
  assert(scopePatterns instanceof Array && scopePatterns.every((scope) => {
    return typeof scope === 'string';
  }), 'scopes must be an array of strings');
}

/**
 * Auxiliary function to check if scopePatterns satisfies a scope-set
 *
 * Note that scopesets is an array of arrays of strings. For example:
 *  [['a', 'b'], ['c']]
 *
 * Is satisfied if either,
 *  i)  'a' and 'b' is satisfied, or
 *  ii) 'c' is satisfied.
 *
 * Also expressed as ('a' and 'b') or 'c'.
 */
exports.scopeMatch = function(scopePatterns, scopesets) {
  validateScopeSets(scopesets);
  validateScopePatterns(scopePatterns);

  return scopesets.some(function(scopeset) {
    return scopeset.every(function(scope) {
      return scopePatterns.some(function(pattern) {
        if (scope === pattern) {
          return true;
        }
        if (/\*$/.test(pattern)) {
          return scope.indexOf(pattern.slice(0, -1)) === 0;
        }
        return false;
      });
    });
  });
};
