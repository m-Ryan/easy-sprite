import { Shape } from '../display/Shape';

export class StraightLine extends Shape {
  public endX: number = 0;
  public endY: number = 0;
  constructor(x: number, y: number, endX: number, endY: number) {
    super();
    this.x = x;
    this.y = y;
    this.endX = endX;
    this.endY = endY;

  }


  _draw() {

    this.Graphics.clear();
    this.Graphics.beginPath();

    this.Graphics.moveTo(
      0, 0
    );
    this.Graphics.lineTo(
      this.endX - this.x, this.endY - this.y
    );
    this.Graphics.closePath();
    super._draw();
  }

}
