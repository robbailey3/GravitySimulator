import { Colour } from '../colour';
import { SettingsManager } from '../game/settings';
import { Vector } from '../vector';
import { GameObject, GameObjectConfig } from './gameObject';

export interface SunConfig extends GameObjectConfig {
  radius: number;
  mass: number;
  color: Colour;
}

export class Sun extends GameObject {
  public radius: number;
  public mass: number;
  public color: Colour;

  constructor(config: SunConfig, settings: SettingsManager) {
    super(config, settings);
  }

  public update(force: Vector) {
    this.acceleration = force.divide(this.mass);
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
  }
}
