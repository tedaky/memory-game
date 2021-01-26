import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public theme: string = 'theme-blue'
  public colour: string = '#0336ff'

  constructor() {}

  public setTheme(theme: string): void {
    if (this.theme !== theme) {
      let colour: string

      this.theme = theme
      colour = ''

      switch (theme) {
        case 'theme-blue':
          colour = '#5c7cff'
          break
        case 'theme-red':
          colour = '#ff626f'
          break
        case 'theme-yellow':
          colour = '#ffed75'
          break
        case 'theme-purple':
          colour = '#9c27b0'
          break
      }

      this.colour = colour
    }
  }
}
