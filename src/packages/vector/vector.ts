export class Vector {
  public x: number;
  public y: number;

  constructor(x: number | { x: number; y: number }, y?: number) {
    if (typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
  }

  public static clone(v: Vector): Vector {
    return new Vector(v.x, v.y);
  }

  public static add(v1: Vector, v2: Vector): Vector {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }

  public static subtract(v1: Vector, v2: Vector): Vector {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }

  public static multiply(v: Vector, n: number): Vector {
    return new Vector(v.x * n, v.y * n);
  }

  public static divide(v: Vector, n: number): Vector {
    return new Vector(v.x / n, v.y / n);
  }

  public static dot(v1: Vector, v2: Vector): number {
    return v1.x * v2.x + v1.y * v2.y;
  }

  public static magnitude(v: Vector): number {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  public static normalize(v: Vector): Vector {
    return Vector.divide(v, Vector.magnitude(v));
  }

  public static rotate(v: Vector, rad: number): Vector {
    return new Vector(
      v.x * Math.cos(rad) - v.y * Math.sin(rad),
      v.x * Math.sin(rad) + v.y * Math.cos(rad)
    );
  }

  public static rotateDeg(v: Vector, deg: number): Vector {
    return Vector.rotate(v, (deg * Math.PI) / 180);
  }

  public static angle(v: Vector): number {
    return Math.atan2(v.y, v.x);
  }

  public static angleDeg(v: Vector): number {
    return (Vector.angle(v) * 180) / Math.PI;
  }

  public static angleBetween(v1: Vector, v2: Vector): number {
    return Vector.dot(v1, v2) / (v1.magnitude() * v2.magnitude());
  }

  public static angleBetweenDeg(v1: Vector, v2: Vector): number {
    return (Vector.angleBetween(v1, v2) * 180) / Math.PI;
  }

  public add(v: Vector): Vector {
    return Vector.add(this, v);
  }

  public subtract(v: Vector): Vector {
    return Vector.subtract(this, v);
  }

  public multiply(n: number): Vector {
    return Vector.multiply(this, n);
  }

  public divide(n: number): Vector {
    return Vector.divide(this, n);
  }

  public dot(v: Vector): number {
    return Vector.dot(this, v);
  }

  public magnitude(): number {
    return Vector.magnitude(this);
  }

  public normalize(): Vector {
    return Vector.normalize(this);
  }

  public rotate(rad: number): Vector {
    return Vector.rotate(this, rad);
  }

  public rotateDeg(deg: number): Vector {
    return Vector.rotateDeg(this, deg);
  }
}
