import { ICard } from './card.d'

/**
 * Card model to match.
 */
export class Card implements ICard {
  /**
   * Holder for `flipped`
   */
  private _flipped: 0 | 1 | 2
  /**
   * Holder for `image`
   */
  private _image?: string
  /**
   * Holder for `name`
   */
  private _name?: string

  /**
   * image
   */
  public get image(): string {
    return this._image
  }
  public set image(val: string) {
    this._image = val
  }

  /**
   * Name
   */
  public get name(): string {
    return this._name
  }
  public set name(val: string) {
    this._name = val
  }

  /**
   * Flipped
   */
  public get flipped(): 0 | 1 | 2 {
    return this._flipped || 0
  }
  public set flipped(val: 0 | 1 | 2) {
    this._flipped = val
  }

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
