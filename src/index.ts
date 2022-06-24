import './styles/styles.scss';

import { Canvas, Game } from './packages';
import { SettingsManager } from './packages/game/settings';

const cvs = new Canvas(document.getElementById('canvas') as HTMLCanvasElement);

cvs.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
  cvs.setSize(window.innerWidth, window.innerHeight);
});

document
  .getElementById('game-settings')
  .addEventListener('click', (e: MouseEvent) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
  });

const settingsManager = new SettingsManager({
  planetMassRangeInput: document.getElementById(
    'planet-mass'
  ) as HTMLInputElement,
  planetMassValue: document.getElementById(
    'planet-mass-value'
  ) as HTMLSpanElement,
  planetRadiusRangeInput: document.getElementById(
    'planet-radius'
  ) as HTMLInputElement,
  planetRadiusValue: document.getElementById(
    'planet-radius-value'
  ) as HTMLSpanElement,
  planetColourInput: document.getElementById(
    'planet-colour'
  ) as HTMLInputElement,
  sunMassRangeInput: document.getElementById('sun-mass') as HTMLInputElement,
  sunMassValue: document.getElementById('sun-mass-value') as HTMLSpanElement,
  sunRadiusRangeInput: document.getElementById(
    'sun-radius'
  ) as HTMLInputElement,
  sunRadiusValue: document.getElementById(
    'sun-radius-value'
  ) as HTMLSpanElement,
  sunColourInput: document.getElementById('sun-colour') as HTMLInputElement,
  displayGravityVisualisationInput: document.getElementById(
    'display-gravity-visualisation'
  ) as HTMLInputElement,
  displayForceVectorInput: document.getElementById(
    'display-force-vector'
  ) as HTMLInputElement,
  displayTrailInput: document.getElementById(
    'display-trail'
  ) as HTMLInputElement
});

const game = new Game(cvs, settingsManager);

game.init();

game.run();

document.getElementById('clear-button').addEventListener('click', () => {
  game.clear();
});
