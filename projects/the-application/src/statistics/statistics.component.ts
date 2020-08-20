import { Component } from '@angular/core'

import { StatisticsService } from './statistics.service'

/**
 * Display the high scores and recent scores and provide clear functionality.
 */
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
/**
 * Display the high scores and recent scores and provide clear functionality.
 */
export class StatisticsComponent {
  constructor(public statistics: StatisticsService) {}

  /**
   * Clear the scores.
   */
  public clear(event: Event): void {
    event.preventDefault()

    this.statistics.clearStatistics()
  }
}
