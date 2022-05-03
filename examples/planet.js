import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { Color } from "../libs/CS559-Three/build/three.module.js";

/**
 * This is a really simple track - just a circle
 * But in addition to having geometry, objects on the track can ask for their
 * position (given their U value).
 * They can also ask for the direction vector.
 */

let SmallPlanetCount = 0;

export class SmallPlanet extends GrObject {
  constructor(params = {}) {
    let radius = params.radius || 10;
    let texturePath = params.texturePath || "../for_students/images/earthmap1k.jpg";
    let bumpMapPath = params.bumpMap || "../for_students/images/earthbump1k.jpg";
    let texture = new T.TextureLoader().load(texturePath);
    let bumps = new T.TextureLoader().load(bumpMapPath);
    let sphere = new T.SphereBufferGeometry(radius)
    let material = new T.MeshStandardMaterial({
        map:texture,
        bumpMap:bumps,
        color:'white'
    });

    let mesh = new T.Mesh(sphere, material);
        mesh.translateX(params.x || 10);
        mesh.translateY(params.y || 20);
        mesh.translateZ(params.z || 10);
    super(`SmallPlanet-${SmallPlanetCount}`, mesh);

  }
  stepWorld(delta, timeOfDay) {
      this.objects[0].rotateY(delta * 0.0001);
  }
}
