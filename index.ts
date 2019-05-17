interface Params {
    distance?: number
    target: any
    property: string
    throttle?: number
    speed?: number
    element?: HTMLElement
    callback?: ((value: number) => any) | null
}


export default class ScreenTween {
    public value = 0

    tweening = false
    throttled = null as any

    distance: number
    target: any
    property: string
    throttle: number
    speed: number
    element: HTMLElement
    callback: ((value: number) => any) | null

    constructor(params: Params) {
        try {
            if (params.target && !params.property || params.property && !params.target) throw new Error('You must specify both a target object to change data in and the name of the property to change.')
            if (typeof params.target !== 'object') throw new Error('The target object must be specified as a reference to an object.')
            if (typeof params.property !== 'string') throw new Error('The target property must be specified as a string representing the key of the property to be changed.')
            if (params.speed && params.speed <= 0 || params.speed && params.speed >= 10) throw new Error('Speed must be a value between 0 & 10.')
        } catch (err) {
            console.error(err)
        }
        this.target = params.target
        this.property = params.property
        this.throttle = params.throttle || 100
        this.speed = (params.speed || 1) * .0001
        this.element = params.element || document.documentElement
        this.callback = params.callback || null
        this.distance = params.distance || this.element.scrollHeight - this.element.clientHeight

        this.throttled = this.throttler(this.continue.bind(this), this.throttle!)
        if (this.element === document.documentElement) {
            document.addEventListener('scroll', this.throttled)
        } else {
            this.element.addEventListener('scroll', this.throttled)
        }
    }

    public stop() {
        this.tweening = false
        if (this.element === document.documentElement) {
            document.removeEventListener('scroll', this.throttled)
        } else {
            this.element.removeEventListener('scroll', this.throttled)
        }
    }

    public start() {
        const percentScrolled = this.element.scrollTop / this.distance
        if (percentScrolled > 0 && percentScrolled < 1 || percentScrolled !== this.value) {
            this.continue()
        } else {
            if (this.element === document.documentElement) {
                document.addEventListener('scroll', this.throttled)
            } else {
                this.element.addEventListener('scroll', this.throttled)
            }
        }
    }


    private continue() {
        const percentScrolled = this.element.scrollTop / this.distance
        if (percentScrolled > 0 && percentScrolled < 1 || percentScrolled !== this.value) {
            this.tweening = true
            if (this.element === document.documentElement) {
                document.removeEventListener('scroll', this.throttled)
            } else {
                this.element.removeEventListener('scroll', this.throttled)
            }
            window.requestAnimationFrame(this.tween.bind(this))
        }
    }
    private wait() {
        this.tweening = false
        document.addEventListener('scroll', this.throttled)
    }

    private tween(): number | void {
        if (!this.tweening) return
        let percentScrolled = this.element.scrollTop / this.distance
        if (percentScrolled > 1) percentScrolled = 1
        const percentChanged = percentScrolled - this.value
        if (percentChanged === 0) return this.wait()

        if (Math.abs(percentChanged) > this.speed) {

            const newValue = (percentChanged * (this.speed * 1000)) + (percentChanged < 0 ? -this.speed : percentChanged > 0 ? this.speed : 0)
            this.value += newValue
            if (this.target && this.property) this.target[this.property] = this.value
            if (this.callback) this.callback(this.value)
        } else {

            this.value = percentScrolled
            this.target[this.property] = this.value
            if (this.target && this.property) this.target[this.property] = this.value
            if (this.callback) this.callback(this.value)
        }

        if (this.value <= 0 || this.value >= 1) return this.wait()

        window.requestAnimationFrame(this.tween.bind(this))
    }

    private throttler(fn: any, delay: number) {
        let lastCall = 0
        return (...args: any) => {
            const now = (new Date).getTime()
            if (now - lastCall < delay) return
            lastCall = now
            return fn(...args)
        }
    }
}
