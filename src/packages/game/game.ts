import { Canvas } from '../canvas';
import { Planet } from '../gameObjects';
import { GameObject } from '../gameObjects/gameObject';
import { Sun } from '../gameObjects/sun';
import { Vector } from '../vector';
import { SettingsManager } from './settings';

export class Game {
  private objects: GameObject[] = [];
  private readonly G = 6.67408e-11;
  private readonly scale = 1.495978707e9;
  private isClicking: boolean = false;
  private totalFrames = 0;
  private clickStart: {
    x: number;
    y: number;
  };

  constructor(
    private readonly canvas: Canvas,
    private readonly settings: SettingsManager
  ) {
    document.addEventListener('mousedown', (e) => {
      this.isClicking = true;
      this.clickStart = {
        x: e.clientX,
        y: e.clientY
      };
    });
    document.addEventListener('mouseup', (e) => {
      if (this.isClicking) {
        if (e.ctrlKey || e.metaKey) {
          this.objects.push(
            new Sun({
              position: new Vector(e.clientX, e.clientY),
              velocity: new Vector(0, 0),
              acceleration: new Vector(0, 0),
              canvas: this.canvas,
              radius: settings.sunRadius,
              mass: settings.sunMass,
              color: settings.sunColour
            })
          );
        } else {
          this.objects.push(
            new Planet({
              position: new Vector(e.clientX, e.clientY),
              velocity: new Vector(
                (e.clientX - this.clickStart.x) / 20,
                (e.clientY - this.clickStart.y) / 20
              ),
              acceleration: new Vector(0, 0),
              canvas: this.canvas,
              radius: settings.planetRadius,
              mass: settings.planetMass,
              color: settings.planetColour
            })
          );
        }
        this.isClicking = false;
      }
    });
  }

  public init() {}

  public run() {
    console.log(this.totalFrames);
    console.time('run');
    this.canvas.clear();
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].acceleration = new Vector(0, 0);
      for (let j = 0; j < this.objects.length; j++) {
        if (i === j) {
          continue;
        }
        const force = this.calculateForce(this.objects[i], this.objects[j]);
        // F = ma // a = F/m
        this.objects[i].acceleration = Vector.add(
          this.objects[i].acceleration,
          force.divide(this.objects[i].mass)
        );
      }
      this.objects[i].update();
      if (this.checkOutOfBounds(this.objects[i])) {
        continue;
      }
      this.objects[i].draw();
    }
    this.totalFrames++;
    console.timeEnd('run');
    window.requestAnimationFrame(() => this.run.call(this));
  }

  private calculateForce(planet: GameObject, other: GameObject) {
    const r = Vector.subtract(planet.position, other.position);
    const rMag = Vector.magnitude(r) * this.scale;
    const force = Vector.multiply(
      r,
      (this.G * planet.mass * other.mass) / (rMag * rMag)
    ).multiply(-1);
    return force;
  }

  public checkOutOfBounds(planet: GameObject): boolean {
    if (
      planet.position.x < 0 ||
      planet.position.x > this.canvas.width ||
      planet.position.y < 0 ||
      planet.position.y > this.canvas.height
    ) {
      this.objects.splice(this.objects.indexOf(planet), 1);
      return true;
    }
    return false;
  }

  public clear() {
    this.objects = [];
  }
}
