import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'

import { LeaderboardService } from './leaderboard.service'
import { fadeAnimation } from '../fade-animation/fade-animation'
import { ScoresTemplateComponent } from '../score/score-template'
import { Statistic } from '../statistic/statistic'

/**
 * Display the leaderboard
 */
@Component({
  selector: 'app-leaderboard',
  templateUrl: '../score/score-template.component.html',
  styleUrls: ['../score/score-template.component.scss'],
  animations: [fadeAnimation]
})
/**
 * Display the leaderboard
 */
export class LeaderboardComponent
  implements OnDestroy, OnInit, ScoresTemplateComponent {
  /**
   * subscription
   */
  private sub: Subscription

  /**
   * First Column name.
   */
  public column: string = 'Rank'

  /**
   * Data source
   */
  public dataSource: MatTableDataSource<Statistic>

  /**
   * Columns
   */
  public displayColumns: string[] = ['column1', 'column2', 'column3']

  public fade: boolean

  /**
   * Title to show.
   */
  public title: string = 'Leaderboard'

  public showClear: boolean = false
  public comingSoon: boolean = true

  /**
   * Receive the scores from `HighScoresService`
   */
  public get scores(): Statistic[] {
    return this.leaderboard.scores
  }

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private leaderboard: LeaderboardService
  ) {}

  /**
   * Set detection of score changes
   */
  private initialiseDataChange(): void {
    this.sub = this.leaderboard.dataChange.subscribe((val: string): void => {
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
    this.fade = true

    if (this.sub && this.sub instanceof Subscription) {
      this.sub.unsubscribe()
    }
  }
}
