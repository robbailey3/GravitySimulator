import { Canvas } from '../canvas';
import { Vector } from '../vector';

export interface GameObjectConfig {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  canvas: Canvas;
}

export abstract class GameObject {
  public position: Vector;
  public velocity: Vector;
  public acceleration: Vector;
  public canvas: Canvas;
  
  constructor(config: GameObjectConfig) {
    Object.assign(this, config);
  }

  public abstract update(): void;

  public abstract draw(): void;
}
