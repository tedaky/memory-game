import { ChangeDetectionStrategy, Component } from '@angular/core'

import { fadeAnimation } from '../fade-animation/fade-animation'

/**
 * Root that holds game and statistics.
 */
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {}
