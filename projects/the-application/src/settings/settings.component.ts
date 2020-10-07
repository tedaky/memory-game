import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatSliderChange } from '@angular/material/slider'
import { Subscription } from 'rxjs'

import { GameService } from '../game/game.service'
import { MakeArray } from '../utilities/make-array'
import { MakeProperty } from '../utilities/make-property'
import { SettingsService } from './settings.service'

class SettingOption {
  @MakeProperty()
  public title: string

  @MakeProperty()
  public value: number

  @MakeProperty()
  public key: string

  constructor(title: string, value: number, key: string) {
    this.title = title
    this.value = value
    this.key = key
  }
}

@Component({
  selector: 'app-settings',
  styleUrls: ['./settings.component.scss'],
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnDestroy, OnInit {
  @MakeArray()
  private settingLabels: string[]

  @MakeArray()
  private subscriptions: Subscription[]

  @MakeArray()
  public settingOptions: SettingOption[]

  constructor(private game: GameService, private settings: SettingsService) {}

  public ngOnInit(): void {
    let ambientVolume: SettingOption
    let effectsVolume: SettingOption
    let masterVolume: SettingOption

    this.settingLabels = ['masterVolume', 'effectsVolume', 'ambientVolume']

    masterVolume = new SettingOption(
      'Master Volume',
      this.game.masterVolume.value,
      'masterVolume'
    )

    effectsVolume = new SettingOption(
      'Effects Volume',
      this.game.effectsVolume.value,
      'effectsVolume'
    )

    ambientVolume = new SettingOption(
      'Ambient Volume',
      this.game.ambientVolume.value,
      'ambientVolume'
    )

    this.settingOptions.push(masterVolume, effectsVolume, ambientVolume)

    this.sub()
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription): void => {
      if (sub && sub instanceof Subscription) {
        sub.unsubscribe()
      }
    })
  }

  private sub(): void {
    this.settingLabels.forEach((label: string, index: number) => {
      let sub: Subscription

      sub = this.game[label].subscribe((val: number): void => {
        this.settingOptions[index].value = val
      })

      this.subscriptions.push(sub)
    })
  }

  public formatLabel(value: number): number {
    return parseInt(String(value * 100), 10)
  }

  public inputChange(event: MatSliderChange, name: string): void {
    this.settings
      .put(name, event.value)
      .then((val: IDBValidKey): void => {
        this.game[name].next(event.value)
      })
      .catch((error: DOMException): void => {
        console.error(error.message)
      })
  }
}
