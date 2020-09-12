import { Count, IStatistic, Match, Mode } from './statistic.d'
import { Time } from '../time/time'
import { ITime } from '../time/time.d'

/**
 * Statistic model to score.
 */
export class Statistic implements IStatistic {
  /**
   * Holder for `complete`
   */
  private _complete?: Time
  /**
   * Holder for `memory`
   */
  private _memory?: Time
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
   * KeyID
   */
  public keyID?: number

  /**
   * Complete
   */
  public get complete(): Time {
    if (typeof this._complete === 'undefined') {
      this.complete = null
    }
    return this._complete
  }
  public set complete(val: Time) {
    if (val instanceof Time) {
      this._complete = val
    } else {
      this._complete = new Time(val)
    }
  }

  /**
   * Memory
   */
  public get memory(): Time {
    if (typeof this._memory === 'undefined') {
      this.memory = null
    }
    return this._memory
  }
  public set memory(val: Time) {
    if (val instanceof Time) {
      this._memory = val
    } else {
      this._memory = new Time(val)
    }
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
   * @param mode `Mode` Mode
   * @param match `Match` Match
   * @param flips `number` Flips
   * @param count `Count` Count
   * @param complete `ITime` Complete
   * @param memory `ITime` Memory
   */
  constructor(
    mode: Mode,
    match: Match,
    flips: number,
    count: Count,
    complete: ITime,
    memory: ITime
  )
  /**
   * Create Statistic model.
   *
   * @param mode `Mode` Mode
   * @param match `Match` Match
   * @param flips `number` Flips
   * @param count `Count` Count
   * @param complete `ITime` Complete
   * @param memory `ITime` Memory
   * @param keyID `number` KeyID
   */
  constructor(
    mode: Mode,
    match: Match,
    flips: number,
    count: Count,
    complete: ITime,
    memory: ITime,
    keyID: number
  )
  /**
   * Create Statistic model.
   *
   * @param mode `Mode` Mode
   * @param match `Match` Match
   * @param flips `number` Flips
   * @param count `Count` Count
   * @param completeMilliseconds `number` Complete Milliseconds
   * @param completeSeconds `number` Complete Seconds
   * @param completeMinutes `number` Complete Minutes
   * @param completeHours `number` Complete Hours
   * @param memoryMilliseconds `number` Complete Milliseconds
   * @param memorySeconds `number` Complete Seconds
   * @param memoryMinutes` number` Complete Minutes
   * @param memoryHours `number` Complete Hours
   */
  constructor(
    mode: Mode,
    match: Match,
    flips: number,
    count: Count,
    completeMilliseconds: number,
    completeSeconds: number,
    completeMinutes: number,
    completeHours: number,
    memoryMilliseconds: number,
    memorySeconds: number,
    memoryMinutes: number,
    memoryHours: number
  )
  /**
   * Create Statistic model.
   *
   * @param mode `Mode` Mode
   * @param match `Match` Match
   * @param flips `number` Flips
   * @param count `Count` Count
   * @param completeMilliseconds `number` Complete Milliseconds
   * @param completeSeconds `number` Complete Seconds
   * @param completeMinutes `number` Complete Minutes
   * @param completeHours `number` Complete Hours
   * @param memoryMilliseconds `number` Complete Milliseconds
   * @param memorySeconds `number` Complete Seconds
   * @param memoryMinutes` number` Complete Minutes
   * @param memoryHours `number` Complete Hours
   * @param keyID `number` KeyID
   */
  constructor(
    mode: Mode,
    match: Match,
    flips: number,
    count: Count,
    completeMilliseconds: number,
    completeSeconds: number,
    completeMinutes: number,
    completeHours: number,
    memoryMilliseconds: number,
    memorySeconds: number,
    memoryMinutes: number,
    memoryHours: number,
    keyID: number
  )
  constructor(
    arg1: Mode | IStatistic,
    arg2?: Match,
    arg3?: number,
    arg4?: Count,
    arg5?: ITime | number,
    arg6?: ITime | number,
    arg7?: number,
    arg8?: number,
    arg9?: number,
    arg10?: number,
    arg11?: number,
    arg12?: number,
    arg13?: number
  ) {
    if (typeof arg1 === 'string') {
      this.mode = arg1
      this.match = arg2
      this.flips = arg3
      this.count = arg4

      if (typeof arg5 === 'number') {
        this.complete.milliseconds = arg5
        this.complete.seconds = arg6 as number
        this.complete.minutes = arg7
        this.complete.hours = arg8

        this.memory.milliseconds = arg9
        this.memory.seconds = arg10
        this.memory.minutes = arg11
        this.memory.hours = arg12

        if (typeof arg13 === 'number') {
          this.keyID = arg13
        }
      } else {
        this.complete = arg5
        this.memory = arg6 as ITime

        if (typeof arg7 === 'number') {
          this.keyID = arg7
        }
      }
    } else {
      this.mode = arg1.mode
      this.match = arg1.match
      this.flips = arg1.flips
      this.count = arg1.count
      this.complete = arg1.complete
      this.memory = arg1.memory

      if (typeof arg1.keyID === 'number') {
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

    temp.complete = Time.toJSON(statistic.complete)
    temp.memory = Time.toJSON(statistic.memory)
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
