import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

type Styles = Style[]
interface Style {
  colour: string
  display: string
}

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public styles: Styles

  public ngOnInit(): void {
    this.styles = [
      {
        colour: '#3b5998',
        display: 'Facebook'
      },
      {
        colour: '#191717',
        display: 'GitHub'
      },
      {
        colour: '#4285f3',
        display: 'Google'
      },
      {
        colour: '#00a4ef',
        display: 'Microsoft'
      },
      {
        colour: '#55acee',
        display: 'Twitter'
      },
      {
        colour: '#6001d2',
        display: 'Yahoo'
      },
      {
        colour: '#3f3f3f',
        display: 'anonymous'
      }
    ]
  }
}
