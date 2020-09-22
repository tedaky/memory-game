import { Constructor } from './constructor'
import { isNullOrUndefined } from './is-null-or-undefined'

/**
 * Decorator Function for creating class property get and set for primitive types.
 *
 * ### Example:
 *
 * ```ts
 * export class MyClass {
 *   ＠MakeGetSet<MyClass, string>()
 *   public myProperty: string
 * }
 * ```
 *
 * ### Same as:
 *
 * ```ts
 * export class MyClass {
 *   private _myProperty: string
 *   public get myProperty(): string {
 *     return this._myProperty
 *   }
 *   public set myProperty(val: string) {
 *     this._myProperty = val
 *   }
 * }
 * ```
 */
export function MakeGetSet<T, S>(): (target: T, key: string) => void
/**
 * Decorator Function for creating class property get and set for `Model` types.
 *
 * Your `Model` should be able to handle zero or more constructor arguments.
 *
 * ### Example:
 *
 * ```ts
 * export class MyModel {
 *   prop1: string
 *   prop2: number
 *   constructor(arg1?: string, arg2?: number) {
 *     this.prop1 = arg1
 *     this.prop2 = arg2
 *   }
 * }
 * export class MyClass {
 *   ＠MakeGetSet<MyClass, MyModel>(MyModel)
 *   public myProperty: MyModel
 * }
 * ```
 *
 * ### Same as:
 *
 * ```ts
 * import { isNullOrUndefined } from '../utilities/is-null-or-undefined'
 * export class MyModel {
 *   prop1: string
 *   prop2: number
 *   constructor(arg1?: string, arg2?: number) {
 *     this.prop1 = arg1
 *     this.prop2 = arg2
 *   }
 * }
 * export class MyClass {
 *   private _myProperty: MyModel
 *   public get myProperty(): MyModel {
 *     if (isNullOrUndefined(this._myProperty)) {
 *       this.myProperty = null
 *     }
 *     return this._myProperty
 *   }
 *   public set myProperty(val: MyModel) {
 *     if (val instanceof MyModel) {
 *       this._myProperty = val
 *     } else if (Array.isArray(val)) {
 *       this._myProperty = new MyModel(...val)
 *     } else if (isNullOrUndefined(val)) {
 *       this._myProperty = new MyModel()
 *     } else {
 *       this._myProperty = new MyModel(val)
 *     }
 *   }
 * }
 * ```
 *
 * @param Model `S` - `Get` will return `Model`; `Set` will assign `Model`
 */
export function MakeGetSet<T, S>(
  Model: Constructor<S>
): (target: T, key: string) => void
/**
 * Decorator Function for creating class property get and set for primitive types.
 *
 * ### Example:
 *
 * ```ts
 * export class MyClass {
 *   ＠MakeGetSet<MyClass, string>(null, 'default')
 *   public myProperty: string
 * }
 * ```
 *
 * ### Same as:
 *
 * ```ts
 * import { isNullOrUndefined } from '../utilities/is-null-or-undefined'
 * export class MyClass {
 *   private _myProperty: string
 *   public get myProperty(): string {
 *     if (isNullOrUndefined(this._myProperty)) {
 *       this.myProperty = 'default'
 *     }
 *     return this._myProperty
 *   }
 *   public set myProperty(val: string) {
 *     this._myProperty = val
 *   }
 * }
 * ```
 *
 * @param Model is `null` to indicate primitives
 * @param base `any` default value for `get`
 */
export function MakeGetSet<T, S>(
  Model: null,
  base: any
): (target: T, key: string) => void
/**
 * Decorator Function for creating class property get and set for `Model` types.
 *
 * Your `Model` should be able to handle zero or more constructor arguments.
 *
 * ### Example:
 *
 * ```ts
 * export class MyModel {
 *   prop1: string
 *   prop2: number
 *   constructor(arg1?: string, arg2?: number) {
 *     this.prop1 = arg1
 *     this.prop2 = arg2
 *   }
 * }
 * export class MyClass {
 *   ＠MakeGetSet<MyClass, MyModel>(MyModel, ['default', 10])
 *   public myProperty: MyModel
 * }
 * ```
 *
 * ### Same as:
 *
 * ```ts
 * import { isNullOrUndefined } from '../utilities/is-null-or-undefined'
 * export class MyModel {
 *   prop1: string
 *   prop2: number
 *   constructor(arg1?: string, arg2?: number) {
 *     this.prop1 = arg1
 *     this.prop2 = arg2
 *   }
 * }
 * export class MyClass {
 *   private _myProperty: MyModel
 *   public get myProperty(): MyModel {
 *     if (isNullOrUndefined(this._myProperty)) {
 *       this.myProperty = ['default', 10] // or
 *       this.myProperty = new MyModel('default', 10)
 *     }
 *     return this._myProperty
 *   }
 *   public set myProperty(val: MyModel) {
 *     if (val instanceof MyModel) {
 *       this._myProperty = val
 *     } else if (Array.isArray(val)) {
 *       this._myProperty = new MyModel(...val)
 *     } else if (isNullOrUndefined(val)) {
 *       this._myProperty = new MyModel()
 *     } else {
 *       this._myProperty = new MyModel(val)
 *     }
 *   }
 * }
 * ```
 *
 * @param Model `S` - `Get` will return `Model`; `Set` will assign `Model`
 * @param base `any` default value for `get`
 */
export function MakeGetSet<T, S>(
  Model: Constructor<S>,
  base: any
): (target: T, key: string) => void

export function MakeGetSet<T, S>(
  Model?: Constructor<S> | null,
  base?: any
): (target: T, key: string) => void {
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

    let setter: (this: T, newVal: S) => void
    let getter: (this: T) => S

    if (isNullOrUndefined(Model)) {
      if (isNullOrUndefined(base)) {
        //#region Create Getter for Primitives without a default
        // property getter
        function primitiveGetter(this: T): S {
          return this[backingField]
        }

        getter = primitiveGetter
        //#endregion Create Getter for Primitives without a default
      } else {
        //#region Create Getter for Primitives with a default
        // property getter
        function primitiveGetter(this: T): S {
          if (isNullOrUndefined(this[backingField])) {
            this[key] = base
          }

          return this[backingField]
        }

        getter = primitiveGetter
        //#endregion Create Getter for Primitives with a default
      }

      //#region Create Setter for Primitives
      // property setter
      function primitiveSetter(this: T, newVal: S): void {
        this[backingField] = newVal
      }

      setter = primitiveSetter
      //#endregion Create Setter for Primitives
    } else {
      //#region Create Getter for Models
      // property getter
      function typeGetter(this: T): S {
        if (isNullOrUndefined(this[backingField])) {
          this[key] = base
        }

        return this[backingField]
      }

      getter = typeGetter
      //#endregion Create Getter for Models

      //#region Create Setter for Models
      // property setter
      function typeSetter(this: T, newVal: S): void {
        if (newVal instanceof Model) {
          this[backingField] = newVal
        } else if (Array.isArray(newVal)) {
          this[backingField] = new Model(...newVal)
        } else if (isNullOrUndefined(newVal)) {
          this[backingField] = new Model()
        } else {
          this[backingField] = new Model(newVal)
        }
      }

      setter = typeSetter
      //#endregion Create Setter for Models
    }

    // Create new property with getter and setter
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })
  }
}
