import { Canvas } from '../canvas';
import { Vector } from '../vector';
import { GameObject, GameObjectConfig } from './gameObject';

export interface PlanetConfig extends GameObjectConfig {
  radius: number;
  mass: number;
  color: string;
  showTrail?: boolean;
}

export class Planet extends GameObject {
  public radius: number;
  public mass: number;
  public color: string;
  public showTrail = true;
  private trail: Vector[] = [];

  constructor(config: PlanetConfig) {
    super(config);
  }

  public update() {
    if (this.showTrail) {
      this.trail.push(Vector.clone(this.position));
      if (this.trail.length > 100) {
        this.trail.shift();
      }
    }
    this.velocity = Vector.add(this.velocity, this.acceleration);
    this.position = Vector.add(this.position, this.velocity);
  }

  public draw() {
    this.canvas.circle(
      this.position.x,
      this.position.y,
      this.radius,
      this.color
    );
    if (this.showTrail) {
      this.trail.forEach((v) => {
        this.canvas.circle(v.x, v.y, 1, this.color);
      });
    }
  }
}
