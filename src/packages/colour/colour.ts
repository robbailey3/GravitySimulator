export class Colour {
  public r: number;
  public g: number;
  public b: number;
  public a: number;

  constructor(r: number, g: number, b: number, a: number = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  public static fromHex(hex: string): Colour {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return new Colour(r, g, b);
  }

  public static fromRGB(r: number, g: number, b: number): Colour {
    return new Colour(r, g, b);
  }

  public toHex(): string {
    return `#${this.r.toString(16).padStart(2, '0')}${this.g
      .toString(16)
      .padStart(2, '0')}${this.b.toString(16).padStart(2, '0')}`;
  }

  public toRGB(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  public toRGBA(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  public toHexWithAlpha(): string {
    return `#${this.r.toString(16).padStart(2, '0')}${this.g
      .toString(16)
      .padStart(2, '0')}${this.b.toString(16).padStart(2, '0')}${Math.round(
      this.a * 255
    )
      .toString(16)
      .padStart(2, '0')}`;
  }

  public clone(): Colour {
    return new Colour(this.r, this.g, this.b, this.a);
  }

  public setAlpha(a: number): Colour {
    this.a = a;
    return this;
  }
}
