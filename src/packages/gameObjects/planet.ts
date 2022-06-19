import { Canvas } from '../canvas';
import { Vector } from '../vector';
import { GameObject } from './gameObject';

export class Planet extends GameObject {
  constructor(
    position: Vector,
    velocity: Vector,
    acceleration: Vector,
    canvas: Canvas,
    public mass: number = 10e24,
    public radius: number = 10,
    public color: string = 'red'
  ) {
    super(position, velocity, acceleration, canvas);
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
