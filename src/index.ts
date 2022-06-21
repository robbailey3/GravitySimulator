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

const settingsManager = new SettingsManager(
  document.getElementById('planet-mass') as HTMLInputElement,
  document.getElementById('planet-radius') as HTMLInputElement,
  document.getElementById('planet-colour') as HTMLInputElement,
  document.getElementById('sun-mass') as HTMLInputElement,
  document.getElementById('sun-radius') as HTMLInputElement,
  document.getElementById('sun-colour') as HTMLInputElement
);

const game = new Game(cvs, settingsManager);

game.init();

game.run();
