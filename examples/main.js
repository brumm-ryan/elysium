/*jshint esversion: 6 */
// @ts-check

//
// CS559 - Graphics Town - Workbook 12
// Example Code: 
// Example "Town"
//
// This sets up the town loading different objects. 
//
// It should be called from the onload function, after the world has been created

/** These imports are for the examples - feel free to remove them */
import { SqrHouse, RectHouse, GrTree } from "./house.js";
import { Satelite } from "./satelite.js";
import {SpaceStation} from "./spaceStation.js";
import { OrbitPlanet, SmallPlanet} from "./planet.js";
import { CircularTrack, SpaceTrain } from "./track.js";
import { Helicopter, Helipad } from "./helicopter.js";
import { ShinySculpture } from "./shinySculpture.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { MorphTest } from "./morph.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { Group, Vector3 } from "../libs/CS559-Three/build/three.module.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

/********************************************************************** */
/** EXAMPLES - student should not use this! It is just for reference    */
/** you may use the sample objects, but not the sample layout           */
/***/
export function main(world) {

  const loader = new T.CubeTextureLoader();
  loader.setPath( '../for_students/images/' );
  //create space skybox
  const textureCube = loader.load( [
    'corona_ft.png','corona_bk.png', 'corona_up.png',
    'corona_dn.png', 'corona_rt.png', 'corona_lf.png', 
  ]);
  world.scene.background = textureCube;
  //build our spacestation elysium
  let ssRad = 15;
  let spaceStation = new SpaceStation({radius:ssRad, tube:5}); 
  let moon = new OrbitPlanet({radius:10, x: -60, texturePath:"../for_students/images/moon-texture.jpg", orbitRadius:110});
  //create some randomly orbiting asteroids
  let numAsteroids = 5;
  for(let i = 0; i < numAsteroids; i++) {
    world.add(new OrbitPlanet({radius:i*2, x: -70 - 5 * i, texturePath:"../for_students/images/Meteor-texture.jpg", orbitRadius:100 - i * 5, u:i, isAsteroid:true}))
  }
  world.add(moon);
  world.add(new SmallPlanet({radius:40, x:55}));
  world.add(spaceStation);

  //build a couple satelites
  let numSatelites = 1;

  let sateliteMat = shaderMaterial("../examples/satelite.vs", "../examples/satelite.fs", {
    side: T.DoubleSide,
    uniforms: {
      radius: { value: 0.1 },
      dots: { value: 3.0 },
      light: { value: new T.Vector3(0.85, 0.85, 0.85) },
      dark: { value: new T.Vector3(0.1, 0.1, 0.1) },
      disp: { value: 3.0 },
      blur: { value: 0.2 }
    },
  });
  
  for(let i =0; i < numSatelites; i++) {
    world.add(new Satelite({x:5,y:5,z:5, radius:1, material:sateliteMat}));
  }


  let numHouses = 16.0;
  let numTrees = 5;
  //add houses and trees to elysium
  for (let i = 0; i < numHouses; i += 1) {
    let angle = ((numHouses) / (Math.PI * 2)) * i
    let x = spaceStation.objects[0].position.x + Math.cos(angle) * ssRad;
    let z = spaceStation.objects[0].position.y + Math.sin(angle) * ssRad;
    let y = spaceStation.objects[0].position.z + 4;
    let house = new SqrHouse({ x: x, y:y, z:z, xrot:Math.PI/2});
    world.add(house);
    //world.add(new GrTree({x:i+ 2, y:1, z:12 +  2 * (i % 2)}));
    //world.add(new RectHouse({ x: i, y:1, z: -12 }));
  }
  //add trees to elysium
  for (let i = 0; i < numTrees; i += 1) {
    let angle = (((numTrees  - 1) / (Math.PI)) * i) +  (Math.PI / 5)
    let x = spaceStation.objects[0].position.x + Math.cos(angle) * ssRad;
    let z = spaceStation.objects[0].position.y + Math.sin(angle) * ssRad;
    let y = spaceStation.objects[0].position.z + 4;
    let tree = new GrTree({ x: x, y:y, z:z, });
    world.add(tree);
    //world.add(new GrTree({x:i+ 2, y:1, z:12 +  2 * (i % 2)}));
    //world.add(new RectHouse({ x: i, y:1, z: -12 }));
  }

  //Add space train to elysium to help citizens navigate
  let tx = spaceStation.objects[0].position.x;
  let ty = spaceStation.objects[0].position.y;
  let tz = spaceStation.objects[0].position.z;
  let track = new CircularTrack({radius:18, x:tx, y:ty, z:tz});
  //train 1
  let tc1 = new SpaceTrain(track);
  let tc2 = new SpaceTrain(track);
  let tc3 = new SpaceTrain(track);
  // place things are different points on the track
  tc2.u = 0.01;
  tc3.u = 0.02;
  // and make sure they are in the world
  world.add(track);
  world.add(tc1);
  world.add(tc2);
  world.add(tc3);

  /** Helicopter - first make places for it to land*/
  world.add(new Helipad(-15, 0, 0));
  world.add(new Helipad(15, 0, 0));
  world.add(new Helipad(0, 0, -17));
  world.add(new Helipad(0, 0, 17));
  let copter = new Helicopter();
  world.add(copter);
  copter.getPads(world.objects);

  // these are testing objects
  world.add(new ShinySculpture(world));
  world.add(new MorphTest({ x: 10, y: 3, r: 2 }));

}

