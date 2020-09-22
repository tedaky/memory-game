import { ITime } from './time.d'
import { isNullOrUndefined } from '../utilities/is-null-or-undefined'
import { MakeGetSet } from '../utilities/make-get-set'

export class Time implements ITime {
  /**
   * Milliseconds
   */
  @MakeGetSet(null, 0)
  public milliseconds: number

  /**
   * Seconds
   */
  @MakeGetSet(null, 0)
  public seconds: number

  /**
   * Minutes
   */
  @MakeGetSet(null, 0)
  public minutes: number

  /**
   * Hours
   */
  @MakeGetSet(null, 0)
  public hours: number

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
    if (!isNullOrUndefined(arg1)) {
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
