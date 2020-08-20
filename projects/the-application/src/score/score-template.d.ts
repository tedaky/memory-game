import { MatTableDataSource } from '@angular/material/table'

import { Statistic } from '../statistic/statistic'

/**
 * Scores Template Component.
 */
export interface ScoresTemplateComponent {
  /**
   * First Column name.
   */
  column: string

  /**
   * Data source
   */
  dataSource: MatTableDataSource<Statistic>

  /**
   * Columns
   */
  displayColumns: string[]

  /**
   * Title to show.
   */
  title: string

  /**
   * Receive the scores
   */
  readonly scores: Statistic[]
}
