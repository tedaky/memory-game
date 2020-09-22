/**
 * Check if a value is null.
 *
 * Examples:
 *
 * ```ts
 * isNull('Text here') // returns false
 * isNull() // returns false
 * isNull(undefined) // returns false
 * isNull(null) // returns true
 * ```
 *
 * @param arg `any` value to check if null
 */
export function isNull(arg?: any): boolean {
  if (arg === null) {
    return true
  }

  return false
}
