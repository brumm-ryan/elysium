import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { MeshStandardMaterial } from "../libs/CS559-Three/build/three.module.js";

let SpaceShipCount = 0;

export class SpaceShip extends Loaders.ObjGrObject {
    constructor(params = {}) {
    let mat = new MeshStandardMaterial({
        color:"#808080"
    });
    super({
        obj:'main/images/tiefighter.obj',
        norm:4.0,
        name:`SpaceShip`,
        mtl:'main/images/spaceShipTexture.jpg'
        
    })
  }
  stepWorld(delta, timeOfDay) {
    this.objects[0].rotateY(delta * 0.001);
    this.u += delta;
    if(this.u > Math.PI * 2) {
        this.u = 0;
    }
  }
}