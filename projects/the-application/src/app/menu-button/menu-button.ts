export class MenuButton {
  /**
   * Set up a menu button
   *
   * @param icon Icon to use from Material Icons
   * @param label Label text for translate (Shows in UI)
   * @param route Route to navigate to
   * @param theme Theme classs
   */
  constructor(
    public icon: string,
    public label: string,
    public route: string,
    public theme: string
  ) {}
}
