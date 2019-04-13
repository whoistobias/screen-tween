interface Params {
    distance?: number;
    target: any;
    property: string;
    throttle?: number;
    speed?: number;
    element?: HTMLElement;
    callback?: ((value: number) => any) | null;
}
export default class ScreenTween {
    value: number;
    tweening: boolean;
    throttled: any;
    distance: number;
    target: any;
    property: string;
    throttle: number;
    speed: number;
    element: HTMLElement;
    callback: ((value: number) => any) | null;
    constructor(params: Params);
    stop(): void;
    start(): void;
    private continue;
    private wait;
    private tween;
    private throttler;
}
export {};
