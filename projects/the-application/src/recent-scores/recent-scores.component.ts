import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'

import { RecentScoresService } from './recent-scores.service'
import { ScoresTemplateComponent } from '../score/score-template'
import { Statistic } from '../statistic/statistic'

/**
 * Display the recent scores
 */
@Component({
  selector: 'app-recent-scores',
  templateUrl: '../score/score-template.component.html',
  styleUrls: ['../score/score-template.component.scss']
})
/**
 * Display the recent scores
 */
export class RecentScoresComponent
  implements OnDestroy, OnInit, ScoresTemplateComponent {
  /**
   * subscription
   */
  private sub: Subscription

  /**
   * First Column name.
   */
  public column: string = 'Recent'

  /**
   * Data source
   */
  public dataSource: MatTableDataSource<Statistic>

  /**
   * Columns
   */
  public displayColumns: string[] = ['column1', 'column2', 'column3']

  /**
   * Title to show.
   */
  public title: string = 'Recent Scores'

  /**
   * Receive the scores from `RecentScoresService`
   */
  public get scores(): Statistic[] {
    return this.recentScores.scores
  }

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private recentScores: RecentScoresService
  ) {}

  /**
   * Set detection of score changes
   */
  private initialiseDataChange(): void {
    this.sub = this.recentScores.dataChange.subscribe((val: string): void => {
      if (typeof val === 'string') {
        this.dataSource.data = this.scores

        this.changeDetectionRef.detectChanges()
      }
    })
  }

  /**
   * Set the data source
   */
  private initialiseDataSource(): void {
    this.dataSource = new MatTableDataSource<Statistic>(this.scores)
  }

  public ngOnInit(): void {
    this.initialiseDataChange()
    this.initialiseDataSource()
  }

  public ngOnDestroy(): void {
    if (this.sub && this.sub instanceof Subscription) {
      this.sub.unsubscribe()
    }
  }
}
