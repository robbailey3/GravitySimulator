import { Vector } from "../vector";
import { GameObject, GameObjectConfig } from "./gameObject";

export interface SunConfig extends GameObjectConfig {
  radius: number;
  mass: number;
  color: string;
}

export class Sun extends GameObject {
  public radius: number;
  public mass: number;
  public color: string;
  
  constructor(
    config: SunConfig
  ) {
    super(config);
  }

  public update() {
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
  }
}