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
            this.tweening = false;
            this.throttled = null;
            try {
                if (!params.target)
                    throw new Error('You must specify the target object to change data in.');
                if (typeof params.target !== 'object')
                    throw new Error('The target object must be specified as a reference to the object.');
                if (!params.property)
                    throw new Error('You must specify the target property to change.');
                if (typeof params.property !== 'string')
                    throw new Error('The target property must be specified as a string.');
                if (params.speed && params.speed <= 0 || params.speed && params.speed >= 10)
                    throw new Error('Speed must be a value between 0 & 10.');
            }
            catch (err) {
                console.error(err);
            }
            this.scrollDistance = params.scrollDistance || 2000;
            this.target = params.target;
            this.property = params.property;
            this.throttleAmount = params.throttleAmount || 100;
            this.speed = (params.speed || 1) * .0001;
            this.element = params.element || document.documentElement;
            this.throttled = this.throttle(this.continue.bind(this), this.throttleAmount);
            if (this.element === document.documentElement) {
                document.addEventListener('scroll', this.throttled);
            }
            else {
                this.element.addEventListener('scroll', this.throttled);
            }
        }
        ScreenTween.prototype.stop = function () {
            this.tweening = false;
            if (this.element === document.documentElement) {
                document.removeEventListener('scroll', this.throttled);
            }
            else {
                this.element.removeEventListener('scroll', this.throttled);
            }
        };
        ScreenTween.prototype.start = function () {
            var percentScrolled = this.element.scrollTop / this.scrollDistance;
            if (percentScrolled > 0 && percentScrolled < 1) {
                this.continue();
            }
            else {
                if (this.element === document.documentElement) {
                    document.addEventListener('scroll', this.throttled);
                }
                else {
                    this.element.addEventListener('scroll', this.throttled);
                }
            }
        };
        ScreenTween.prototype.continue = function () {
            var percentScrolled = this.element.scrollTop / this.scrollDistance;
            if (percentScrolled > 0 && percentScrolled < 1) {
                this.tweening = true;
                if (this.element === document.documentElement) {
                    document.removeEventListener('scroll', this.throttled);
                }
                else {
                    this.element.removeEventListener('scroll', this.throttled);
                }
                window.requestAnimationFrame(this.tween.bind(this));
            }
        };
        ScreenTween.prototype.wait = function () {
            this.tweening = false;
            document.addEventListener('scroll', this.throttled);
        };
        ScreenTween.prototype.tween = function () {
            if (!this.tweening)
                return;
            var percentScrolled = this.element.scrollTop / this.scrollDistance;
            if (percentScrolled > 1)
                percentScrolled = 1;
            var percentChanged = percentScrolled - this.currentValue;
            if (percentChanged === 0)
                return this.wait();
            if (Math.abs(percentChanged) > this.speed) {
                var newValue = (percentChanged * (this.speed * 1000)) + (percentChanged < 0 ? -this.speed : percentChanged > 0 ? this.speed : 0);
                this.currentValue += newValue;
                this.target[this.property] = this.currentValue;
            }
            else {
                this.currentValue = percentScrolled;
                this.target[this.property] = this.currentValue;
            }
            if (this.currentValue <= 0 || this.currentValue >= 1)
                return this.wait();
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
                if (now - lastCall < delay)
                    return;
                lastCall = now;
                return fn.apply(void 0, args);
            };
        };
        return ScreenTween;
    }());
    exports.default = ScreenTween;
});
