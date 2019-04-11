// the purpose is to tween a value between 0 and 1 based on scroll with smooth transition & throttling.

// export const onScroll = throttle(doThing, 250)
interface Params {
    scrollDistance?: number
    target: any
    property: string
    throttleAmount?: number
    duration?: number
}


export default class ScreenTween {
    currentValue = 0

    params: Params
    speed = .001
    tweening = false
    throttled = null as any

    constructor(params: Params) {
        this.params = {
            scrollDistance: params.scrollDistance || 2000,
            target: params.target,
            property: params.property,
            throttleAmount: params.throttleAmount || 200,
            duration: params.duration || 5000,
        }
        this.throttled = this.throttle(this.start.bind(this), 200)
        // console.log('initial start')
        document.addEventListener('scroll', this.throttled)
    }
    easeOutQuint = (t: number) => 1 + (--t) * t * t * t * t
    // unEaseOutQuint = (p: number) => { }


    public start() {
        const percentScrolled = document.documentElement.scrollTop / this.params.scrollDistance!
        if (percentScrolled > 0 && percentScrolled < 1) {
            this.tweening = true
            // console.log('starting')
            document.removeEventListener('scroll', this.throttled)
            window.requestAnimationFrame(this.tween.bind(this))
        }
    }
    private stop() {
        this.tweening = false
        // console.log('stopping')
        document.addEventListener('scroll', this.throttled)
    }

    private tween(): number | void {
        let percentScrolled = document.documentElement.scrollTop / this.params.scrollDistance! // new
        if (percentScrolled > 1) percentScrolled = 1

        const percentChanged = percentScrolled - this.currentValue // distance
        if (percentChanged === 0) return this.stop()

        let newValue
        if (Math.abs(percentChanged) > this.speed) {
            newValue = (percentChanged * .1) + (percentChanged < 0 ? -this.speed : percentChanged > 0 ? this.speed : 0)


            this.currentValue += newValue

            this.params.target[this.params.property] = this.currentValue
        } else {
            this.currentValue = percentScrolled
            this.params.target[this.params.property] = this.currentValue
        }
        // console.log(this.currentValue)
        if (this.currentValue <= 0 || this.currentValue >= 1) return this.stop()

        window.requestAnimationFrame(this.tween.bind(this))
    }

    private throttle(fn: any, delay: number) {
        let lastCall = 0
        return (...args: any) => {
            const now = (new Date).getTime()
            if (now - lastCall < delay) {
                return
            }
            lastCall = now
            return fn(...args)
        }
    }
}
