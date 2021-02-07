import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { CanDeactivate } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { take, tap } from 'rxjs/operators'

import { GameComponent } from '../game/game.component'
import { GameService } from '../game/game.service'

interface Any {
  [key: string]: string
}

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
      const keys = ['PLEASE_FINISH_OR_RESET_GAME', 'FULL_STOP', 'CLOSE']

      this.translate
        .get(keys)
        .pipe<Any, Any>(
          tap<Any>((val: Any): void => {
            this.snackBar.open(`${val[keys[0]]}${val[keys[1]]}`, val[keys[2]], {
              duration: 8000,
              panelClass: 'snack-bar-reposition'
            })
          }),
          take<Any>(1)
        )
        .subscribe()
    }

    return !this.game.playing.value
  }
}
