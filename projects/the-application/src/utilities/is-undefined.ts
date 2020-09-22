/**
 * Check if a value is undefined.
 *
 * Examples:
 *
 * ```ts
 * isUndefined('Text here') // returns false
 * isUndefined(null) // returns false
 * isUndefined() // returns true
 * isUndefined(undefined) // returns true
 * ```
 *
 * @param arg `any` value to check if undefined
 */
export function isUndefined(arg?: any): boolean {
  if (arg === undefined) {
    return true
  }

  return false
}
