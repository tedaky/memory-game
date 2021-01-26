import {
  animate,
  AnimationTriggerMetadata,
  query,
  style,
  transition,
  trigger
} from '@angular/animations'

export const fadeAnimation: AnimationTriggerMetadata = trigger(
  'fadeAnimation',
  [
    transition('* => *', [
      query(':enter', [style({ opacity: 0 })], { optional: true }),

      query(
        ':leave',
        [style({ opacity: 1 }), animate('350ms', style({ opacity: 0 }))],
        { optional: true }
      ),

      query(
        ':enter',
        [style({ opacity: 0 }), animate('350ms', style({ opacity: 1 }))],
        { optional: true }
      )
    ])
  ]
)
