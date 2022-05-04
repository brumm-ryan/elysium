import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { Color, Group, Vector3 } from "../libs/CS559-Three/build/three.module.js";
import { SqrHouse, RectHouse, GrTree } from "./house.js";
import { CircularTrack, SpaceTrain } from "./track.js";
import { Helicopter, Helipad } from "./helicopter.js";

/**
 * This is a really simple track - just a circle
 * But in addition to having geometry, objects on the track can ask for their
 * position (given their U value).
 * They can also ask for the direction vector.
 */

let SpaceStationCount = 0;

function convertToGroup(GrObj) {
    let g = new Group();
    GrObj.objects.forEach(element => {
        g.add(element);
    });
    return g;
}

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

    const centerGeo = new T.TorusGeometry( 5, 1, 160, 100 );
    let insideMat = new T.MeshStandardMaterial({
        metalness:0.4,
        roughness:0.2,
        color:'white'
    });

    const supportGeo = new T.CylinderBufferGeometry(1,1,10);
    let leftSupportMesh = new T.Mesh(supportGeo, insideMat);
    let rightSupportMesh = new T.Mesh(supportGeo, insideMat);

    let insideRing = new T.Mesh(centerGeo, insideMat);

    let mesh = new T.Mesh(geometry, material);
    let g = new T.Group();
    mesh.rotateX(Math.PI/2);
    insideRing.rotateX(Math.PI/2);
    leftSupportMesh.translateX(10);
    leftSupportMesh.rotateZ(Math.PI/2);
    rightSupportMesh.translateX(-10);
    rightSupportMesh.rotateZ(Math.PI/2);
    g.add(mesh);
    g.add(insideRing);
    g.add(leftSupportMesh);
    g.add(rightSupportMesh);
    let numHouses = 16.0;
    let numTrees = 5;
    //add houses and trees to elysium
    for (let i = 0; i < numHouses; i += 1) {
      let angle = ((numHouses) / (Math.PI * 2)) * i
      let x = mesh.position.x + Math.cos(angle) * radius;
      let z = mesh.position.y + Math.sin(angle) * radius;
      let y =mesh.position.z + 4;
      let house = new SqrHouse({ x: x, y:y, z:z, xrot:Math.PI/2});
      g.add(house.objects[0]);
      //world.add(new GrTree({x:i+ 2, y:1, z:12 +  2 * (i % 2)}));
      //world.add(new RectHouse({ x: i, y:1, z: -12 }));
    }
    //add trees to elysium
    for (let i = 0; i < numTrees; i += 1) {
      let angle = (((numTrees  - 1) / (Math.PI)) * i) +  (Math.PI / 5)
      let x = mesh.position.x + Math.cos(angle) * radius;
      let z = mesh.position.y + Math.sin(angle) * radius;
      let y = mesh.position.z + 4;
      let tree = new GrTree({ x: x, y:y, z:z, });
      g.add(convertToGroup(tree));
      //world.add(new GrTree({x:i+ 2, y:1, z:12 +  2 * (i % 2)}));
      //world.add(new RectHouse({ x: i, y:1, z: -12 }));
    }
    g.add(convertToGroup(new Helipad(0, 0, 0)));
    g.translateX(params.x ||-20);
    g.translateY(params.y || 20);
    g.translateZ(params.z || -20);
    super(`SpaceStation-${SpaceStationCount}`, g);

  }
  stepWorld(delta, timeOfDay) {
      this.objects[0].rotateOnAxis(new Vector3(0,1,0), delta * 0.0001);
  }
}
