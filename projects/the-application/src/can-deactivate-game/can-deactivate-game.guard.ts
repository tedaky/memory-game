import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { CanDeactivate } from '@angular/router'

import { GameComponent } from '../game/game.component'
import { GameService } from '../game/game.service'

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGameGuard implements CanDeactivate<GameComponent> {
  constructor(private game: GameService, private snackBar: MatSnackBar) {}

  public canDeactivate(): boolean {
    if (this.game.playing.value) {
      this.snackBar.open('Please finish or reset game.', 'Close', {
        duration: 8000,
        panelClass: 'snack-bar-reposition'
      })
    }
    return !this.game.playing.value
  }
}