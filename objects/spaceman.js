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
    super({
        obj:'main/images/07-astronaut.obj',
        norm:4.0,
        name:`SpaceMan`,
        mtl:'main/images/Meteor-texture.jpg'
    })
  }
  
  stepWorld(delta, timeOfDay) {
  }
}