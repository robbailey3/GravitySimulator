import './styles/styles.scss';

import { Canvas, Game } from './packages';

const cvs = new Canvas(document.getElementById('canvas') as HTMLCanvasElement);

cvs.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
  cvs.setSize(window.innerWidth, window.innerHeight);
});

const game = new Game(cvs);

game.init();

game.run();
