import { Canvas } from '../canvas';
import { Planet } from '../gameObjects';
import { Vector } from '../vector';

export class Game {
  private planets: Planet[] = [];
  constructor(private readonly canvas: Canvas) {}

  public init() {
    for (let i = 0; i < 10; i++) {
      this.planets.push(
        new Planet(
          new Vector(Math.random() * 1600, Math.random() * 1200),
          new Vector(Math.random() * 3, Math.random() * 3),
          this.canvas,
          Math.random() * 20,
          '#2ecc71'
        )
      );
    }
  }

  public run() {
    this.canvas.clear();
    this.planets.forEach((planet) => {
      planet.update();
      planet.draw();
    });
    window.requestAnimationFrame(() => this.run.call(this));
  }
}
