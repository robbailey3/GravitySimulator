import { Canvas } from '../canvas';
import { Colour } from '../colour';
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
  private clickStart: {
    x: number;
    y: number;
  };

  constructor(
    private readonly canvas: Canvas,
    private readonly settings: SettingsManager
  ) {
    canvas.element.addEventListener('mousedown', (e) => {
      this.isClicking = true;
      this.clickStart = {
        x: e.clientX,
        y: e.clientY
      };
    });
    canvas.element.addEventListener('mouseup', (e) => {
      if (this.isClicking) {
        if (e.ctrlKey || e.metaKey) {
          this.objects.push(
            new Sun(
              {
                position: new Vector(e.clientX, e.clientY),
                velocity: new Vector(0, 0),
                acceleration: new Vector(0, 0),
                canvas: this.canvas,
                radius: settings.sunRadius,
                mass: settings.sunMass,
                color: settings.sunColour
              },
              this.settings
            )
          );
        } else {
          this.objects.push(
            new Planet(
              {
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
              },
              this.settings
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
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].acceleration = new Vector(0, 0);
      let sumForce = new Vector(0, 0);
      for (let j = 0; j < this.objects.length; j++) {
        if (i === j) {
          continue;
        }
        const force = this.calculateForce(this.objects[i], this.objects[j]);
        sumForce = Vector.add(sumForce, force);
      }
      this.objects[i].update(sumForce);
      if (this.checkOutOfBounds(this.objects[i])) {
        continue;
      }
      this.objects[i].draw();
    }
    this.drawGravityVisualisation();
    window.requestAnimationFrame(() => this.run());
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

  private drawGravityVisualisation() {
    if (!this.settings.displayGravityVisualisation) {
      return;
    }
    const { width, height } = this.canvas;

    for (let x = 0; x <= width; x += 20) {
      for (let y = 0; y <= height; y += 20) {
        let totalForce = new Vector(0, 0);
        for (let i = 0; i < this.objects.length; i++) {
          const force = this.calculateForce(
            this.objects[i],
            new Planet(
              {
                position: new Vector(x, y),
                velocity: new Vector(0, 0),
                acceleration: new Vector(0, 0),
                canvas: this.canvas,
                radius: 1,
                mass: 1,
                color: new Colour(0, 0, 0)
              },
              this.settings
            )
          );
          totalForce = Vector.add(totalForce, force);
        }
        if (totalForce.magnitude() > 1e-4) {
          this.canvas.circle(
            x,
            y,
            Math.min(
              Math.ceil(Vector.magnitude(totalForce) * 10000) / 10000,
              5
            ),
            'rgba(255,255,255,0.5)'
          );
        }
      }
    }
  }

  public clear() {
    this.objects = [];
  }
}
