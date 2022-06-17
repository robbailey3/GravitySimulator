import { Canvas } from "../canvas";
import { Vector } from "../vector";

export abstract class GameObject {
  constructor(public position: Vector, public velocity: Vector, protected canvas: Canvas) { }
  
  public abstract update(): void;

  public abstract draw(): void;

}
