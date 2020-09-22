import { isNullOrUndefined } from './is-null-or-undefined'

/**
 * Decorator Function for creating class property get and set for Array.
 *
 * Creates or assigns an array if one doesn't exist.
 * If an array exists, that array is emptied then new array items are pushed.
 *
 * ### Example:
 *
 * ```ts
 * export class MyClass {
 *   ＠MakeArray<MyClass, string[]>()
 *   public myProperty: string[]
 * }
 * ```
 *
 * ### Same as:
 *
 * ```ts
 * import { isNullOrUndefined } from '@nexplore/utilities'
 * export class MyClass {
 *   private _myProperty: string[]
 *   public get myProperty(): string[] {
 *     if (isNullOrUndefined(this._myProperty)) {
 *       this.myProperty = null
 *     }
 *     return this._myProperty
 *   }
 *   public set myProperty(val: string[]) {
 *     if (isNullOrUndefined(this._myProperty)) {
 *       if (!Array.isArray(val)) {
 *         this._myProperty = []
 *         if (!isNullOrUndefined(val)) {
 *           this._myProperty.push(val)
 *         }
 *       } else {
 *         this._myProperty = val
 *       }
 *     } else {
 *       this._myProperty.splice(0, this._myProperty.length)
 *       if (!Array.isArray(val)) {
 *         if (!isNullOrUndefined(val)) {
 *           this._myProperty.push(val)
 *         }
 *       } else {
 *         this._myProperty.push(...val)
 *       }
 *     }
 *  }
 * }
 * ```
 */
export function MakeArray<T, S>(): (target: T, key: string) => void {
  return (target: T, key: string): void => {
    //#region Create Writable
    let backingField: string

    backingField = '_' + key

    Object.defineProperty(target, backingField, {
      writable: true,
      enumerable: true,
      configurable: true
    })
    //#endregion Create Writable

    //#region Create Getter and Setter for Array
    // property getter
    function getter(this: T): S[] {
      if (isNullOrUndefined(this[backingField])) {
        this[key] = null
      }

      return this[backingField]
    }

    // property setter
    function setter(this: T, newVal: S[]): void {
      // Check if _queued is already set
      if (isNullOrUndefined(this[backingField])) {
        // check if newVal is an array
        if (!Array.isArray(newVal)) {
          // assign array
          this[backingField] = []

          // add newVal if newVal is defined
          if (!isNullOrUndefined(newVal)) {
            // push newVal
            this[backingField].push(newVal)
          }
        } else {
          // assign as newVal
          this[backingField] = newVal
        }
      } else {
        // Clear array
        this[backingField].splice(0, this[backingField].length)

        if (!Array.isArray(newVal)) {
          // only push if newVal is defined
          if (!isNullOrUndefined(newVal)) {
            this[backingField].push(newVal)
          }
        } else {
          // push all of val array
          this[backingField].push(...newVal)
        }
      }
    }
    //#endregion Create Getter and Setter for Array

    // Create new property with getter and setter
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })
  }
}
