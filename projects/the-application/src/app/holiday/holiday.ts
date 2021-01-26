let week: number
// Week =
//   Milliseconds (1000) *
//   Seconds (60) *
//   Minutes (60) *
//   Hours (24) *
//   Days (7)
week = 1000 * 60 * 60 * 24 * 7

// Valentine's Day
export function useValentinesDay(): boolean {
  let today: Date
  let valentinesDay: Date

  today = new Date()
  valentinesDay = new Date(`Feb 14 ${today.getFullYear()}`)

  if (
    today > new Date(valentinesDay.getTime() - week * 2) &&
    today < new Date(valentinesDay.getTime())
  ) {
    return true
  }

  return false
}

// St. Patricks's Day
export function useStPatricksDay(): boolean {
  let today: Date
  let stPatricksDay: Date

  today = new Date()
  stPatricksDay = new Date(`Mar 17 ${today.getFullYear()}`)

  if (
    today > new Date(stPatricksDay.getTime() - week * 2) &&
    today < new Date(stPatricksDay.getTime())
  ) {
    return true
  }

  return false
}

// Easter
/**
 * Get the date of Easter for today's year.
 *
 * https://gist.github.com/johndyer/0dffbdd98c2046f41180c051f378f343
 *
 * @param year Use year of today.
 */
function getEaster(year: number): Date {
  let C: number
  let G: number
  let H: number
  let I: number
  let J: number
  let L: number
  let day: number
  let f: (x: number) => number
  let month: number

  f = Math.floor
  // Golden Number - 1
  G = year % 19
  C = f(year / 100)
  // related to Epact
  H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30
  // number of days from 21 March to the Paschal full moon
  I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11))
  // weekday for the Paschal full moon
  J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7
  // number of days from 21 March to the Sunday on or before the Paschal full moon
  L = I - J

  month = 3 + f((L + 40) / 44)
  day = L + 28 - 31 * f(month / 4)

  return new Date(`${month} ${day} ${year}`)
}

export function useEaster(): boolean {
  let today: Date
  let easter: Date

  today = new Date()
  easter = getEaster(today.getFullYear())

  if (
    today > new Date(easter.getTime() - week * 2) &&
    today < new Date(easter.getTime())
  ) {
    return true
  }

  return false
}

// 4th of July
export function use4thOfJuly(): boolean {
  let today: Date
  let july4th: Date

  today = new Date()
  july4th = new Date(`Jul 04 ${today.getFullYear()}`)

  if (
    today > new Date(july4th.getTime() - week * 2) &&
    today < new Date(july4th.getTime() + week / 7)
  ) {
    return true
  }

  return false
}

// Halloween
export function useHalloween(): boolean {
  let today: Date
  let halloween: Date

  today = new Date()
  halloween = new Date(`Oct 31 ${today.getFullYear()}`)

  if (
    today > new Date(halloween.getTime() - week * 3) &&
    today < new Date(halloween.getTime())
  ) {
    return true
  }

  return false
}

// Thanksgiving
/**
 * Get the date of Thanksgiving for today's year.
 *
 * @param year Use year of today.
 */
function getThanksgiving(year: number): Date {
  let lastOfNov: number
  let thanksgivingDay: number

  lastOfNov = new Date(`Nov 30 ${year}`).getDay()

  if (lastOfNov >= 4) {
    thanksgivingDay = 34 - lastOfNov
  } else {
    thanksgivingDay = 27 - lastOfNov
  }

  return new Date(`Nov ${thanksgivingDay} ${year}`)
}

export function useThanksgiving(): boolean {
  let today: Date
  let thanksgiving: Date

  today = new Date()
  thanksgiving = getThanksgiving(today.getFullYear())

  if (
    today > new Date(thanksgiving.getTime() - week * 3) &&
    today < new Date(thanksgiving.getTime())
  ) {
    return true
  }

  return false
}

// Christmas
export function useChristmas(): boolean {
  let today: Date
  let christmas: Date

  today = new Date()
  christmas = new Date(`Dec 25 ${today.getFullYear()}`)

  if (
    today > new Date(christmas.getTime() - week * 3) &&
    today < new Date(christmas.getTime())
  ) {
    return true
  }

  return false
}
