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
        mesh.translateX(params.x || 5);
        mesh.translateY(params.y || 20);
        mesh.translateZ(params.z || 20);
    super(`Satelite-${++SateliteCount}`, mesh);
    this.u = params.u;
    this.orbitRadius = params.orbitRadius || 10
    this.rideable = this.objects[0];
    

  }
  stepWorld(delta, timeOfDay) {
      this.objects[0].rotateY(delta * 0.001);
      this.objects[0].translateX(Math.cos(this.u) * 0.4);
      this.objects[0].translateZ(Math.cos(this.u) * 0.4);
      //this.objects[0].translateY(2, Math.sin(this.u) * 0.0001);
    //  if(this.isAsteroid) {
    //     this.objects[0].position.setComponent(1, Math.sin(this.u * this.asteroidRandomness) * this.orbitRadius);
    //   }
    this.u += delta;
    if(this.u > Math.PI * 2) {
        this.u = 0;
    }
  }
}