import { Stage } from "lib/display/Stage";

export class GlobalState {
  private static _ctx: CanvasRenderingContext2D;
  private static _root: Stage;

  private static _canvas: HTMLCanvasElement;

  public static get canvas() {
    return this._canvas;
  }

  public static setCanvas(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
  }

  public static get ctx() {
    if (this._ctx) return this._ctx;
    if (!this._canvas) {
      throw new Error('canvas 未初始化');
    };
    const ctx = this._canvas.getContext('2d')!;
    this._ctx = ctx;
    return ctx;
  }


  public static get root() {
    return this._root;
  }

  public static setRoot(stage: Stage) {
    this._root = stage;
  }

}