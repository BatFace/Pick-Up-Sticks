# Pick-Up-Sticks
An HTML/JavaScript implementation of the game Pick-up-sticks.

![Preview](/src/images/PickUpSticksImage.png)

[Demo](http://batface.github.io/Pick-Up-Sticks/)

## Build and run
Requires npm for installing node packages. After npm install, to build:

````
npm run build
````

...and then browse to index.html in the generated dist directory (it's static).

N.B: Windows users: Build script would need tweaking or use of something like UnxUtils or Bash on Windows

If you want to make changes to the stylesheet, you'll need to interpret the SCSS into CSS before running the build script.

## Browser Compatibility
Not universal. Uses numerical inputs, viewport units and SVGs.

## TODO List
* Different game modes where you don't have to enter the level manually and time limit is not always 30 seconds.
* Improve responsiveness. Currently the size of the sticks you'll get in the game between resizing the window and starting a new game **after** having resized the window are different.
* Minify JS/CSS
* Tests
