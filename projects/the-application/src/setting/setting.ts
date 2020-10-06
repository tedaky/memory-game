import { ISetting } from './setting.d'
import { MakeProperty } from '../utilities/make-property'
import { isNullOrUndefined } from '../utilities/is-null-or-undefined'

/**
 * Setting model for application.
 */
export class Setting implements ISetting {
  /**
   * KeyID
   */
  public keyID?: number

  /**
   * Key
   */
  @MakeProperty()
  public key: string

  /**
   * Value
   */
  @MakeProperty()
  public value: boolean | number | string

  /**
   * Create Setting model.
   *
   * @param setting `ISetting`
   */
  constructor(setting: ISetting)
  /**
   * Create Setting model.
   *
   * @param key `string` name of the setting
   * @param value `boolean | number | string` value of the setting
   */
  constructor(key: string, value: boolean | number | string)
  /**
   * Create Setting model.
   *
   * @param key `string` name of the setting
   * @param value `boolean | number | string` value of the setting
   * @param keyID `number` KeyID
   */
  constructor(key: string, value: boolean | number | string, keyID: number)
  constructor(
    arg1: ISetting | string,
    arg2?: boolean | number | string,
    arg3?: number
  ) {
    if (typeof arg1 === 'string') {
      this.key = arg1
      this.value = arg2

      if (typeof arg3 === 'number') {
        this.keyID = arg3
      }
    } else {
      this.key = arg1.key
      this.value = arg1.value

      if (typeof arg1.keyID === 'number') {
        this.keyID = arg1.keyID
      }
    }
  }

  /**
   * Convert Setting model to JSON.
   *
   * @param setting `ISetting`
   */
  static toJSON(setting: ISetting): ISetting {
    let temp: ISetting

    temp = {} as ISetting

    temp.key = setting.key
    temp.value = setting.value

    if (!isNullOrUndefined(setting.keyID)) {
      temp.keyID = setting.keyID
    }

    return temp
  }
}
