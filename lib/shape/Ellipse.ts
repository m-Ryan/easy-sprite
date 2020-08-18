import { Shape } from "../display/Shape";

export class Ellipse extends Shape {
  public radiusX: number = 0;
  public radiusY: number = 0;
  public startAngle: number;
  public endAngle: number;
  private ellRotation: number = 0;

  /**
   *
   * @param x 椭圆圆心的 x 轴坐标。
   * @param y 椭圆圆心的 y 轴坐标。
   * @param radiusX 椭圆长轴的半径。
   * @param radiusY 椭圆短轴的半径。
   * @param startAngle
   * @param endAngle
   */
  constructor(x: number, y: number, radiusX: number, radiusY: number, startAngle: number = 0, endAngle: number = 2 * Math.PI) {
    super();
    this.x = x;
    this.y = y;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.startAngle = startAngle;
    this.endAngle = endAngle;

  }

  _draw() {
    this.Graphics.clear();
    this.Graphics.ellipse(
      0, 0, this.radiusX, this.radiusY, 0, this.startAngle, this.endAngle
    );
    super._draw();
  }

  get rotation() {
    return this.ellRotation;
  }

  set rotation(degree: number) {
    this.ellRotation = degree;
  }
}
