import { IStatistic } from './statistic.d'

/**
 * Statistic model to score.
 */
export class Statistic implements IStatistic {
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
   * Holder for `flips`
   */
  private _flips?: number

  /**
   * LeyID
   */
  public keyID?: number

  /**
   * Milliseconds
   */
  public get milliseconds(): number {
    return this._milliseconds
  }
  public set milliseconds(val: number) {
    this._milliseconds = val
  }

  /**
   * Seconds
   */
  public get seconds(): number {
    return this._seconds
  }
  public set seconds(val: number) {
    this._seconds = val
  }

  /**
   * Minutes
   */
  public get minutes(): number {
    return this._minutes
  }
  public set minutes(val: number) {
    this._minutes = val
  }

  /**
   * Hours
   */
  public get hours(): number {
    return this._hours
  }
  public set hours(val: number) {
    this._hours = val
  }

  /**
   * Flips
   */
  public get flips(): number {
    return this._flips
  }
  public set flips(val: number) {
    this._flips = val
  }

  /**
   * Create Statistic model.
   *
   * @param statistic `IStatistic`
   */
  constructor(statistic: IStatistic)
  /**
   * Create Statistic model.
   *
   * @param milliseconds `number` Milliseconds
   * @param seconds `number` Seconds
   * @param minutes `number` Minutes
   * @param hours `number` Hours
   * @param flips `number` Flips
   */
  constructor(
    milliseconds: number,
    seconds: number,
    minutes: number,
    hours: number,
    flips: number
  )
  /**
   * Create Statistic model.
   *
   * @param milliseconds `number` Milliseconds
   * @param seconds `number` Seconds
   * @param minutes `number` Minutes
   * @param hours `number` Hours
   * @param flips `number` Flips
   * @param keyID `number` keyID
   */
  constructor(
    milliseconds: number,
    seconds: number,
    minutes: number,
    hours: number,
    flips: number,
    keyID: number
  )
  constructor(
    arg1: number | IStatistic,
    arg2?: number,
    arg3?: number,
    arg4?: number,
    arg5?: number,
    arg6?: number
  ) {
    if (typeof arg1 === 'number') {
      this.milliseconds = arg1
      this.seconds = arg2
      this.minutes = arg3
      this.hours = arg4
      this.flips = arg5

      if (typeof arg6 !== 'undefined') {
        this.keyID = arg6
      }
    } else {
      this.milliseconds = arg1.milliseconds
      this.seconds = arg1.seconds
      this.minutes = arg1.minutes
      this.hours = arg1.hours
      this.flips = arg1.flips

      if (typeof arg1.keyID !== 'undefined') {
        this.keyID = arg1.keyID
      }
    }
  }

  /**
   * Convert Statistic model to JSON.
   *
   * @param statistic `IStatistic`
   */
  static toJSON(statistic: IStatistic): IStatistic {
    let temp: IStatistic

    temp = {} as IStatistic

    temp.flips = statistic.flips
    temp.hours = statistic.hours
    temp.minutes = statistic.minutes
    temp.seconds = statistic.seconds
    temp.milliseconds = statistic.milliseconds

    if (typeof statistic.keyID !== 'undefined') {
      temp.keyID = statistic.keyID
    }

    return temp
  }
}
