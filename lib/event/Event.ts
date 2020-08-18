import { EventType, ParseEvent } from './EvenManager';
import { Sprite } from '../display/Sprite';
import { LifeCycle } from './LifeCycle';

export type EventTypeHandler = (e: ParseEvent) => void;
export type EventTypeMap = { [key in EventType]: EventTypeHandler[] };

export class Event extends LifeCycle {
  public touchEnabled = true;
  public parent: Sprite | null = null;
  private propagation = true;
  public eventMap: EventTypeMap = {
    click: [],
    mousedown: [],
    mousemove: [],
    mouseup: [],
    mouseenter: [],
    mouseleave: [],
    mouseout: [],
    mouseover: [],
    touchstart: [],
    touchmove: [],
    touchend: [],
    touchcancel: [],
  };

  public addEventListener(type: EventType, handler: EventTypeHandler) {
    if (!this.eventMap[type]) {
      throw new Error('不支持该事件类型');
    }
    this.eventMap[type]!.push(handler);
  }

  public removeEventListener(type: EventType, handler: EventTypeHandler) {
    if (!this.eventMap[type]) {
      throw new Error('不支持该事件类型');
    }
    this.eventMap[type] = this.eventMap[type]!.filter(
      (item) => item !== handler
    );
  }

  public stopPropagation() {
    this.propagation = false;
  }

  public dispatchEvent(event: ParseEvent) {
    if (!this.touchEnabled) return;
    const type = event.type as EventType;
    if (!this.eventMap[type]) {
      throw new Error('不支持该事件类型');
    }
    this.eventMap[type]!.forEach((handler) => {
      handler(event);
    });

    if (this.propagation) {
      this.parent && this.parent.dispatchEvent(event);
    } else {
      this.propagation = true;
    }
  }

}
