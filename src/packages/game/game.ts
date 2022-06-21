import { Canvas } from '../canvas';
import { Planet } from '../gameObjects';
import { Vector } from '../vector';

export class Game {
  private planets: Planet[] = [];
  private readonly G = 6.67408e-11;
  private readonly scale = 1.495978707e9;
  private isClicking: boolean = false;
  private clickStart: {
    x: number;
    y: number;
  };

  constructor(private readonly canvas: Canvas) {
    document.addEventListener('mousedown', (e) => {
      this.isClicking = true;
      this.clickStart = {
        x: e.clientX,
        y: e.clientY
      };
    });
    document.addEventListener('mouseup', (e) => {
      if (this.isClicking) {
        if (e.ctrlKey) {
          this.addSun(e.clientX, e.clientY);
        } else {
          this.addPlanet(
            e.clientX,
            e.clientY,
            new Vector(
              (e.clientX - this.clickStart.x) / 20,
              (e.clientY - this.clickStart.y) / 20
            )
          );
        }
        this.isClicking = false;
      }
    });
  }

  public init() {}

  public run() {
    this.canvas.clear();
    for (let i = 0; i < this.planets.length; i++) {
      this.planets[i].acceleration = new Vector(0, 0);
      for (let j = 0; j < this.planets.length; j++) {
        if (i === j) {
          continue;
        }
        const force = this.calculateForce(this.planets[i], this.planets[j]);
        // F = ma // a = F/m
        this.planets[i].acceleration = Vector.add(
          this.planets[i].acceleration,
          force.divide(this.planets[i].mass)
        );
      }
      this.planets[i].update();
      if (this.checkOutOfBounds(this.planets[i])) {
        continue;
      }
      this.planets[i].draw();
    }
    window.requestAnimationFrame(() => this.run.call(this));
  }

  private calculateForce(planet: Planet, other: Planet) {
    const r = Vector.subtract(planet.position, other.position);
    const rMag = Vector.magnitude(r) * this.scale;
    const force = Vector.multiply(
      r,
      (this.G * planet.mass * other.mass) / (rMag * rMag)
    ).multiply(-1);
    return force;
  }

  public checkOutOfBounds(planet: Planet): boolean {
    if (
      planet.position.x < 0 ||
      planet.position.x > this.canvas.width ||
      planet.position.y < 0 ||
      planet.position.y > this.canvas.height
    ) {
      this.planets.splice(this.planets.indexOf(planet), 1);
      return true;
    }
    return false;
  }

  private addPlanet(x: number, y: number, velocity?: Vector) {
    this.planets.push(
      new Planet({
        position: new Vector(x, y),
        velocity: velocity || new Vector(0, 0),
        acceleration: new Vector(0, 0),
        canvas: this.canvas,
        radius: 15,
        mass: 10e24,
        color: 'red'
      })
    );
  }

  private addSun(x: number, y: number) {
    this.planets.push(
      new Planet({
        position: new Vector(x, y),
        velocity: new Vector(0, 0),
        acceleration: new Vector(0, 0),
        canvas: this.canvas,
        radius: 40,
        mass: 10e30,
        color: 'yellow'
      })
    );
  }
}
