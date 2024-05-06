// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建几何体（立方体）
const geometry = new THREE.BoxGeometry();

// 获取着色器代码
const vertexShader = document.getElementById('vertexShader').textContent;
const fragmentShader = document.getElementById('fragmentShader').textContent;

// 创建着色器材质
const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        time: { value: 0.0 },
    }
});

// 创建网格
const cube = new THREE.Mesh(geometry, shaderMaterial);
scene.add(cube);

// 动画循环
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    // 更新着色器的时间 uniform
    shaderMaterial.uniforms.time.value = clock.getElapsedTime();

    renderer.render(scene, camera);
}

animate();