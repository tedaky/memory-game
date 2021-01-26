import { MatSelectChange } from '@angular/material/select'
import { MatTableDataSource } from '@angular/material/table'

import { Statistic } from '../statistic/statistic'
import { Count, Match, Mode } from '../statistic/statistic.d'

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
   * Unique Cards Count
   */
  count: Count
  /**
   * Match Cards Count
   */
  match: Match
  /**
   * Game Mode
   */
  mode: Mode

  /**
   * Receive the scores
   */
  readonly scores: Statistic[]

  inputChange(event?: MatSelectChange): void
}
