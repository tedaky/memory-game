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

import { HighScoresService } from './high-scores.service'
import { fadeAnimation } from '../fade-animation/fade-animation'
import { GameService } from '../game/game.service'
import { ScoresTemplateComponent } from '../score/score-template'
import { Statistic } from '../statistic/statistic'
import { Match } from '../statistic/statistic.d'

/**
 * Display the high scores
 */
@Component({
  selector: 'app-high-scores',
  templateUrl: '../score/score-template.component.html',
  styleUrls: ['../score/score-template.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Display the high scores
 */
export class HighScoresComponent
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
  public title: string = 'High Scores'

  public showClear: boolean = true
  public comingSoon: boolean = false

  public filter: Match = this.game.match.value

  public newScores: Statistic[]

  /**
   * Receive the scores from `HighScoresService`
   */
  public get scores(): Statistic[] {
    return this.highScores.scores
  }

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private highScores: HighScoresService,
    private game: GameService
  ) {}

  public inputChange(event?: MatSelectChange): void {
    this.highScores.dataChange.emit('filtered')
  }

  private makeNewScores(): void {
    this.newScores = this.highScores.getScoresBy(
      this.game.count.value,
      this.filter,
      this.game.mode.value
    )

    this.newScores = this.highScores.sort(this.newScores)
  }

  /**
   * Set detection of score changes
   */
  private initialiseDataChange(): void {
    this.sub = this.highScores.dataChange.subscribe((val: string): void => {
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

  /**
   * Clear the scores.
   */
  public clear(event: MouseEvent): void {
    event.preventDefault()

    this.highScores.clear()
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
