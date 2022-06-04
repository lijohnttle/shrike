import express from 'express';
import { ControllerContext } from './ControllerContext';


export class ControllerBase {
    /**
     * @param {String} name 
     */
    constructor(name) {
        this.name = name;
    }

    /**
     * Registers the controller.
     * @param {express.Express} app 
     * @param {ControllerContext} context 
     */
    register(app, context) {
        
    }

    beginRegister() {
        console.log(`Registering ${this.name}...`);
    }

    endRegister() {
        console.log(`Registered ${this.name}`);
        console.log('');
    }
}
