three.js
========

[![NPM Package][npm]][npm-url]
[![Build Size][build-size]][build-size-url]
[![NPM Downloads][npm-downloads]][npmtrends-url]
[![Dev Dependencies][dev-dependencies]][dev-dependencies-url]
[![Language Grade][lgtm]][lgtm-url]

#### JavaScript 3D library ####

The aim of the project is to create an easy to use, lightweight, 3D library with a default WebGL renderer. The library also provides Canvas 2D, SVG and CSS3D renderers in the examples.

[Examples](http://threejs.org/examples/) &mdash;
[Documentation](http://threejs.org/docs/) &mdash;
[Wiki](https://github.com/mrdoob/three.js/wiki) &mdash;
[Migrating](https://github.com/mrdoob/three.js/wiki/Migration-Guide) &mdash;
[Questions](http://stackoverflow.com/questions/tagged/three.js) &mdash;
[Forum](https://discourse.threejs.org/) &mdash;
[Slack](https://join.slack.com/t/threejs/shared_invite/enQtMzYxMzczODM2OTgxLTQ1YmY4YTQxOTFjNDAzYmQ4NjU2YzRhNzliY2RiNDEyYjU2MjhhODgyYWQ5Y2MyZTU3MWNkOGVmOGRhOTQzYTk) &mdash;
[Discord](https://discordapp.com/invite/HF4UdyF)

### Usage ###

This code creates a scene, a camera, and a geometric cube, and it adds the cube to the scene. It then creates a `WebGL` renderer for the scene and camera, and it adds that viewport to the `document.body` element. Finally, it animates the cube within the scene for the camera.

```javascript
import * as THREE from './js/three.module.js';

var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

}
```

If everything went well, you should see [this](https://jsfiddle.net/8kubjpL5/).

### Cloning this repository ###

Cloning the repo with all its history results in a ~2GB download. If you don't need the whole history you can use the `depth` parameter to significantly reduce download size.

```sh
git clone --depth=1 https://github.com/mrdoob/three.js.git
```

### Change log ###

[Releases](https://github.com/mrdoob/three.js/releases)


[npm]: https://img.shields.io/npm/v/three
[npm-url]: https://www.npmjs.com/package/three
[build-size]: https://badgen.net/bundlephobia/minzip/three
[build-size-url]: https://bundlephobia.com/result?p=three
[npm-downloads]: https://img.shields.io/npm/dw/three
[npmtrends-url]: https://www.npmtrends.com/three
[dev-dependencies]: https://img.shields.io/david/dev/mrdoob/three.js
[dev-dependencies-url]: https://david-dm.org/mrdoob/three.js#info=devDependencies
[lgtm]: https://img.shields.io/lgtm/alerts/github/mrdoob/three.js
[lgtm-url]: https://lgtm.com/projects/g/mrdoob/three.js/

### Modification ###

Now merged three.js r120.
All modifications are marked by `// @THREE-Modification`.

* RenderList sort: Prevent unstable sequencing.
* ~~WebGLTextures: Support NPOT texture in WebGL2.~~(implemented in r101)
* ~~WebGLTextures: getInternalFormat support depth texture in WebGL2.~~(implemented in r115)
* ~~WebGLTextures: Support RenderTarget.multipleSampling & WebGLRenderer.blitRenderTarget() (for MSAA etc) in WebGL2.~~(implemented in r101)
* WebGLRenderer: Skeleton percision fix.
* WebGLRenderer: GPU picker support. (Remove this later)
* WebGLMaterials: Separat UVTransform for alphaMap.
* WebGLMaterials: Separat UVTransform for emissiveMap.
* WebGLRenderer: Add **MaterialManager** to switch material on runtime.
* WebGLBackground: Support color transform for background cube texture.
* alphatest_fragment: Prevent alpha test edge gradient.
* Material: Support color mapping.
* Material: Support Cartesian3 position. defines['USE_CARTESIAN3'].
* UniformsUtils: Clone uniforms will not clone texture.
* MeshStandardMaterial: Add `.baseQuaternion` to support env map rotation. (remove this later)
* Scene: Add `.envQuaternion` to support global env map rotation.
* Object3D: Dispatch 'addedChild' event when add child.
* Fog: Support fog alpha. please use fog.alpha.
* ~~InterleavedBufferAttribute: Override clone.~~(implemented in r117)
* ~~Mesh: Raycast method support TriangleStripDrawMode.~~(Mesh.drawMode has been moved in r112)
* Mesh: Raycast method fix for group count infinity.
* WebGLTextures: Support share webglDepthRenderbuffer.
* WebGLTextures: Support share webglColorRenderbuffer. (for only WebGLMultisampleRenderTarget now)
* WebGLTextures: Support input gl texture.
* WebGLRenderer: Support render list dirty.
* Sprite: If raycaster's camera not be set, skip raycast.
* MeshStandardMaterial: Fix defineds copy.
* color_vertex about: Support alpha attribtue. defines['USE_ALPHAINDEX'].
* WebGLAttributes: Support attribute resize.
* WebGLRenderer: Support logarithmicDepthBuffer state change.
* WebGLRenderLists: Support custom1 layer.
* WebGLProgram: Support instanced material.
* FileLoader: Handle status 201. (Remove this later)
* WebGLPrograms: Support renderer.gammaInput & renderer.outputEncoding will override renderTarget linearEncoding.
* WebGLRenderer: Add polyfill for state.enableAttribute.
* Object3D: Add Matrtix dirty.
* ~~WebGLBindingStates: Fix index cache for VAO.~~(Fixed in r120)
* WebGLState: Support separate stencil settings.
* WebGLState: Fix reset().
* Move SpriteMaterial.rotation to Sprite.spriteRotation. (SpriteMaterial.rotation still work)
* VR Camera apply camera transform.
* Add Material.uvTransform to replace texture.matrix.
* Add Material.useEnvironment decide whether to use scene.environment.
* WebGLTextures: Fix empty cube texture binding.
* MeshStandardMaterial: Add specularFactor, default is 1.
* MeshBasicMaterial: Add emissive support.
* InstancedMesh: Add dispose(). (will be implemented in r124)
* MeshStandardMaterial: Add fresnelPower and fresnelInverse.
* Geometry.fromBufferGeometry: fix for drawRange.
* Material: Support highlightColor and highlightIntensity.
* PointsMaterial: Support material.imageRatio.
* Remove some frequently executed `Object.defineProperty`
* Object3D: Fix getWorldXXX().
* Mesh: Fix recursive for copy method.

### 开发规范 ###

* 只添加必要的修改，非必要的修改可以通过扩展实现。
* 必须是能够独立运行的修改，不依赖任何外部库。
* 修改的代码前用`// @THREE-Modification`标注，以便于全局搜索。
* 如果有新扩展的功能或者新修改的BUG，请在本文件的`Modification`部分增加修改说明。
* 修改遵照threejs本身的编程规范，发布前请运行`npm run lint`检查。