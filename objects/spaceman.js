import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { Color, Loader, MeshStandardMaterial, Vector3 } from "../libs/CS559-Three/build/three.module.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

let SpaceShipCount = 0;

export class SpaceMan extends Loaders.ObjGrObject {
    constructor(params = {}) {
    let mat = new MeshStandardMaterial({
        color:"#808080"
    });
    super({
        obj:'../main/images/07-astronaut.obj',
        norm:8.0,
        name:`SpaceShip`,
    })
  }
  
  stepWorld(delta, timeOfDay) {
    this.objects[0].rotateY(delta * 0.0015);
    this.objects[0].rotateZ(delta * 0.0013);
    this.objects[0].rotateX(delta * 0.0016);
    this.u += delta;
    if(this.u > Math.PI * 2) {
        this.u = 0;
    }
  }
}