import { Shape } from "../display/Shape";

export class Circle extends Shape {
  public radius: number = 0;
  constructor(x: number = 0, y: number = 0, radius: number) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  _draw() {
    this.Graphics.clear();
    this.Graphics.arc(
      0, 0, this.radius, 0, 2 * Math.PI
    );
    super._draw();
  }

}
