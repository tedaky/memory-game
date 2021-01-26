import { Count, IStatistic, Match, Mode } from './statistic.d'
import { Time } from '../time/time'
import { ITime } from '../time/time.d'
import { MakeProperty } from '../utilities/make-property'
import { isNullOrUndefined } from '../utilities/is-null-or-undefined'

/**
 * Statistic model to score.
 */
export class Statistic implements IStatistic {
  /**
   * KeyID
   */
  public keyID?: number

  /**
   * Complete
   */
  @MakeProperty(Time)
  public complete: Time

  /**
   * Memory
   */
  @MakeProperty(Time)
  public memory: Time

  /**
   * Flips
   */
  @MakeProperty()
  public flips: number

  /**
   * Count
   */
  @MakeProperty()
  public count: Count

  /**
   * Match
   */
  @MakeProperty()
  public match: Match

  /**
   * Mode
   */
  @MakeProperty()
  public mode: Mode

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

    if (!isNullOrUndefined(statistic.keyID)) {
      temp.keyID = statistic.keyID
    }

    return temp
  }
}
