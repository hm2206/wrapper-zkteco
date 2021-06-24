'use strict';

const fs = require('fs');
const path = require('path');
const { uid } = require('uid');
const { execSync } = require('child_process');

class Clock {

    commands = {
        attendents: 'usuarioasistencia',
        users:  'usuariobuscartodos',
        deleteAttendents: 'borrartotalasistencias'
    };

    constructor(ip) {
        this.ip = ip;
        this.pathLib = path.resolve(__dirname, '../lib/Clock.exe');
    }

    getAttendents() {
        return new Promise((resolve, reject) => {
            try {
                let dir = path.join(__dirname, './result');
                // crear dir
                if (!fs.existsSync(dir)) fs.mkdirSync(dir);
                let filename = `${uid(8)}.json`
                let pathAbsolute = path.join(dir, filename);
                execSync(`${this.pathLib} ${this.ip} ${this.commands.attendents} "${pathAbsolute}"`)
                let { total, assistencias, message } = require(pathAbsolute);
                fs.rmSync(pathAbsolute);
                if (Array.isArray(assistencias)) return resolve({ total, assistencias });
                // generar error
                new Error(message)
            } catch (error) {
                return reject(error);
            }
        })
    }

}

module.exports = Clock;