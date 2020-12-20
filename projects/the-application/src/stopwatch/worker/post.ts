/// <reference lib="webworker" />

import { ITime } from '../../time/time.d'
import { Time } from '../../time/time'

export function post(time: Time): void {
  let json: ITime

  json = Time.toJSON(time)

  postMessage(json)
}
