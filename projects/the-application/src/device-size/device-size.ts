import { IDeviceSize } from './device-size.d'

/**
 * Device Height and Width.
 */
export class DeviceSize implements IDeviceSize {
  /**
   * Holder for height
   */
  private _height?: number
  /**
   * Holder for width
   */
  private _width?: number

  /**
   * Height
   */
  public get height(): number {
    return this._height || 0
  }
  public set height(val: number) {
    this._height = val
  }

  /**
   * Width
   */
  public get width(): number {
    return this._width || 0
  }
  public set width(val: number) {
    this._width = val
  }

  /**
   * Create `DeviceSize` by deviceSizeLike
   *
   * @param deviceSizeLike `IDeviceSize`
   */
  constructor(deviceSizeLike: IDeviceSize)
  /**
   * Create `DeviceSize` by deviceSize
   *
   * @param deviceSize `DeviceSize`
   */
  constructor(deviceSize: DeviceSize)
  /**
   * Create `DeviceSize` by height and width
   *
   * @param height `number
   * @param width `number`
   */
  constructor(height: number, width: number)
  constructor(arg1: number | DeviceSize | IDeviceSize, arg2?: number) {
    if (typeof arg1 === 'number') {
      this.height = arg1
      this.width = arg2
    } else {
      this.height = arg1.height
      this.width = arg1.width
    }
  }
}
