/*jshint esversion: 6 */
// @ts-check

import { SpaceMan } from "./spaceman.js";
import {SpaceStation} from "./spaceStation.js";
import { OrbitPlanet, SmallPlanet} from "./planet.js";
import { SpaceTrain } from "./track.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { SpaceShip } from "./spaceShip.js";
import { droneCraft } from "./drone.js";

export function main(world) {

  const loader = new T.CubeTextureLoader();
  loader.setPath( '../main/images/' );
  //create space skybox
  const textureCube = loader.load( [
    'corona_ft.png','corona_bk.png', 'corona_up.png',
    'corona_dn.png', 'corona_rt.png', 'corona_lf.png', 
  ]);
  world.scene.background = textureCube;
  //build our spacestation elysium
  let ssRad = 15;
  let spaceStation = new SpaceStation({radius:ssRad, tube:5}); 
  let moon = new OrbitPlanet({radius:10, x: -60, texturePath:"main/images/moon-texture.jpg", orbitRadius:110});

  //create some randomly orbiting asteroids
  let numAsteroids = 5;
  for(let i = 0; i < numAsteroids; i++) {
    world.add(new OrbitPlanet({radius:i*2, x: -70 - 5 * i, texturePath:"main/images/Meteor-texture.jpg", orbitRadius:100 - i * 5, u:i, isAsteroid:true}))
  }
  world.add(moon);
  world.add(new SmallPlanet({radius:40, x:55}));
  world.add(spaceStation);

  // //Add space train to elysium to help citizens navigate
  
  //train 1
  let ssGlobal = spaceStation.objects[0].position;
  let quat = spaceStation.objects[0].children[0].quaternion;
  let tc1 = new SpaceTrain({parentPos:ssGlobal, quaternion:quat, radius:17.5, y:2});
  let tc2 = new SpaceTrain({parentPos:ssGlobal, quaternion:quat, radius:17.5, y:2});
  let tc3 = new SpaceTrain({parentPos:ssGlobal, quaternion:quat, radius:17.5,  y:2});
  
  tc2.u = 0.01;
  tc3.u = 0.02;
  
  world.add(tc1);
  world.add(tc2);
  world.add(tc3);

  let quat2 = spaceStation.objects[0].children[0].quaternion;
  let tc4 = new SpaceTrain({parentPos:ssGlobal, quaternion:quat, radius:17.5, y:-2});
  let tc5 = new SpaceTrain({parentPos:ssGlobal, quaternion:quat, radius:17.5, y:-2});
  let tc6 = new SpaceTrain({parentPos:ssGlobal, quaternion:quat, radius:17.5,  y:-2});
  
  tc4.u = 0.5
  tc5.u = 0.51;
  tc6.u = 0.52;
 
  world.add(tc4);
  world.add(tc5);
  world.add(tc6);

  let spaceShip = new SpaceShip();
  world.add(spaceShip);
  spaceShip.setPos(-20,20,-20);
  spaceShip.setScale(0.7,0.7,0.7);

  let spaceman = new SpaceMan();
  world.add(spaceman);
  spaceman.setPos(-23,20,-20);
  spaceman.setScale(0.4,0.4,0.4);

  let d = new droneCraft();
  d.objects[0].position.set(-20,20,-20);
  world.add(d);

}

