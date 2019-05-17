# Screen Tween!

Have you ever thought “I wish there was an easy way to implement easing with scroll? Screen Tween is a tiny little javascript class that allows you to ease a value based on the scroll bar.

Select an element, pass a reference to screen tween, and it will produce a constant easing value between 0 and 1 representing the percent the user has scrolled to a specified distance.

I know that's confusing to read. Check out the example [here](https://whoistobias.me/vault/screen-tween/)!

## Features

- Screen Tween automatically adds and removes event listeners when the animation isn’t running to improve performance.
- It’s also automatically throttled to prevent over-using scroll listeners.
- You can specify the throttle amount.
- You can attach the tween to any vertically scrolling HTML Element.
- You can stop and start the number output.
- You can pass a function into the config object that is called each frame of the tween.

## Usage

Simply instantiate a new tween and pass it an options object.
```
tween = new ScreenTween({
    distance: 2000,
    target: this,
    property: 'scrollAmount',
    throttle: 200,
    speed: 1,
    callback: currentValue => console.log(currentValue)
})
```
Tweening can be stopped and restarted, and the current value can be accessed.
```
if (someCondition) {
    tween.stop()
} else if (someOtherCondition) {
    tween.start()
} else {
    console.log(tween.value)
}
```
## Options

These are the default values and required types for the options object.

| Parameter | Default | Type |
| ------ | ------ | ------ |
| `callback` | `null` | Function |
| `element` | `document.documentElement` | HTMLElement |
| `property` | | string |
| `distance` | Element Height | number |
| `speed` | `1` | number |
| `target` | | Object |
| `throttle` | `100` | number |

### callback

The function that will be called each frame of the tween. Screen tween automatically passes the current value as an argument to the function.

### element

The element to measure the scroll value of. If left empty, it defaults to the entire document.

### property

A string representing the key of the property in the element to be changed.

### distance

The distance scrolled that the value is calculated from. If the user has scrolled this distance from the top of the element, the value will be 1.

### speed

A number between 0 and 10 representing the relative speed of the tween effect. 1 is considered "normal speed." .5 is half as fast, 2 is twice as fast.

### target

The reference to the object containing the property to be changed during the tween.

### throttle

The number of milliseconds to throttle the scroll event listener to.