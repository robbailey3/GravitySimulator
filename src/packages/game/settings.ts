export class SettingsManager {
  public planetMass: number = 1e24;
  public planetRadius: number = 10;
  public planetColour: string = '#ff0000';
  public sunMass: number = 1e30;
  public sunRadius: number = 40;
  public sunColour: string = '#ffff00';

  constructor(
    planetMassRangeInput: HTMLInputElement,
    planetRadiusRangeInput: HTMLInputElement,
    planetColourInput: HTMLInputElement,
    sunMassRangeInput: HTMLInputElement,
    sunRadiusRangeInput: HTMLInputElement,
    sunColourInput: HTMLInputElement
  ) {
    planetMassRangeInput.addEventListener('input', ($event: InputEvent) => {
      this.planetMass = 10 ** ($event.target as HTMLInputElement).valueAsNumber;
    });
    planetRadiusRangeInput.addEventListener('input', ($event: InputEvent) => {
      this.planetRadius = ($event.target as HTMLInputElement).valueAsNumber;
      console.log(this);
    });
    planetColourInput.addEventListener('input', ($event: InputEvent) => {
      this.planetColour = ($event.target as HTMLInputElement).value;
    });
    sunMassRangeInput.addEventListener('input', ($event: InputEvent) => {
      this.sunMass = 10 ** ($event.target as HTMLInputElement).valueAsNumber;
    });
    sunRadiusRangeInput.addEventListener('input', ($event: InputEvent) => {
      this.sunRadius = ($event.target as HTMLInputElement).valueAsNumber;
    });
    sunColourInput.addEventListener('input', ($event: InputEvent) => {
      this.sunColour = ($event.target as HTMLInputElement).value;
    });
  }
}
