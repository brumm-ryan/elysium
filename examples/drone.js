import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";
import { Color, Loader, MeshStandardMaterial, Vector3 } from "../libs/CS559-Three/build/three.module.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

let droneCount = 0;

export class droneCraft extends GrObject {
    constructor(params = {}) {
    
        let droneBody = new T.BoxBufferGeometry(10, 1, 5);
        let tempMaterial = new T.MeshStandardMaterial({ color: "grey" });
        let headMaterial = new T.MeshBasicMaterial({color : "black"});
        
        let tempMesh = new T.Mesh(droneBody, tempMaterial);
        tempMesh.scale.set(0.5, 0.5, 0.5);
        tempMesh.position.y = 20;
        tempMesh.position.x = 15;
        tempMesh.rotateY(Math.PI / 2);
        
        
        let g = new T.Group();
        g.add(tempMesh);
        
        let rotor1 = new T.TorusGeometry( 10, 3, 16, 100 );
        let rotorMesh1 = new T.Mesh(rotor1, tempMaterial);
        rotorMesh1.scale.set(0.2, 0.2, 0.2);
        rotorMesh1.translateX(5);
        rotorMesh1.translateZ(4.2);
        rotorMesh1.rotateX(Math.PI / 2);
        tempMesh.add(rotorMesh1);
        
        
        let rotor2 = new T.TorusGeometry( 10, 3, 16, 100 );
        let rotorMesh2 = new T.Mesh(rotor2, tempMaterial);
        rotorMesh2.scale.set(0.2, 0.2, 0.2);
        rotorMesh2.translateX(5);
        rotorMesh2.translateZ(-4.2);
        rotorMesh2.rotateX(Math.PI / 2);
        tempMesh.add(rotorMesh2);
        
        let rotor3 = new T.TorusGeometry( 10, 3, 16, 100 );
        let rotorMesh3 = new T.Mesh(rotor3, tempMaterial);
        rotorMesh3.scale.set(0.2, 0.2, 0.2);
        rotorMesh3.translateX(-5);
        rotorMesh3.translateZ(4.2);
        rotorMesh3.rotateX(Math.PI / 2);
        tempMesh.add(rotorMesh3);
        
        let rotor4 = new T.TorusGeometry( 10, 3, 16, 100 );
        let rotorMesh4 = new T.Mesh(rotor4, tempMaterial);
        rotorMesh4.scale.set(0.2, 0.2, 0.2);
        rotorMesh4.translateX(-5);
        rotorMesh4.translateZ(-4.2);
        rotorMesh4.rotateX(Math.PI / 2);
        tempMesh.add(rotorMesh4);
          
        let rotorBladeGeo = new T.BoxBufferGeometry(14, 1, 1);
        let rotorBlade1 = new T.Mesh(rotorBladeGeo, tempMaterial);
        let rotorBlade2 = new T.Mesh(rotorBladeGeo, tempMaterial);
        let rotorBlade3 = new T.Mesh(rotorBladeGeo, tempMaterial);
        let rotorBlade4 = new T.Mesh(rotorBladeGeo, tempMaterial);
        
        rotorMesh1.add(rotorBlade1);
        rotorMesh2.add(rotorBlade2);
        rotorMesh3.add(rotorBlade3);
        rotorMesh4.add(rotorBlade4);
         
        const headGeo = new T.SphereGeometry( 1.5, 32, 16 );
        let head = new T.Mesh(headGeo, headMaterial);
        head.translateX(5.5);
        tempMesh.add(head);
        
    super(`Drone-${++droneCount}`, g);
    this.u = params.u;
    this.rideable = this.objects[0];
  }
  
  stepWorld(delta, timeOfDay) {
    
    //this.objects[0].rotateZ(delta * 0.0013);
    this.objects[0].rotateX(delta * -0.0016);
    this.u += delta;
    if(this.u > Math.PI * 2) {
        this.u = 0;
    }
  }
}