import { Canvas } from '../canvas';
import { Colour } from '../colour';
import { Vector } from '../vector';

export interface GameObjectConfig {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  canvas: Canvas;
  radius: number;
  mass: number;
  color: Colour;
}

export abstract class GameObject {
  public position: Vector;
  public velocity: Vector;
  public acceleration: Vector;
  public canvas: Canvas;
  public radius: number;
  public mass: number;
  public color: Colour;

  constructor(config: GameObjectConfig) {
    Object.assign(this, config);
  }

  public abstract update(force: Vector): void;

  public abstract draw(): void;
}
