import { Shape } from "../display/Shape";

export class Arc extends Shape {
  public radius: number;
  public startAngle: number;
  public endAngle: number;
  public anticlockwise?: boolean;

  constructor(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: boolean | undefined
  ) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.anticlockwise = anticlockwise;
  }


  _draw() {
    this.Graphics.clear();
    this.Graphics.arc(
      0,
      0,
      this.radius,
      this.startAngle,
      this.endAngle,
      this.anticlockwise);
    super._draw();
  }
}
