/*jshint esversion: 6 */
// @ts-check

/*
 * Graphics Town Example Objects
 *
 * Houses: adapted from the original C++ Graphics Town
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Geom from "../libs/CS559-Three/examples/jsm/deprecated/Geometry.js";
import { Object3D } from "../libs/CS559-Three/build/three.module.js";

let RectHouseCount = 0;
let SqrHosueCount = 0;
let TreeCount = 0;

function uvTri(u1, v1, u2, v2, u3, v3) {
  return [new T.Vector2(u1, v1), new T.Vector2(u2, v2), new T.Vector2(u3, v3)];
}

export class SqrHouse extends GrObject {
  constructor(params = {}) {
      let geometry = new T.BufferGeometry();
      const vertices = new Float32Array( [
          //front left
          -1,1,1,
          -1,-1,1,
          1,-1,1,
          //front right
          1,-1,1,
          1,1,1,
          -1,1,1,
          //left side left
          -1,1,-1,
          -1,-1,-1,
          -1,-1,1,
          //left side right
          -1,-1,1,
          -1,1,1,
          -1,1,-1,
          //right side left
          1,1,1,
          1,-1,1,
          1,-1,-1,
          //right side right
          1,-1,-1,
          1,1,-1,
          1,1,1,
          //top left
          -1,1,-1,
          -1,1,1,
          1,1,1,
          //top right
          1,1,1,
          1,1,-1,
          -1,1,-1,
          //back left
          1,1,-1,
          1,-1,-1,
          -1,-1,-1,
          //back right
          -1,-1,-1,
          -1,1,-1,
          1,1,-1,
          //bottom left
          -1,-1,1,
          -1,-1,-1,
          1,-1,-1,
          //bottom right
          1,-1,-1,
          1,-1,1,
          -1,-1,1,
          // roof front
          -1,1,1,
          1,1,1,
          0,2,0,
          // roof left
          -1,1,-1,
          -1,1,1,
          0,2,0,
          // roof back
          1,1,-1,
          -1,1,-1,
          0,2,0,
          // roof right
          1,1,1,
          1,1,-1,
          0,2,0,


       ]);
      
      geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
      geometry.computeVertexNormals();

      const uvs = new Float32Array( [
         //front left
         1,1,
         1,0,
         0,0,

         0,0,
         0,1,
         1,1,
         //front right
         //left side left
         0.5,0,
         0.5, 1,
         1, 1,
         //left side right
         1,1,
         1, 0,
         0.5,0,
         //right side left
         0.5,0,
         0.5, 1,
         1, 1,
         //right side right
         1,1,
         1, 0,
         0.5,0,
         //top left
         0,0,
         0, 1/3,
         1/3, 1/3,
         //top right
         1/3,1/3,
         1/3, 0,
         0,0,
         //back left
         0.5,0,
         0.5, 1,
         1, 1,
         //back right
         1,1,
         1, 0,
         0.5,0,
         //bottom left
         0,0,
         0, 1/3,
         1/3, 1/3,
         //bottom right
         1/3,1/3,
         1/3, 0,
         0,0,
         // roof front
         0,0,
         0, 1/3,
         1/3, 1/3,
         // roof left
         0,0,
         0, 1/3,
         1/3, 1/3,
         // roof back
         0,0,
         0, 1/3,
         1/3, 1/3,
         // roof right
         0,0,
         0, 1/3,
         1/3, 1/3,


        ]);
      
      geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));

      let tl = new T.TextureLoader().load("../for_students/images/wooden_door_texture.jpg");

      let material = new T.MeshStandardMaterial({
          color: "white",
          roughness: 0.55,
          metalness: 0.1,
          map:tl
        });
  
        let mesh = new T.Mesh(geometry, material);
        mesh.translateX(params.x || 0);
        mesh.translateY(params.y || 0);
        mesh.translateZ(params.z || 0);
        mesh.rotateX(params.rotx || 0);
      super(`SqrHouse-${++SqrHosueCount}`, mesh);
  }
}

export class RectHouse extends GrObject {
  constructor(params = {}) {
      let geometry = new T.BufferGeometry();
      const vertices = new Float32Array( [
          //front left
          -1,1,1,
          -1,-1,1,
          1,-1,1,
          //front right
          1,-1,1,
          1,1,1,
          -1,1,1,

          //front left 2
          1,1,1,
          1,-1,1,
          3,-1,1,
          //front right 2
          3,-1,1,
          3,1,1,
          1,1,1,

          //left side left
          -1,1,-1,
          -1,-1,-1,
          -1,-1,1,
          //left side right
          -1,-1,1,
          -1,1,1,
          -1,1,-1,

          //left side left 2
          1,1,-1,
          1,-1,-1,
          1,-1,1,
          //left side right 2
          1,-1,1,
          1,1,1,
          1,1,-1,


          //right side left
          1,1,1,
          1,-1,1,
          1,-1,-1,
          //right side right
          1,-1,-1,
          1,1,-1,
          1,1,1,

          //right side left 2
          3,1,1,
          3,-1,1,
          3,-1,-1,
          //right side right 2
          3,-1,-1,
          3,1,-1,
          3,1,1,

          //top left
          -1,1,-1,
          -1,1,1,
          1,1,1,
          //top right
          1,1,1,
          1,1,-1,
          -1,1,-1,

          //top left 2
          1,1,-1,
          1,1,1,
          3,1,1,
          //top right 2
          3,1,1,
          3,1,-1,
          1,1,-1,

          //back left
          1,1,-1,
          1,-1,-1,
          -1,-1,-1,
          //back right
          -1,-1,-1,
          -1,1,-1,
          1,1,-1,

          //back left 2
          3,1,-1,
          3,-1,-1,
          1,-1,-1,
          //back right 2
          1,-1,-1,
          1,1,-1,
          3,1,-1,

          //bottom left
          -1,-1,1,
          -1,-1,-1,
          1,-1,-1,
          //bottom right
          1,-1,-1,
          1,-1,1,
          -1,-1,1,

          //bottom left 2
          1,-1,1,
          1,-1,-1,
          3,-1,-1,
          //bottom right 2
          3,-1,-1,
          3,-1,1,
          1,-1,1,

          //front roof left
          -1,1,1,
          1,1,1,
          -1,2,0,
          //front roof right
          1,1,1,
          1,2,0,
          -1,2,0,

          //front roof left 2
          1,1,1,
          3,1,1,
          1,2,0,
          //front roof right 2
          3,1,1,
          3,2,0,
          1,2,0,

          //back roof left
          3,1,-1,
          -1,1,-1,
          3,2,0,
          //back roof right
          -1,1,-1,
          -1,2,0,
          3,2,0,

          //left roof end
          -1,1,-1,
          -1,1,1,
          -1,2,0,

          //right roof end
          3,1,1,
          3,1,-1,
          3,2,0


       ]);
      
      geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
      geometry.computeVertexNormals();

      const uvs = new Float32Array( [
           //front left
           0.5,1,
           0.5,0,
           0,0,
          //front right
           0,0,
          0,1,
          0.5,1,
           //front left 2
           1,1,
           1,0,
           0.5,0,
           //front right 2
           0.5,0,
           0.5,1,
           1,1,
           

           //left side left
           1,1,
           1,0,
           0.5,0,
           //left side right
           0.5,0,
           0.5,1,
           1,1,

           //left side left 2
           1,1,
           1,0,
           0.5,0,
           //left side right 2
           0.5,0,
           0.5,1,
           1,1,


           //right side left
           1,1,
           1,0,
           0.5,0,
           //right side right
           0.5,0,
           0.5,1,
           1,1,

           //right side left 2
           1,1,
           1,0,
           0.5,0,
           //right side right 2
           0.5,0,
           0.5,1,
           1,1,

           //top left
           1,1,
           1,0,
           0.5,0,
           //top right
           0.5,0,
           0.5,1,
           1,1,

           //top left 2
           1,1,
           1,0,
           0.5,0,
           //top right 2
           0.5,0,
           0.5,1,
           1,1,

           //back left
           0.5,0,
           0.5,1,
           1,1,
           //back right
           1,1,
           1,0,
           0.5,0,

           //back left 2
           1,1,
           1,0,
           0.5,0,
           //back right 2
           0.5,0,
           0.5,1,
           1,1,

           //bottom left
           -1,-1,
           -1,-1,
           1,-1,
           //bottom right
           1,-1,
           1,-1,
           -1,-1,

           //bottom left 2
           1,-1,
           1,-1,
           3,-1,
           //bottom right 2
           3,-1,
           3,-1,
           1,-1,

           //front roof left
           3,1,
           -1,1,
           3,2,
           //front roof right
           -1,1,
           -1,2,
           3,2,

           //front roof left 2
           3,1,
           -1,1,
           3,2,
           //front roof right 2
           -1,1,
           -1,2,
           3,2,
           //back roof left
           3,1,
           -1,1,
           3,2,
           //back roof right
           -1,1,
           -1,2,
           3,2,

           //left roof end
           -1,1,
           -1,1,
           -1,2,

           //right roof end
           3,1,
           3,1,
           3,2,



         ]);
       
       geometry.setAttribute('uv',new T.BufferAttribute(uvs,2));

       let tl = new T.TextureLoader().load("../for_students/images/wooden_door_texture.jpg");

      let material = new T.MeshStandardMaterial({
          color: "white",
          roughness: 0.55,
          metalness: 0.1,
          map:tl
        });
  
        let mesh = new T.Mesh(geometry, material);
        mesh.translateX(params.x || 0);
        mesh.translateY(params.y || 0);
        mesh.translateZ(params.z || 0);
      super(`RectHouse-${++RectHouseCount}`, mesh);
  }
}

export class GrTree extends GrObject {
  
  constructor(params = {}) {
    let tree = new T.Group();

    let stemMaterial = new T.MeshLambertMaterial( { color: 0x7D5A4F } );
    let leaveLightMaterial = new T.MeshLambertMaterial( { color: 0xA2FF7A } );

    let leafGeo = new T.BoxBufferGeometry(1,1,1);
    let stemGeo = new T.BoxBufferGeometry(0.5,4,0.5);

    let stem = new T.Mesh(stemGeo, stemMaterial);
    let leaf1 = new T.Mesh(leafGeo, leaveLightMaterial);
    let leaf2 = new T.Mesh(leafGeo, leaveLightMaterial);
    let leaf3 = new T.Mesh(leafGeo, leaveLightMaterial);
    let leaf4 = new T.Mesh(leafGeo, leaveLightMaterial);

    tree.add(stem);
    tree.add(leaf1);
    leaf1.translateY(4);
    leaf1.scale.set(1, 4, 1);
    tree.add(leaf2);
    leaf2.translateY(5);
    leaf2.translateX(1);
    tree.add(leaf3);
    leaf3.translateY(5);
    leaf3.translateZ(1);
    tree.add(leaf4);
    leaf4.translateY(6);
    leaf4.translateX(-1);
    leaf4.translateZ(-0.5);
    tree.translateX(params.x || 0);
    tree.translateY(params.y || 0);
    tree.translateZ(params.z || 0);
    tree.lookAt(1,1,1);
    super(`Tree-${TreeCount}`,tree);
  }
}
