import { Statistic } from './statistic'
describe('Statistic', () => {
  it('should create a statistic from interface', () => {
    const temp = new Statistic({
      mode: 'regular',
      match: 2,
      flips: 12,
      count: 9,
      complete: {
        milliseconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0
      },
      memory: {
        milliseconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0
      }
    })
    expect(temp).toBeInstanceOf(Statistic)
    expect(temp.flips).toEqual(12)
    expect(temp.complete.hours).toEqual(0)
    expect(temp.complete.milliseconds).toEqual(0)
    expect(temp.complete.minutes).toEqual(0)
    expect(temp.complete.seconds).toEqual(0)
    expect(temp.keyID).toBeUndefined()

    const temp1 = new Statistic({
      mode: 'regular',
      match: 2,
      flips: 14,
      count: 9,
      complete: {
        milliseconds: 2,
        seconds: 2,
        minutes: 2,
        hours: 2
      },
      memory: {
        milliseconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0
      },
      keyID: 1
    })
    expect(temp1).toBeInstanceOf(Statistic)
    expect(temp1.flips).toEqual(14)
    expect(temp1.complete.hours).toEqual(2)
    expect(temp1.complete.milliseconds).toEqual(2)
    expect(temp1.complete.minutes).toEqual(2)
    expect(temp1.complete.seconds).toEqual(2)
    expect(temp1.keyID).toEqual(1)
  })
})
