import { Colour } from '../colour';

export interface SettingsElements {
  planetMassRangeInput: HTMLInputElement;
  planetMassValue: HTMLSpanElement;
  planetRadiusRangeInput: HTMLInputElement;
  planetRadiusValue: HTMLSpanElement;
  planetColourInput: HTMLInputElement;
  sunMassRangeInput: HTMLInputElement;
  sunMassValue: HTMLSpanElement;
  sunRadiusRangeInput: HTMLInputElement;
  sunRadiusValue: HTMLSpanElement;
  sunColourInput: HTMLInputElement;
  displayGravityVisualisationInput: HTMLInputElement;
  displayForceVectorInput: HTMLInputElement;
  displayTrailInput: HTMLInputElement;
}

export class SettingsManager {
  public planetMass: number = 1e24;
  public planetRadius: number = 10;
  public planetColour: Colour = new Colour(255, 0, 0);
  public sunMass: number = 1e30;
  public sunRadius: number = 40;
  public sunColour: Colour = new Colour(255, 255, 0);
  public displayGravityVisualisation: boolean = false;
  public displayForceVector: boolean = false;
  public displayTrail: boolean = false;

  constructor(elements: SettingsElements) {
    elements.planetMassRangeInput.addEventListener(
      'input',
      ($event: InputEvent) => {
        this.planetMass =
          10 ** ($event.target as HTMLInputElement).valueAsNumber;
        elements.planetMassValue.innerText = this.planetMass.toPrecision(2);
      }
    );
    elements.planetRadiusRangeInput.addEventListener(
      'input',
      ($event: InputEvent) => {
        this.planetRadius = ($event.target as HTMLInputElement).valueAsNumber;
        elements.planetRadiusValue.innerText = this.planetRadius.toString();
      }
    );
    elements.planetColourInput.addEventListener(
      'input',
      ($event: InputEvent) => {
        this.planetColour = Colour.fromHex(
          ($event.target as HTMLInputElement).value
        );
      }
    );
    elements.sunMassRangeInput.addEventListener(
      'input',
      ($event: InputEvent) => {
        this.sunMass = 10 ** ($event.target as HTMLInputElement).valueAsNumber;
        elements.sunMassValue.innerText = this.sunMass.toPrecision(2);
      }
    );
    elements.sunRadiusRangeInput.addEventListener(
      'input',
      ($event: InputEvent) => {
        this.sunRadius = ($event.target as HTMLInputElement).valueAsNumber;
        elements.sunRadiusValue.innerText = this.sunRadius.toString();
      }
    );
    elements.sunColourInput.addEventListener('input', ($event: InputEvent) => {
      this.sunColour = Colour.fromHex(
        ($event.target as HTMLInputElement).value
      );
    });
    elements.displayGravityVisualisationInput.addEventListener(
      'change',
      ($event: InputEvent) => {
        this.displayGravityVisualisation = (
          $event.target as HTMLInputElement
        ).checked;
      }
    );
    elements.displayForceVectorInput.addEventListener(
      'change',
      ($event: InputEvent) => {
        this.displayForceVector = ($event.target as HTMLInputElement).checked;
      }
    );
    elements.displayTrailInput.addEventListener(
      'change',
      ($event: InputEvent) => {
        this.displayTrail = ($event.target as HTMLInputElement).checked;
      }
    );
  }
}
