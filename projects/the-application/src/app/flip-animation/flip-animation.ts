import {
  animate,
  AnimationTriggerMetadata,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations'

export const flipAnimation: AnimationTriggerMetadata = trigger(
  'flipAnimation',
  [
    state(
      '0',
      style({
        opacity: '1',
        transform: 'rotateY(0deg)'
      })
    ),
    state(
      '1',
      style({
        opacity: '1',
        transform: 'rotateY(180deg)'
      })
    ),
    state(
      '2',
      style({
        opacity: '0',
        transform: 'rotateY(0deg)'
      })
    ),
    state(
      '3',
      style({
        opacity: '1',
        transform: 'rotateY(180deg)'
      })
    ),
    state(
      '4',
      style({
        opacity: '0',
        transform: 'rotateY(180deg)'
      })
    ),
    transition('1 => 4', [
      style({
        transform: 'rotateY(0deg)',
        opacity: '1'
      }),
      animate(
        '250ms',
        keyframes([
          style({
            transform: 'rotateY(0deg)',
            opacity: '1'
          }),
          style({
            transform: 'rotateY(0deg)',
            opacity: '0'
          })
        ])
      )
    ])
  ]
)
