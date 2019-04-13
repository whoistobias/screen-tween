interface Params {
    scrollDistance?: number;
    target: any;
    property: string;
    throttleAmount?: number;
    speed?: number;
    element?: HTMLElement;
    callback?: ((value: number) => any) | null;
}
export default class ScreenTween {
    value: number;
    tweening: boolean;
    throttled: any;
    scrollDistance: number;
    target: any;
    property: string;
    throttleAmount: number;
    speed: number;
    element: HTMLElement;
    callback: ((value: number) => any) | null;
    constructor(params: Params);
    stop(): void;
    start(): void;
    private continue;
    private wait;
    private tween;
    private throttle;
}
export {};
