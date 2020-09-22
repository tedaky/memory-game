import { Flipped, ICard } from './card.d'
import { MakeGetSet } from '../utilities/make-get-set'

/**
 * Card model to match.
 */
export class Card implements ICard {
  /**
   * Flipped
   */
  @MakeGetSet<Card, Flipped>(null, 0)
  public flipped: Flipped

  /**
   * image
   */
  @MakeGetSet<Card, string>()
  public image: string

  /**
   * Name
   */
  @MakeGetSet<Card, string>()
  public name: string

  /**
   * Create Card model.
   *
   * @param card `ICard`
   */
  constructor(card: ICard)
  /**
   * Create Card model.
   *
   * @param name `string` Name
   * @param image `string` Image
   */
  constructor(name: string, image: string)
  constructor(arg1: string | ICard, arg2?: string) {
    if (typeof arg1 === 'string') {
      this.name = arg1
      this.image = arg2
    } else {
      this.name = arg1.name
      this.image = arg1.image
    }
  }
}
