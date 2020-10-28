import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { MatSelectChange } from '@angular/material/select'
import { Subscription } from 'rxjs'

import { LeaderboardService } from './leaderboard.service'
import { fadeAnimation } from '../fade-animation/fade-animation'
import { GameService } from '../game/game.service'
import { ScoresTemplateComponent } from '../score/score-template'
import { Statistic } from '../statistic/statistic'
import { Match } from '../statistic/statistic.d'

/**
 * Display the leaderboard
 */
@Component({
  selector: 'app-leaderboard',
  templateUrl: '../score/score-template.component.html',
  styleUrls: ['../score/score-template.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  public filter: Match = this.game.match.value

  public newScores: Statistic[]

  /**
   * Receive the scores from `HighScoresService`
   */
  public get scores(): Statistic[] {
    return this.leaderboard.scores
  }

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private leaderboard: LeaderboardService,
    private game: GameService
  ) {}

  public inputChange(event?: MatSelectChange): void {
    this.leaderboard.dataChange.emit('filtered')
  }

  private makeNewScores(): void {
    this.newScores = this.leaderboard.getScoresBy(
      this.game.count.value,
      this.filter,
      this.game.mode.value
    )

    this.newScores = this.leaderboard.sort(this.newScores)
  }

  /**
   * Set detection of score changes
   */
  private initialiseDataChange(): void {
    this.sub = this.leaderboard.dataChange.subscribe((val: string): void => {
      if (typeof val === 'string') {
        this.makeNewScores()

        this.dataSource.data = this.newScores || this.scores

        this.changeDetectionRef.markForCheck()
      }
    })
  }

  /**
   * Set the data source
   */
  private initialiseDataSource(): void {
    this.dataSource = new MatTableDataSource<Statistic>(this.scores)
    this.inputChange()
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
