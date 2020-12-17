import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { CanDeactivate } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'

import { GameComponent } from '../game/game.component'
import { GameService } from '../game/game.service'

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGameGuard implements CanDeactivate<GameComponent> {
  constructor(
    private game: GameService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  public canDeactivate(): boolean {
    if (this.game.playing.value) {
      let keys: string[]
      let sub: Subscription

      keys = ['PLEASE_FINISH_OR_RESET_GAME', 'FULL_STOP', 'CLOSE']

      sub = this.translate.get(keys).subscribe(
        (val: { [key: string]: string }): void => {
          this.snackBar.open(`${val[keys[0]]}${val[keys[1]]}`, val[keys[2]], {
            duration: 8000,
            panelClass: 'snack-bar-reposition'
          })
        },
        (): void => {},
        (): void => {
          if (sub && sub instanceof Subscription) {
            sub.unsubscribe()
          }
        }
      )
    }

    return !this.game.playing.value
  }
}
