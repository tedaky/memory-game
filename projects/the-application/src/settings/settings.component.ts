import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { MatSelectChange } from '@angular/material/select'
import { MatSliderChange } from '@angular/material/slider'
import { Subscription } from 'rxjs'

import { SettingsService } from './settings.service'
import { GameService } from '../game/game.service'
import { LanguageService } from '../language/language.service'
import { ProfilerService } from '../profiler/profiler.service'
import { RouteLoction } from '../route-location/route-location'
import { MakeArray } from '../utilities/make-array'
import { MakeProperty } from '../utilities/make-property'

class SettingOption {
  @MakeProperty()
  public title: string

  @MakeProperty()
  public key: string

  @MakeProperty()
  public value: number | string

  constructor(title: string, value: number | string, key: string) {
    this.title = title
    this.value = value
    this.key = key
  }
}

@Component({
  selector: 'app-settings',
  styleUrls: ['./settings.component.scss'],
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnDestroy, OnInit {
  @MakeArray()
  private settingLabels: string[]

  @MakeArray()
  private subscriptions: Subscription[]

  @MakeArray()
  public settingOptions: SettingOption[]

  @MakeProperty()
  public tempRoute: string

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private game: GameService,
    private language: LanguageService,
    private settings: SettingsService,
    public profiler: ProfilerService
  ) {}

  public changeLanguage(lang: string): void {
    this.language.setLang(lang)
  }

  public ngOnInit(): void {
    let ambientVolume: SettingOption
    let effectsVolume: SettingOption
    let masterVolume: SettingOption

    let count: SettingOption
    let match: SettingOption
    let mode: SettingOption

    this.tempRoute = RouteLoction.Settings

    this.settingLabels = [
      'masterVolume',
      'effectsVolume',
      'ambientVolume',
      'match',
      'count',
      'mode'
    ]

    //#region Volume
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
    //#endregion Volume

    //#region Game
    count = new SettingOption(
      'Unique Cards Count',
      this.game.count.value,
      'count'
    )

    match = new SettingOption('Cards To Match', this.game.match.value, 'match')

    mode = new SettingOption('Mode', this.game.mode.value, 'mode')
    //#endregion Game

    this.settingOptions.push(
      masterVolume,
      effectsVolume,
      ambientVolume,
      match,
      count,
      mode
    )

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
        this.changeDetectorRef.markForCheck()
      })
      this.subscriptions.push(sub)
    })
  }

  public formatLabel(value: number): number {
    return parseInt(String(value * 100), 10)
  }

  public inputChange(
    event: MatSliderChange | MatSelectChange,
    name: string
  ): void {
    this.settings
      .put(name, event.value)
      .then((val: IDBValidKey): void => {
        this.game[name].next(event.value)
      })
      .catch((error: DOMException): void => {
        console.error(error.message)
      })
  }

  public trackBy(index: number, name: SettingOption): number {
    return index
  }
}
