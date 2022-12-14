import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

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