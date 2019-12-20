# Daily Vessel tracks (markers and animation)

## Single page app showing daily vessel routes

## Features

- Dynamic vessel routes using 4 predefined vessels saved in `src/utilities.js`
- Popups with information about location, speed, direction etc
- Vessel path animation and a trailing line behind it
- Color coded animation controls to start, pause, stop, forward, rewind, and jump to a specific point of the route
- Marker clustering when you zoom out enough

## Installing

- Run `yarn` or `npm install` in the project folder
- Run `npm start` to run in developer mode and it will open in the browser automagically

## Building

- Run `npm run build`
- The built project files will be located in the `build` folder

## Built with react, leaflet and a couple plugins

Didn't use redux because it wasn't needed
