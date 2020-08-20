import { Statistic } from './statistic'

describe('Statistic', () => {
  it('should create a statistic from interface', () => {
    const temp = new Statistic({
      flips: 12,
      hours: 0,
      milliseconds: 0,
      minutes: 0,
      seconds: 0
    })
    expect(temp).toBeInstanceOf(Statistic)
    expect(temp.flips).toEqual(12)
    expect(temp.hours).toEqual(0)
    expect(temp.milliseconds).toEqual(0)
    expect(temp.minutes).toEqual(0)
    expect(temp.seconds).toEqual(0)
    expect(temp.keyID).toBeUndefined()
    const temp1 = new Statistic({
      flips: 14,
      hours: 2,
      milliseconds: 2,
      minutes: 2,
      seconds: 2,
      keyID: 1
    })
    expect(temp1).toBeInstanceOf(Statistic)
    expect(temp1.flips).toEqual(14)
    expect(temp1.hours).toEqual(2)
    expect(temp1.milliseconds).toEqual(2)
    expect(temp1.minutes).toEqual(2)
    expect(temp1.seconds).toEqual(2)
    expect(temp1.keyID).toEqual(1)
  })
})
