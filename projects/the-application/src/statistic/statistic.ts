import { Count, IStatistic, Match, Mode } from './statistic.d'

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
   * Holder for `count`
   */
  private _count?: Count
  /**
   * Holder for `match`
   */
  private _match?: Match
  /**
   * Holder for `mode`
   */
  private _mode?: Mode

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
   * Count
   */
  public get count(): Count {
    return this._count
  }
  public set count(val: Count) {
    this._count = val
  }

  /**
   * Match
   */
  public get match(): Match {
    return this._match
  }
  public set match(val: Match) {
    this._match = val
  }

  /**
   * Mode
   */
  public get mode(): Mode {
    return this._mode
  }
  public set mode(val: Mode) {
    this._mode = val
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
   * @param count `Count` Count
   * @param match `Match` Match
   * @param mode `Mode` Mode
   */
  constructor(
    milliseconds: number,
    seconds: number,
    minutes: number,
    hours: number,
    flips: number,
    count: Count,
    match: Match,
    mode: Mode
  )
  /**
   * Create Statistic model.
   *
   * @param milliseconds `number` Milliseconds
   * @param seconds `number` Seconds
   * @param minutes `number` Minutes
   * @param hours `number` Hours
   * @param flips `number` Flips
   * @param count `Count` Count
   * @param match `Match` Match
   * @param mode `Mode` Mode
   * @param keyID `number` keyID
   */
  constructor(
    milliseconds: number,
    seconds: number,
    minutes: number,
    hours: number,
    flips: number,
    count: Count,
    match: Match,
    mode: Mode,
    keyID: number
  )
  constructor(
    arg1: number | IStatistic,
    arg2?: number,
    arg3?: number,
    arg4?: number,
    arg5?: number,
    arg6?: Count,
    arg7?: Match,
    arg8?: Mode,
    arg9?: number
  ) {
    if (typeof arg1 === 'number') {
      this.milliseconds = arg1
      this.seconds = arg2
      this.minutes = arg3
      this.hours = arg4
      this.flips = arg5
      this.count = arg6
      this.match = arg7
      this.mode = arg8

      if (typeof arg9 !== 'undefined') {
        this.keyID = arg9
      }
    } else {
      this.milliseconds = arg1.milliseconds
      this.seconds = arg1.seconds
      this.minutes = arg1.minutes
      this.hours = arg1.hours
      this.flips = arg1.flips
      this.count = arg1.count
      this.match = arg1.match
      this.mode = arg1.mode

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

    temp.milliseconds = statistic.milliseconds
    temp.seconds = statistic.seconds
    temp.minutes = statistic.minutes
    temp.hours = statistic.hours
    temp.flips = statistic.flips
    temp.count = statistic.count
    temp.match = statistic.match
    temp.mode = statistic.mode

    if (typeof statistic.keyID !== 'undefined') {
      temp.keyID = statistic.keyID
    }

    return temp
  }
}
