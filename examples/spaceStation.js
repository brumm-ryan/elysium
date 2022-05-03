import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { Color, Group } from "../libs/CS559-Three/build/three.module.js";
import { SqrHouse, RectHouse, GrTree } from "./house.js";

/**
 * This is a really simple track - just a circle
 * But in addition to having geometry, objects on the track can ask for their
 * position (given their U value).
 * They can also ask for the direction vector.
 */

let SpaceStationCount = 0;

export class SpaceStation extends GrObject {
  constructor(params = {}) {
    let radius = params.radius || 10;
    let tube = params.tube || 3;
    let texturePath = params.texturePath || "../for_students/images/spaceShipTexture.jpg";
    let texture = new T.TextureLoader().load(texturePath);
    
    const geometry = new T.TorusGeometry( radius, 3, 160, 100 );
    let material = new T.MeshStandardMaterial({
        map:texture,
        normalMap:texture,
        metalness:0.4,
        roughness:0.2,
        color:'white'
    });

    let mesh = new T.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.translateX(params.x ||-20);
    mesh.translateY(params.y || 20);
    mesh.translateZ(params.z || -20);
    
        // for (let i = -19; i < 20; i += 5) {
        //     group.add( new SqrHouse({ x: i, y:1, z: 12 }));
        //     group.add(new GrTree({x:i+ 2, y:1, z:12 +  2 * (i % 2)}));
        //     group.add(new RectHouse({ x: i, y:1, z: -12 }));
        //   }

    super(`SpaceStation-${SpaceStationCount}`, mesh);

  }
  stepWorld(delta, timeOfDay) {
      //this.objects[0].rotateZ(delta * 0.0001);
  }
}
