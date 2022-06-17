import { Canvas } from "../canvas";
import { Vector } from "../vector";
import { GameObject } from "./gameObject";

export class Planet extends GameObject {
  constructor(position: Vector, velocity: Vector, canvas: Canvas, public radius: number = 10, public color: string = "red") {
    super(position, velocity, canvas);
  }

  public update() {
    this.position = Vector.add(this.position, this.velocity);
  }

  public draw() {
    this.canvas.circle(this.position.x, this.position.y, this.radius, this.color);
  }
}