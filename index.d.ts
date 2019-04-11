interface Params {
    scrollDistance?: number;
    target: any;
    property: string;
    throttleAmount?: number;
    duration?: number;
}
export default class ScreenTween {
    currentValue: number;
    params: Params;
    speed: number;
    tweening: boolean;
    throttled: any;
    constructor(params: Params);
    easeOutQuint: (t: number) => number;
    start(): void;
    private stop;
    private tween;
    private throttle;
}
export {};
