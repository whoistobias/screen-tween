# Screen Tween!
Have you ever thought "I wish there was an easy way to implement constant easing with the scroll bar."? Well oh boy, let me tell you, now you can!

Screen Tween is a tiny little javascript class that allows you to tween a value based on the scroll bar.

## Features
Select the element, and point screen tween to a data value and it will produce a number between 0 and 1 that is the percent of a specified distance it is, but the output number is automatically eased.

Screen Tween automatically adds and removes event listeners when the animation isn't running to improve performance. It's also automatically throttled to prevent over-using scroll listeners.

You can attach the tween to any vertically scrolling HTML Element and it'll do the rest.

## Usage
Simply instantiate a new tween and pass it an options object.
```
tween = new ScreenTween({
    scrollDistance: 2000,
    target: this,
    property: 'scrollAmount',
    throttleAmount: 200,
    speed: 2
})
```
Tweening can also be stopped and restarted
```
tween.stop()

tween.start()
```


## Options
These are the default values for the options object.

| Parameter | Default |
| ------ | ------ |
| scrollDistance | 2000 |
| target | |
| property | |
| throttleAmount | 100 |
| speed | 1 |
| element | document.documentElement |