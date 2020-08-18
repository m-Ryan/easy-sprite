import { GlobalState } from "../state/GlobalState";


export function getBoundingRect(event: MouseEvent | TouchEvent) {
  const stage = GlobalState.canvas;
  const doc = document.documentElement;
  const left = stage.offsetLeft + window.pageXOffset - doc.clientLeft;
  const top = stage.offsetTop + window.pageYOffset - doc.clientTop;
  const pageX = isTouchEvent(event) ? event.changedTouches[0].pageX : event.pageX;
  const pageY = isTouchEvent(event) ? event.changedTouches[0].pageY : event.pageY;
  return {
    x: (pageX - left) * window.devicePixelRatio,
    y: (pageY - top) * window.devicePixelRatio,
  };
}


function isTouchEvent(ev: MouseEvent | TouchEvent): ev is TouchEvent {
  return Boolean((ev as MouseEvent).type.includes('touch'));
}