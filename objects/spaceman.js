import * as Loaders from "../libs/CS559-Framework/loaders.js";

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