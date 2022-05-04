/*jshint esversion: 6 */
// @ts-check

/*
 * Graphics Town Example Objects
 *
 * Simple Circular Track - and an object that goes around on it
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { BoxBufferGeometry, Group } from "../libs/CS559-Three/build/three.module.js";

/**
 * This is a really simple track - just a circle
 * But in addition to having geometry, objects on the track can ask for their
 * position (given their U value).
 * They can also ask for the direction vector.
 */
export class CircularTrack extends GrObject {
  constructor(params = {}) {
    let radius = params.radius || 6;
    let width = params.width || 1;
    let ring = new T.RingGeometry(radius - width, radius + width, 20, 3);
    let material = new T.MeshStandardMaterial({
      side: T.DoubleSide,
      color: "#909090",
      roughness: 1.0,
    });
    let mesh = new T.Mesh(ring, material);
    mesh.rotateX(Math.PI / 2);
    let group = new T.Group();
    group.add(mesh);
    group.translateX(params.x || 0);
    group.translateY(params.y || 0.1); // raise track above ground to avoid z-fight
    group.translateZ(params.z || 0);
    super(`CircularTrack`, group);

    this.x = params.x || 0;
    this.z = params.z || 0;
    this.y = params.y || 0.1;
    this.r = radius;
  }
  eval(u) {
    let p = u * 2 * Math.PI;
    return [
      this.x + (this.r + 0.5) * Math.cos(p),
      this.y,
      this.z + (this.r + 0.5) * Math.sin(p),
    ];
  }
  tangent(u) {
    let p = u * 2 * Math.PI;
    // unit tangent vector - not the real derivative
    return [Math.sin(p), 0, -Math.cos(p)];
  }
}

/**
 * A simple object to go around a track - key thing, it knows the track so it can ask the track
 * where it should be
 */
let SpaceTrainCount = 0;

export class SpaceTrain extends GrObject {
  constructor(params = {}) {

    let geometry = new BoxBufferGeometry(1,1,1);
    let mesh = new T.Mesh(geometry, new T.MeshStandardMaterial({ color: params.color ?? '#808080' }));

    super(`SpaceTrain-${++SpaceTrainCount}`, mesh);
    this.u = 0;
    this.rideable = this.objects[0];
    this.parentPos = params.parentPos;
    this.radius = params.radius;
    this.quat = params.quaternion;
    this.y = params.y;
    
  }
  stepWorld(delta, timeOfDay) {
    this.u += delta / 2000;
    let pos = this.eval(this.u, this.parentPos, this.radius);
    // remember, the center of the cube needs to be above ground!
    this.objects[0].rotation.setFromQuaternion(this.quat);
    this.objects[0].position.set(pos[0], pos[1], pos[2]);
    let dir = this.tangent(this.u);
    // since we can't easily construct the matrix, figure out the rotation
    // easy since this is 2D!
    let zAngle = Math.atan2(dir[2], dir[0]);
    // turn the object so the Z axis is facing in that direction
    this.objects[0].rotation.y = -zAngle - Math.PI / 2;
  }
  eval(u, pos, r) {
    let p = u * 2 * Math.PI;
    return [
      pos.x + (r + 0.5) * Math.cos(p),
      pos.y - this.y,
      pos.z + (r + 0.5) * Math.sin(p),
    ];
  }
  tangent(u) {
    let p = u * 2 * Math.PI;
    // unit tangent vector - not the real derivative
    return [Math.sin(p), 0, -Math.cos(p)];
  }
}
