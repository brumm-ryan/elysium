/*jshint esversion: 6 */
// @ts-check

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";

import {main} from "../objects/main.js";
import { Vector3 } from "../libs/CS559-Three/build/three.module.js";

// make the world
let world = new GrWorld({
    width: screen.availWidth,
    height: screen.availHeight,
    groundplane: false, // make the ground plane big enough for a world of stuff
    lookat: new Vector3(-20,30,-20),
    lookfrom: new Vector3(-90, 30, -20)

});

main(world);
world.active_camera.translateZ(20)

function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}

world.go();
