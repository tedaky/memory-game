import { createTime } from './create-time'
import { Time } from '../time/time'

describe('#createTime', () => {
  it('should create a time', () => {
    const time = new Time({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    })
    const temp = createTime(time)
    expect(temp).toEqual(0)

    const time1 = new Time({
      hours: 0,
      minutes: 0,
      seconds: 3,
      milliseconds: 0
    })
    const temp1 = createTime(time1)
    expect(temp1).toEqual(3000)

    const time2 = new Time({
      hours: 0,
      minutes: 0,
      seconds: 35,
      milliseconds: 50
    })
    const temp2 = createTime(time2)
    expect(temp2).toEqual(35050)

    const time3 = new Time({
      hours: 0,
      minutes: 50,
      seconds: 55,
      milliseconds: 750
    })
    const temp3 = createTime(time3)
    expect(temp3).toEqual(3055750)

    const time4 = new Time({
      hours: 2,
      minutes: 2,
      seconds: 4,
      milliseconds: 5
    })
    const temp4 = createTime(time4)
    expect(temp4).toEqual(7324005)
  })
})
