import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 基础设置
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个球体来模拟云层
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);

// 自定义 ShaderMaterial
const cloudShaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0.0 },
    // 添加其他必要的 uniform 变量
  },
  vertexShader: `
       varying vec2 vUv;

       void main() {
         vUv = uv;
         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
       }
     `,
  fragmentShader: `
       uniform float time;
       varying vec2 vUv;

       void main() {
         // 这里写入生成云效果的 GLSL 代码
         // 例如，可以使用柏林噪声 (Perlin noise) 或者单纯形噪声 (Simplex noise) 等
         // 下面的代码仅仅是用一个简单的颜色填充
         gl_FragColor = vec4(vUv, 0.5 + 0.5 * sin(time), 1.0);
       }
     `,
  // 透明度启用，因为云通常是半透明的
  transparent: true,
});

// 创建一个球体网格，使用自定义的材料
const cloudSphere = new THREE.Mesh(sphereGeometry, cloudShaderMaterial);
scene.add(cloudSphere);

// 相机位置
camera.position.z = 15;

// 渲染循环
function animate() {
  requestAnimationFrame(animate);

  // 更新着色器中的时间 uniform
  cloudShaderMaterial.uniforms.time.value += 0.05;

  // 旋转云层以获得更好的视觉效果
  cloudSphere.rotation.y += 0.002;

  renderer.render(scene, camera);
}

animate();