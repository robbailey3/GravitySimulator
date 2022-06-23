import { Canvas } from '../canvas';
import { Colour } from '../colour';
import { Vector } from '../vector';
import { GameObject, GameObjectConfig } from './gameObject';

export interface PlanetConfig extends GameObjectConfig {
  radius: number;
  mass: number;
  color: Colour;
  showTrail: boolean;
  showForceVector: boolean;
}

export class Planet extends GameObject {
  public radius: number;
  public mass: number;
  public color: Colour;
  public showTrail = false;
  public showForceVector = false;
  private trail: Vector[] = [];
  private currentForce: Vector = new Vector(0, 0);

  constructor(config: PlanetConfig) {
    super(config);
    this.showTrail = config.showTrail;
    this.showForceVector = config.showForceVector;
  }

  public update(force: Vector) {
    // F = ma // a = F/m
    this.currentForce = force.divide(this.mass).multiply(500);
    this.acceleration = force.divide(this.mass);
    this.updateTrail();
    this.velocity = Vector.add(this.velocity, this.acceleration);
    this.position = Vector.add(this.position, this.velocity);
  }

  public draw() {
    this.canvas.circle(
      this.position.x,
      this.position.y,
      this.radius,
      this.color.toHex()
    );
    this.drawTrail();
    this.drawForceVector();
  }

  private drawTrail() {
    if (!this.showTrail) {
      return;
    }
    const trailColor = this.color.clone().setAlpha(0.1);
    this.trail.forEach((v) => {
      this.canvas.circle(v.x, v.y, 1, trailColor.toHex());
    });
  }

  private drawForceVector() {
    if (!this.showForceVector) {
      return;
    }
    const forceColor = this.color.clone().setAlpha(0.5);
    this.canvas.line(
      this.position.x,
      this.position.y,
      this.position.x + this.currentForce.x,
      this.position.y + this.currentForce.y,
      forceColor.toHex()
    );
  }

  private updateTrail() {
    if (this.showTrail) {
      this.trail.push(Vector.clone(this.position));
      if (this.trail.length > 50) {
        this.trail.shift();
      }
    }
  }
}
