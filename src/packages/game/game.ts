import { Canvas } from '../canvas';
import { Planet } from '../gameObjects';
import { Vector } from '../vector';

export class Game {
  private planets: Planet[] = [];
  private readonly G = 6.67408e-11;
  private readonly scale = 1.495978707e13;
  constructor(private readonly canvas: Canvas) {}

  public init() {
    for (let i = 0; i < 50; i++) {
      this.planets.push(
        new Planet(
          new Vector(Math.random() * 1600, Math.random() * 1200),
          new Vector(Math.random() * 1, Math.random() * 1),
          new Vector(0, 0),
          this.canvas,
          10e24,
          Math.random() * 20,
          '#2ecc71'
        )
      );
    }
  }

  public run() {
    this.canvas.clear();
    for (let i = 0; i < this.planets.length; i++) {
      for (let j = 0; j < this.planets.length; j++) {
        if (i === j) {
          continue;
        }
        const force = this.calculateForce(this.planets[i], this.planets[j]);
        console.log(i, j, force);
        this.planets[i].acceleration = Vector.add(
          this.planets[i].acceleration,
          force.divide(this.planets[i].mass)
        );
      }
      this.planets[i].update();
      this.planets[i].draw();
    }
    window.setTimeout(() => this.run(), 1000 / 60);
  }

  private calculateForce(planet: Planet, other: Planet) {
    console.log(planet.position, other.position);
    const r = Vector.subtract(planet.position, other.position);
    console.log({ r });
    const rMag = Vector.magnitude(r);
    console.log({ rMag });
    const force = Vector.multiply(
      r,
      (this.G * planet.mass * other.mass) / (rMag * rMag)
    )
      .divide(this.scale)
      .multiply(-1);
    console.log({ force });
    return force;
  }
}
