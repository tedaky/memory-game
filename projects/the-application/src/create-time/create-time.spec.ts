import { createTime } from './create-time'
import { Statistic } from '../statistic/statistic'
import { IStatistic } from '../statistic/statistic.d'

describe('#createTime', () => {
  it('should create a time', () => {
    const statistic = new Statistic({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    } as IStatistic)
    const temp = createTime(statistic)
    expect(temp).toEqual(0)

    const statistic1 = new Statistic({
      hours: 0,
      minutes: 0,
      seconds: 3,
      milliseconds: 0
    } as IStatistic)
    const temp1 = createTime(statistic1)
    expect(temp1).toEqual(3000)

    const statistic2 = new Statistic({
      hours: 0,
      minutes: 0,
      seconds: 35,
      milliseconds: 50
    } as IStatistic)
    const temp2 = createTime(statistic2)
    expect(temp2).toEqual(35050)

    const statistic3 = new Statistic({
      hours: 0,
      minutes: 50,
      seconds: 55,
      milliseconds: 750
    } as IStatistic)
    const temp3 = createTime(statistic3)
    expect(temp3).toEqual(3055750)

    const statistic4 = new Statistic({
      hours: 2,
      minutes: 2,
      seconds: 4,
      milliseconds: 5
    } as IStatistic)
    const temp4 = createTime(statistic4)
    expect(temp4).toEqual(7324005)
  })
})
