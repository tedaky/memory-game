export type Flipped = 0 | 1 | 2 | 3 | 4
/**
 * Card interface implementation.
 */
export interface ICard {
  /**
   * Flipped
   *
   * * 0 = not flipped - blank
   * * 1 = flipped
   * * 2 = won - white
   * * 3 = animating to 0 - blank
   * * 4 = animating to 2 - won
   */
  flipped?: Flipped
  /**
   * Image
   */
  image: string
  /**
   * Name
   */
  name: string
}
