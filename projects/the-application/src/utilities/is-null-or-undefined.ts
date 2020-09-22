import { isNull } from './is-null'
import { isUndefined } from './is-undefined'

/**
 * Check if a value is null or undefined.
 *
 * Examples:
 *
 * ```ts
 * isNullOrUndefined('Text here') // returns false
 * isNullOrUndefined(null) // returns true
 * isNullOrUndefined() // returns true
 * isNullOrUndefined(undefined) // returns true
 * ```
 *
 * @param arg `any` value to check if undefined
 */
export function isNullOrUndefined(arg?: any): boolean {
  if (isNull(arg) || isUndefined(arg)) {
    return true
  }

  return false
}
