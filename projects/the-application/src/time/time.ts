import { ITime } from './time.d'

export class Time implements ITime {
  /**
   * Holder for `milliseconds`
   */
  private _milliseconds?: number
  /**
   * Holder for `seconds`
   */
  private _seconds?: number
  /**
   * Holder for `minutes`
   */
  private _minutes?: number
  /**
   * Holder for `hours`
   */
  private _hours?: number

  /**
   * Milliseconds
   */
  public get milliseconds(): number {
    return this._milliseconds || 0
  }
  public set milliseconds(val: number) {
    this._milliseconds = val || 0
  }

  /**
   * Seconds
   */
  public get seconds(): number {
    return this._seconds || 0
  }
  public set seconds(val: number) {
    this._seconds = val || 0
  }

  /**
   * Minutes
   */
  public get minutes(): number {
    return this._minutes || 0
  }
  public set minutes(val: number) {
    this._minutes = val || 0
  }

  /**
   * Hours
   */
  public get hours(): number {
    return this._hours || 0
  }
  public set hours(val: number) {
    this._hours = val || 0
  }

  /**
   * Create Time model.
   */
  constructor()
  /**
   * Create Time model.
   *
   * @param time `ITime`
   */
  constructor(time: ITime)
  /**
   * Create Time model.
   *
   * @param milliseconds `number` Milliseconds
   * @param seconds `number` Seconds
   * @param minutes `number` Minutes
   * @param hours `number` Hours
   */
  constructor(
    milliseconds: number,
    seconds: number,
    minutes: number,
    hours: number
  )
  constructor(
    arg1?: number | ITime,
    arg2?: number,
    arg3?: number,
    arg4?: number
  ) {
    if (typeof arg1 !== 'undefined' && arg1 !== null) {
      if (typeof arg1 === 'number') {
        this.milliseconds = arg1
        this.seconds = arg2
        this.minutes = arg3
        this.hours = arg4
      } else {
        this.milliseconds = arg1.milliseconds
        this.seconds = arg1.seconds
        this.minutes = arg1.minutes
        this.hours = arg1.hours
      }
    }
  }

  static toJSON(time: ITime): ITime {
    let temp: ITime

    temp = {} as ITime

    temp.milliseconds = time.milliseconds
    temp.seconds = time.seconds
    temp.minutes = time.minutes
    temp.hours = time.hours

    return temp
  }
}
