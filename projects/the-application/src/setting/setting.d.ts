/**
 * Setting interface implementation
 */
export interface ISetting {
  /**
   * KeyID
   */
  keyID?: number
  /**
   * Key
   */
  key: string
  /**
   * Value
   */
  value: boolean | number | string
}
