import { Canvas } from '../canvas';
import { Colour } from '../colour';
import { SettingsManager } from '../game/settings';
import { Vector } from '../vector';
import { GameObject, GameObjectConfig } from './gameObject';

export interface PlanetConfig extends GameObjectConfig {
  radius: number;
  mass: number;
  color: Colour;
}

export class Planet extends GameObject {
  public radius: number;
  public mass: number;
  public color: Colour;
  private trail: Vector[] = [];
  private currentForce: Vector = new Vector(0, 0);

  constructor(config: PlanetConfig, settings: SettingsManager) {
    super(config, settings);
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
    if (!this.settings.displayTrail) {
      return;
    }
    const trailColor = this.color.clone().setAlpha(0.1);
    this.trail.forEach((v) => {
      this.canvas.circle(v.x, v.y, 1, trailColor.toHex());
    });
  }

  private drawForceVector() {
    if (!this.settings.displayForceVector) {
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
    if (!this.settings.displayTrail) {
      return;
    }
    this.trail.push(Vector.clone(this.position));
    if (this.trail.length > 50) {
      this.trail.shift();
    }
  }
}
