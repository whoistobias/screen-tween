interface Params {
    scrollDistance?: number;
    target: any;
    property: string;
    throttleAmount?: number;
    speed?: number;
    element?: HTMLElement;
}
export default class ScreenTween {
    currentValue: number;
    tweening: boolean;
    throttled: any;
    scrollDistance: number;
    target: any;
    property: string;
    throttleAmount: number;
    speed: number;
    element: HTMLElement;
    constructor(params: Params);
    stop(): void;
    start(): void;
    private continue;
    private wait;
    private tween;
    private throttle;
}
export {};
