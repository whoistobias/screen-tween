// the purpose is to tween a value between 0 and 1 based on scroll with smooth transition & throttling.
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ScreenTween = /** @class */ (function () {
        function ScreenTween(params) {
            this.currentValue = 0;
            this.speed = .001;
            this.tweening = false;
            this.throttled = null;
            this.easeOutQuint = function (t) { return 1 + (--t) * t * t * t * t; };
            this.params = {
                scrollDistance: params.scrollDistance || 2000,
                target: params.target,
                property: params.property,
                throttleAmount: params.throttleAmount || 200,
                duration: params.duration || 5000,
            };
            this.throttled = this.throttle(this.start.bind(this), 200);
            // console.log('initial start')
            document.addEventListener('scroll', this.throttled);
        }
        // unEaseOutQuint = (p: number) => { }
        ScreenTween.prototype.start = function () {
            var percentScrolled = document.documentElement.scrollTop / this.params.scrollDistance;
            if (percentScrolled > 0 && percentScrolled < 1) {
                this.tweening = true;
                // console.log('starting')
                document.removeEventListener('scroll', this.throttled);
                window.requestAnimationFrame(this.tween.bind(this));
            }
        };
        ScreenTween.prototype.stop = function () {
            this.tweening = false;
            // console.log('stopping')
            document.addEventListener('scroll', this.throttled);
        };
        ScreenTween.prototype.tween = function () {
            var percentScrolled = document.documentElement.scrollTop / this.params.scrollDistance; // new
            if (percentScrolled > 1)
                percentScrolled = 1;
            var percentChanged = percentScrolled - this.currentValue; // distance
            if (percentChanged === 0)
                return this.stop();
            var newValue;
            if (Math.abs(percentChanged) > this.speed) {
                newValue = (percentChanged * .1) + (percentChanged < 0 ? -this.speed : percentChanged > 0 ? this.speed : 0);
                this.currentValue += newValue;
                this.params.target[this.params.property] = this.currentValue;
            }
            else {
                this.currentValue = percentScrolled;
                this.params.target[this.params.property] = this.currentValue;
            }
            // console.log(this.currentValue)
            if (this.currentValue <= 0 || this.currentValue >= 1)
                return this.stop();
            window.requestAnimationFrame(this.tween.bind(this));
        };
        ScreenTween.prototype.throttle = function (fn, delay) {
            var lastCall = 0;
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var now = (new Date).getTime();
                if (now - lastCall < delay) {
                    return;
                }
                lastCall = now;
                return fn.apply(void 0, args);
            };
        };
        return ScreenTween;
    }());
    exports.default = ScreenTween;
});
