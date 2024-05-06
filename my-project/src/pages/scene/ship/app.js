import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { Water } from "three/examples/jsm/objects/Water2";
// 假设你已经有一个渲染器和场景
const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
const camera = window.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const scene = new THREE.Scene();

const controls = window.controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1; // 相机与目标点的最小距离
controls.maxDistance = 1000; // 相机与目标点的最大距离

// 更新controls，以确保新的距离限制被应用
controls.update();
// renderer
{
    // renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// camera
{
    // 创建透视投影相机

    const savedCameraPosition = {
        x: -350.721065788895,
        y: 26.426085148568067,
        z: -122.87371060762139
    }
    const savedCameraQuaternion = {
        _w: 0.5781503848228043,
        _x: -0.020530228354103303,
        _y: -0.8151581117738229,
        _z: -0.02894641708929318,
    }
    // 设置相机位置
    camera.position.set(savedCameraPosition.x, savedCameraPosition.y, savedCameraPosition.z);

    // 设置相机四元数 // 也就是调整相机的方向
    // camera.quaternion.set(savedCameraQuaternion._x, savedCameraQuaternion._y, savedCameraQuaternion._z, savedCameraQuaternion._w);

    // 设置相机观察的目标
    camera.lookAt(0, 0, 0);

    camera.updateProjectionMatrix();

    // 添加相机到场景
    scene.add(camera);

}

// render loop
{
    // 渲染循环
    function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    render();
}


// resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

//#region ennv
const skyGeo = new THREE.SphereGeometry(1000, 60, 60);
skyGeo.scale(1, 1, -1); // 进入球体内部反转
const texture = new THREE.TextureLoader().load('./assets/sky.jpg')

const skyMtl = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: texture
});
const sky = new THREE.Mesh(skyGeo, skyMtl);
scene.add(sky);
// 设置映射模式为球面映射
texture.mapping = THREE.SphericalReflectionMapping;

// 将纹理设置为场景的背景
scene.background = texture;
scene.environment = texture;

// 视频纹理
const video = document.createElement("video");
video.src = "./assets/sky.mp4";
video.loop = true;

// window.addEventListener("click", (e) => {
//     // 当鼠标移动的时候播放视频
//     //   判断视频是否处于播放状态
//     if (video.paused) {
//         video.play();
//         let texture = new THREE.VideoTexture(video);
//         skyMtl.map = texture;
//         skyMtl.map.needsUpdate = true;
//     }
// });


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-100, 100, 10);
scene.add(light);
const hdrLoader = new RGBELoader();
hdrLoader.loadAsync("./assets/050.hdr").then((texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
});



//#endregion


// start 
document.body.appendChild(renderer.domElement);
//#region START
// CircleBufferGeometry 已经被 CircleGeometry 取代
const waterGeo = new THREE.CircleGeometry(3000, 64);
// const waterMtl = new THREE.MeshBasicMaterial({
//     color: 0xffffff
// });
// const water = new THREE.Mesh(waterGeo, waterMtl);
const water = new Water(waterGeo, {
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0xeeeeff,
    flowDirection: new THREE.Vector2(1, 1),
    scale: 1,
});
water.rotation.x = -Math.PI / 2;
scene.add(water);




//#endregion START

//#region model
const objLoader = new OBJLoader();
// objLoader.load('./assets/13922_Staten_Island_Ferry_V1_l1.obj', (ferry) => {
//     ferry.position.y = 20;
//     ferry.scale.set(0.05, 0.05, 0.05);
//     ferry.rotation.x = -Math.PI /2;
//     scene.add(ferry);
// });

const mtlLoader = new MTLLoader();
mtlLoader.load('./assets/13922_Staten_Island_Ferry_V1_l1.mtl', (materials) => {
    // 将加载的材料传递给OBJ加载器
    objLoader.setMaterials(materials);
    // 继续加载OBJ模型
    objLoader.load('./assets/13922_Staten_Island_Ferry_V1_l1.obj', (ferry) => {
        ferry.position.y = 30;
        ferry.scale.set(0.05, 0.05, 0.05);
        ferry.rotation.x = -Math.PI / 2;
        scene.add(ferry);
        console.log('ferry pos', ferry.position)
        // animate();
    }, undefined, (error) => {
        console.error(error);
    });
}, undefined, (error) => {
    console.error(error);
});
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(50, 50, 50);
scene.add(light2);
const light3 = new THREE.DirectionalLight(0xffffff, 1);
light3.position.set(50, 50, -50);
scene.add(light3);
//#endregion



