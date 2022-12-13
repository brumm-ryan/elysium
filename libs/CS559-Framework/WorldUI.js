/*jshint esversion: 11 */
// @ts-check

/**
 * CS559 3D World Framework Code
 *
 * Simple, automatic UI from a  GrWorld 
 *
 * @module WorldUI 
 * */

// we need to have the BaseClass definition
import { GrObject } from "./GrObject.js";
// we need to import the module to get its typedefs for the type checker
import * as InputHelpers from "../CS559/inputHelpers.js";
import { GrWorld } from "./GrWorld.js";
import * as T from "../CS559-Three/build/three.module.js";
import { panel } from "./AutoUI.js";

// allow for adding a "remote" button for grading
function remoteButton(button, url, world, where) {
    // attempt to do "lazy loading"
    // inspired by on https://blog.avenuecode.com/lazy-loading-es2015-modules-in-the-browser
    // refer to...
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
    const but = InputHelpers.makeButton(button, where);
    but.onclick = function() {
        /* jshint ignore:start */
        import(url)
            .then(function(mod) {
                mod.logme(world,T);
            })
        .catch(err => {
                alert("Grading Script not Available - students don't need to worry about this.");
                console.log(`error loading grading module ${err}`); 
            });
        /* jshint ignore:end */
    };
}

export class WorldUI {
    /**
     * Create a UI panel for a GrWorld - this mimics the AutoUI
     * for GrObject.
     * 
     * Note: this just creates controls for the world parameters. 
     * It does not create UIs for the objects in the world
     *
     * This does place the panel into the DOM (onto the web page)
     * using `insertElement` in the CS559 helper library. The place
     * it is placed is controlled the `where` parameter. If you don't
     * pass a place, it puts it in a "Panel Panel" at the end of the DOM 
     * (see AutoUI)
     *
     * @param {GrWorld} world
     * @param {number} [width=300]
     * @param {InputHelpers.WhereSpec} [where] - where to place the panel in the DOM (at the end of the page by default)
     */
    constructor(world, width = 500, where = undefined, grading=true) {
        const self = this;
        this.world = world;
    }
}
