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
import {SpaceStation} from "./spaceStation.js";
import { SmallPlanet} from "./planet.js";
import { CircularTrack, TrackCube, TrackCar } from "./track.js";
import { Helicopter, Helipad } from "./helicopter.js";
import { ShinySculpture } from "./shinySculpture.js";
import { MorphTest } from "./morph.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

/********************************************************************** */
/** EXAMPLES - student should not use this! It is just for reference    */
/** you may use the sample objects, but not the sample layout           */
/***/
export function main(world) {

  const loader = new T.CubeTextureLoader();
  loader.setPath( '../for_students/images/' );
  
  const textureCube = loader.load( [
    'corona_ft.png','corona_bk.png', 'corona_up.png',
    'corona_dn.png', 'corona_rt.png', 'corona_lf.png', 
  ]);
  world.scene.background = textureCube;

// make two rows of houses, mainly to give something to look at
  let ssRad = 15;
  let spaceStation = new SpaceStation({radius:ssRad, tube:5}); 
  world.add(new SmallPlanet({radius:40, x:55}));
  world.add(spaceStation);
  let numHouses = 16.0
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

  /** Race Track - with three things racing around */
  let tx = spaceStation.objects[0].position.x;
  let ty = spaceStation.objects[0].position.y;
  let tz = spaceStation.objects[0].position.z;
  let track = new CircularTrack({radius:18, x:tx, y:ty, z:tz});
  let tc1 = new TrackCube(track);
  let tc2 = new TrackCube(track);
  let tc3 = new TrackCar(track);
  // place things are different points on the track
  tc2.u = 0.25;
  tc3.u = 0.125;
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

