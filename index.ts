interface Params {
    scrollDistance?: number
    target: any
    property: string
    throttleAmount?: number
    speed?: number
    element?: HTMLElement
}


export default class ScreenTween {
    currentValue = 0

    tweening = false
    throttled = null as any

    scrollDistance: number
    target: any
    property: string
    throttleAmount: number
    speed: number
    element: HTMLElement

    constructor(params: Params) {
        try {
            if (!params.target) throw new Error('You must specify the target object to change data in.')
            if (typeof params.target !== 'object') throw new Error('The target object must be specified as a reference to the object.')
            if (!params.property) throw new Error('You must specify the target property to change.')
            if (typeof params.property !== 'string') throw new Error('The target property must be specified as a string.')
            if (params.speed && params.speed <= 0 || params.speed && params.speed >= 10) throw new Error('Speed must be a value between 0 & 10.')
        } catch (err) {
            console.error(err)
        }
        this.scrollDistance = params.scrollDistance || 2000
        this.target = params.target
        this.property = params.property
        this.throttleAmount = params.throttleAmount || 100
        this.speed = (params.speed || 1) * .0001
        this.element = params.element || document.documentElement

        this.throttled = this.throttle(this.continue.bind(this), this.throttleAmount!)
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
        const percentScrolled = this.element.scrollTop / this.scrollDistance
        if (percentScrolled > 0 && percentScrolled < 1 || percentScrolled !== this.currentValue) {
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
        const percentScrolled = this.element.scrollTop / this.scrollDistance
        if (percentScrolled > 0 && percentScrolled < 1 || percentScrolled !== this.currentValue) {
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
        let percentScrolled = this.element.scrollTop / this.scrollDistance
        if (percentScrolled > 1) percentScrolled = 1
        const percentChanged = percentScrolled - this.currentValue
        if (percentChanged === 0) return this.wait()

        if (Math.abs(percentChanged) > this.speed) {

            const newValue = (percentChanged * (this.speed * 1000)) + (percentChanged < 0 ? -this.speed : percentChanged > 0 ? this.speed : 0)
            this.currentValue += newValue
            this.target[this.property] = this.currentValue

        } else {

            this.currentValue = percentScrolled
            this.target[this.property] = this.currentValue

        }

        if (this.currentValue <= 0 || this.currentValue >= 1) return this.wait()

        window.requestAnimationFrame(this.tween.bind(this))
    }

    private throttle(fn: any, delay: number) {
        let lastCall = 0
        return (...args: any) => {
            const now = (new Date).getTime()
            if (now - lastCall < delay) return
            lastCall = now
            return fn(...args)
        }
    }
}
