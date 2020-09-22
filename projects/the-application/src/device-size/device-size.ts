import { MakeGetSet } from '../utilities/make-get-set'
import { IDeviceSize } from './device-size.d'

/**
 * Device Height and Width.
 */
export class DeviceSize implements IDeviceSize {
  /**
   * Height
   */
  @MakeGetSet(null, 0)
  public height: number

  /**
   * Width
   */
  @MakeGetSet(null, 0)
  public width: number

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
