import { GlobalState } from '../state/GlobalState';
import { Sprite } from './Sprite';

interface DrawStack {
  type: keyof Path2D | keyof CanvasRenderingContext2D;
  params: any;
  target?: 'ctx' | 'path';
}

export class Graphics {
  private sprite: Sprite;
  private stack: DrawStack[] = [];
  private path: Path2D;
  constructor(sprite: Sprite) {
    this.sprite = sprite;
    this.path = new Path2D();
  }

  /**
   * 清除绘图堆栈
   */
  public clear() {
    this.path = new Path2D();
    this.stack = [];
  }

  isHitPoint(x: number, y: number): boolean {
    return GlobalState.ctx.isPointInPath(this.path, x, y);
  }

  createCtxAction<T extends keyof CanvasRenderingContext2D>(type: T) {
    const handler = (...reset: any) => {
      switch (type) {
        case 'clearRect':
        case 'translate':
          reset[0] += this.sprite._x;
          reset[1] += this.sprite._y;
          break;
        case 'fillText':
        case 'strokeText':
          reset[1] += this.sprite._x;
          reset[2] += this.sprite._y;
          break;
        // case 'rotate':
        //   this.stack.push({
        //     type: 'translate',
        //     target: 'ctx',
        //     params: [this.sprite._translateX, this.sprite._translateY],
        //   })
        //   this.stack.push({
        //     type,
        //     target: 'ctx',
        //     params: reset,
        //   });
        //   this.stack.push({
        //     type: 'translate',
        //     target: 'ctx',
        //     params: [-this.sprite._translateX, -this.sprite._translateY],
        //   })
        //   return;
        case 'drawImage':
          reset[1] += this.sprite._x;
          reset[2] += this.sprite._y;
          reset[5] += this.sprite._x;
          reset[6] += this.sprite._y;
          break;
      }
      return this.stack.push({
        type,
        target: 'ctx',
        params: reset,
      });
    };
    return (handler as any) as CanvasRenderingContext2D[T];
  }

  createPathAction<T extends keyof Path2D>(type: T) {
    const handler = (...reset: any) => {
      switch (type) {
        case 'moveTo':
        case 'lineTo':
        case 'ellipse':
        case 'rect':
        case 'arc':
          reset[0] += this.sprite._x;
          reset[1] += this.sprite._y;
          break;
        case 'arcTo':
        case 'quadraticCurveTo':

          reset[0] += this.sprite._x;
          reset[1] += this.sprite._y;
          reset[2] += this.sprite._x;
          reset[3] += this.sprite._y;
          break;
        case 'bezierCurveTo':
          reset[0] += this.sprite._x;
          reset[1] += this.sprite._y;
          reset[2] += this.sprite._x;
          reset[3] += this.sprite._y;
          reset[4] += this.sprite._x;
          reset[5] += this.sprite._y;
          break;
      }
      return this.stack.push({
        type,
        target: 'path',
        params: reset,
      });
    };
    return (handler as any) as Path2D[T];
  }

  print() {
    this.stack.forEach((item) => {
      let target: Path2D | CanvasRenderingContext2D = GlobalState.ctx;
      if (item.target === 'path') {
        target = this.path;
      }
      if (typeof target[item.type] === 'function') {
        if (item.type === 'fill' || item.type === 'stroke') {
          target[item.type](this.path, ...item.params);
          return;
        }
        target[item.type](...item.params);
      } else {
        target[item.type] = item.params;
      }
    });
  }

  // 颜色、样式和阴影

  set fillStyle(value: CanvasRenderingContext2D['fillStyle']) {
    this.stack.push({
      type: 'fillStyle',
      params: value,
    });
  }

  set strokeStyle(value: CanvasRenderingContext2D['strokeStyle']) {
    this.stack.push({
      type: 'strokeStyle',
      params: value,
    });
  }

  set shadowOffsetY(value: CanvasRenderingContext2D['shadowOffsetY']) {
    this.stack.push({
      type: 'shadowOffsetY',
      params: value,
    });
  }

  set shadowOffsetX(value: CanvasRenderingContext2D['shadowOffsetX']) {
    this.stack.push({
      type: 'shadowOffsetX',
      params: value,
    });
  }

  set shadowBlur(value: CanvasRenderingContext2D['shadowBlur']) {
    this.stack.push({
      type: 'shadowBlur',
      params: value,
    });
  }

  // 创建线性渐变
  createLinearGradient(x0: number, y0: number, x1: number, y1: number) {
    return GlobalState.ctx.createLinearGradient(
      x0 + this.sprite._x,
      y0 + this.sprite._y,
      x1 + this.sprite._x,
      y1 + this.sprite._y
    );
  }

  // 线条样式
  createRadialGradient(
    x0: number,
    y0: number,
    r0: number,
    x1: number,
    y1: number,
    r1: number
  ) {
    return GlobalState.ctx.createRadialGradient(
      x0 + this.sprite._x,
      y0 + this.sprite._y,
      r0,
      x1 + this.sprite._x,
      y1 + this.sprite._y,
      r1
    );
  }

  //	在指定的方向上重复指定的元素。
  get createPattern() {
    return this.createCtxAction('createPattern');
  }

  // 设置或返回线条的结束端点样式。
  set lineCap(value: CanvasRenderingContext2D['lineCap']) {
    this.stack.push({
      type: 'lineCap',
      params: value,
    });
  }

  // 设置或返回两条线相交时，所创建的拐角类型。
  set lineJoin(value: CanvasRenderingContext2D['lineJoin']) {
    this.stack.push({
      type: 'lineJoin',
      params: value,
    });
  }

  set lineWidth(value: CanvasRenderingContext2D['lineWidth']) {
    this.stack.push({
      type: 'lineWidth',
      params: value,
    });
  }

  // 设置或返回最大斜接长度。
  set miterLimit(value: CanvasRenderingContext2D['miterLimit']) {
    this.stack.push({
      type: 'miterLimit',
      params: value,
    });
  }

  get save() {
    return this.createCtxAction('save');
  }

  get restore() {
    return this.createCtxAction('restore');
  }

  get fill() {
    return this.createCtxAction('fill');
  }

  get stroke() {
    return this.createCtxAction('stroke');
  }

  get beginPath() {
    return this.createCtxAction('beginPath');
  }

  get moveTo() {
    return this.createPathAction('moveTo');
  }

  get lineTo() {
    return this.createPathAction('lineTo');
  }

  get closePath() {
    return this.createPathAction('closePath');
  }

  get clip() {
    return this.createCtxAction('clip');
  }

  get quadraticCurveTo() {
    return this.createPathAction('quadraticCurveTo');
  }

  get bezierCurveTo() {
    return this.createPathAction('bezierCurveTo');
  }

  get arc() {
    return this.createPathAction('arc');
  }

  get ellipse() {
    return this.createPathAction('ellipse');
  }

  get arcTo() {
    return this.createPathAction('arcTo');
  }

  //矩形
  get rect() {
    return this.createPathAction('rect');
  }

  get clearRect() {
    return this.createCtxAction('clearRect');
  }

  // 转换
  get transform() {
    return this.createCtxAction('transform');
  }

  get rotate() {
    return this.createCtxAction('rotate');
  }

  get scale() {
    return this.createCtxAction('scale');
  }

  get translate() {
    return this.createCtxAction('translate');
  }

  get setTransform() {
    return this.createCtxAction('setTransform');
  }

  // 文本
  set font(value: CanvasRenderingContext2D['font']) {
    this.stack.push({
      type: 'font',
      params: value,
    });
  }

  get font() {
    return GlobalState.ctx.font;
  }

  get fillText() {
    return this.createCtxAction('fillText');
  }

  get strokeText() {
    return this.createCtxAction('strokeText');
  }

  measureText(text: string) {
    return GlobalState.ctx.measureText(text);
  }

  set textAlign(value: CanvasRenderingContext2D['textAlign']) {
    this.stack.push({
      type: 'textAlign',
      params: value,
    });
  }

  set textBaseline(value: CanvasRenderingContext2D['textAlign']) {
    this.stack.push({
      type: 'textAlign',
      params: value,
    });
  }

  set globalAlpha(value: CanvasRenderingContext2D['globalAlpha']) {
    this.stack.push({
      type: 'globalAlpha',
      params: value,
    });
  }

  // 图像绘制
  get drawImage() {
    return this.createCtxAction('drawImage');
  }

  set globalCompositeOperation(
    value: CanvasRenderingContext2D['globalCompositeOperation']
  ) {
    this.stack.push({
      type: 'globalCompositeOperation',
      params: value,
    });
  }
}
