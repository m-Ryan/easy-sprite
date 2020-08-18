import { Sprite } from './Sprite';

export class Shape extends Sprite {
  public lineWidth?: CanvasPathDrawingStyles['lineWidth'];
  public lineCap?: CanvasPathDrawingStyles['lineCap'];
  public lineJoin?: CanvasPathDrawingStyles['lineJoin'];
  public fillStyle?: CanvasFillStrokeStyles['fillStyle'];
  public strokeStyle?: CanvasFillStrokeStyles['strokeStyle'];

  protected _draw() {
    if (this.lineWidth) {
      this.Graphics.lineWidth = this.lineWidth;
    }

    if (this.lineJoin) {
      this.Graphics.lineJoin = this.lineJoin;
    }

    if (this.lineCap) {
      this.Graphics.lineCap = this.lineCap;
    }

    if (this.fillStyle) {
      this.Graphics.fillStyle = this.fillStyle;
      this.Graphics.fill();
    }

    if (this.strokeStyle) {
      this.Graphics.strokeStyle = this.strokeStyle;
      this.Graphics.stroke();
    }
  }
}
