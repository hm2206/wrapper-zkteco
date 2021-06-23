## Wrapper ZKTeco solo para windows


### Ejemplo


``` js

    'use strict';

    const Clock = require('./Clock');
    const path = require('path');

    let ip = "192.168.1.0"; // ip del reloj
    const clock = new Clock(ip);
    clock.getAttendents(path.resolve(__dirname, './result/'))
    .then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });


```