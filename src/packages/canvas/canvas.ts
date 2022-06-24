export interface CanvasConfig {
  backgroundColor: string;
  fillColor: string;
  strokeColor: string;
}

export class Canvas {
  private readonly ctx: CanvasRenderingContext2D;

  private config: CanvasConfig = {
    backgroundColor: '#000000',
    fillColor: '#ffffff',
    strokeColor: '#ffffff'
  };

  constructor(public readonly element: HTMLCanvasElement) {
    if (!element) {
      throw new Error('Canvas element is not defined');
    }
    this.ctx = element.getContext('2d');
  }

  public setSize(width: number, height: number) {
    this.element.width = width;
    this.element.height = height;
  }

  public clear() {
    this.ctx.save();
    this.ctx.fillStyle = this.config.backgroundColor;
    this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    this.ctx.fillRect(0, 0, this.element.width, this.element.height);
    this.ctx.restore();
  }

  public circle(
    x: number,
    y: number,
    radius: number,
    fillColour: string = this.config.fillColor
  ) {
    this.ctx.save();
    this.ctx.fillStyle = fillColour;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  public line(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    strokeColour: string = this.config.strokeColor
  ) {
    this.ctx.save();
    this.ctx.strokeStyle = strokeColour;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.restore();
  }

  public get width(): number {
    return this.element.width;
  }

  public get height(): number {
    return this.element.height;
  }
}
