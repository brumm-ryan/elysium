import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { Color, Vector3 } from "../libs/CS559-Three/build/three.module.js";

/**
 * This is a really simple track - just a circle
 * But in addition to having geometry, objects on the track can ask for their
 * position (given their U value).
 * They can also ask for the direction vector.
 */

let SateliteCount = 0;

export class Satelite extends GrObject {
    constructor(params = {}) {
    let radius = params.radius || 10;
    let sphere = new T.SphereBufferGeometry(radius);
    let mesh = new T.Mesh(sphere, params.material);
        mesh.translateX(params.x || 10);
        mesh.translateY(params.y || 20);
        mesh.translateZ(params.z || 10);
    super(`Satelite-${++SateliteCount}`, mesh);
    

  }
  stepWorld(delta, timeOfDay) {
    this.objects[0].rotateY(delta * 0.0001);
    //this.objects[0].rotateOnWorldAxis(new Vector3(1,0,0), delta * 0.01 * Math.PI);
  }
}