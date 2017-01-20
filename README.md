# Pick-Up-Sticks
An HTML/JavaScript implementation of the game Pick-up-sticks.

![Preview](/src/images/PickUpSticksImage.png)

[Demo](http://batface.github.io/Pick-Up-Sticks/)

Set up for development with JetBrains WebStorm, but game will run just from the main index.html file. If you want to run this yourself and edit the CSS, you'll need to fix the file watcher for SCSS files to fit with your setup or do the transpilation manually.

## Browser Compatibility
Not all. Uses numerical inputs, viewport units and SVGs.

## TODO List
* Replace numeric input with a solution that works in more browsers
* Have different game modes where you don't have to enter the level manually and the time limit is not always 30 seconds.
* Make responsiveness better. Currently the size of the sticks you'll get in the game between resizing the window and starting a new game **after** having resized the window are different (addition of SVG scaling onto the whole game area was added quite late on so it's not yet complete).
* Restructure project to have a distribution version separate from the development one, with minified JS/CSS etc
