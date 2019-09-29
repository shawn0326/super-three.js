/**
 * @author TatumCreative (Greg Tatum) / http://gregtatum.com/
 */

var constants = {

	combine: {

		'THREE.MultiplyOperation': THREE.MultiplyOperation,
		'THREE.MixOperation': THREE.MixOperation,
		'THREE.AddOperation': THREE.AddOperation

	},

	side: {

		'THREE.FrontSide': THREE.FrontSide,
		'THREE.BackSide': THREE.BackSide,
		'THREE.DoubleSide': THREE.DoubleSide

	},

	colors: {

		'THREE.NoColors': THREE.NoColors,
		'THREE.VertexColors': THREE.VertexColors

	},

	blendingMode: {

		'THREE.NoBlending': THREE.NoBlending,
		'THREE.NormalBlending': THREE.NormalBlending,
		'THREE.AdditiveBlending': THREE.AdditiveBlending,
		'THREE.SubtractiveBlending': THREE.SubtractiveBlending,
		'THREE.MultiplyBlending': THREE.MultiplyBlending,
		'THREE.CustomBlending': THREE.CustomBlending

	},

	equations: {

		'THREE.AddEquation': THREE.AddEquation,
		'THREE.SubtractEquation': THREE.SubtractEquation,
		'THREE.ReverseSubtractEquation': THREE.ReverseSubtractEquation

	},

	destinationFactors: {

		'THREE.ZeroFactor': THREE.ZeroFactor,
		'THREE.OneFactor': THREE.OneFactor,
		'THREE.SrcColorFactor': THREE.SrcColorFactor,
		'THREE.OneMinusSrcColorFactor': THREE.OneMinusSrcColorFactor,
		'THREE.SrcAlphaFactor': THREE.SrcAlphaFactor,
		'THREE.OneMinusSrcAlphaFactor': THREE.OneMinusSrcAlphaFactor,
		'THREE.DstAlphaFactor': THREE.DstAlphaFactor,
		'THREE.OneMinusDstAlphaFactor': THREE.OneMinusDstAlphaFactor

	},

	sourceFactors: {

		'THREE.DstColorFactor': THREE.DstColorFactor,
		'THREE.OneMinusDstColorFactor': THREE.OneMinusDstColorFactor,
		'THREE.SrcAlphaSaturateFactor': THREE.SrcAlphaSaturateFactor

	}

};

function getObjectsKeys( obj ) {

	var keys = [];

	for ( var key in obj ) {

		if ( obj.hasOwnProperty( key ) ) {

			keys.push( key );

		}

	}

	return keys;

}

var textureLoader = new THREE.TextureLoader();
var cubeTextureLoader = new THREE.CubeTextureLoader();

var envMaps = ( function () {

	var path = '../../examples/textures/cube/SwedishRoyalCastle/';
	var format = '.jpg';
	var urls = [
		path + 'px' + format, path + 'nx' + format,
		path + 'py' + format, path + 'ny' + format,
		path + 'pz' + format, path + 'nz' + format
	];

	var reflectionCube = cubeTextureLoader.load( urls );
	reflectionCube.format = THREE.RGBFormat;

	var refractionCube = cubeTextureLoader.load( urls );
	refractionCube.mapping = THREE.CubeRefractionMapping;
	refractionCube.format = THREE.RGBFormat;

	return {
		none: null,
		reflection: reflectionCube,
		refraction: refractionCube
	};

} )();

var diffuseMaps = ( function () {

	var bricks = textureLoader.load( '../../examples/textures/brick_diffuse.jpg' );
	bricks.wrapS = THREE.RepeatWrapping;
	bricks.wrapT = THREE.RepeatWrapping;
	bricks.repeat.set( 9, 1 );

	return {
		none: null,
		bricks: bricks
	};

} )();

var roughnessMaps = ( function () {

	var bricks = textureLoader.load( '../../examples/textures/brick_roughness.jpg' );
	bricks.wrapT = THREE.RepeatWrapping;
	bricks.wrapS = THREE.RepeatWrapping;
	bricks.repeat.set( 9, 1 );

	return {
		none: null,
		bricks: bricks
	};

} )();

var matcaps = ( function () {

	return {
		none: null,
		porcelainWhite: textureLoader.load( '../../examples/textures/matcaps/matcap-porcelain-white.jpg' )
	};

} )();

var alphaMaps = ( function () {

	var fibers = textureLoader.load( '../../examples/textures/alphaMap.jpg' );
	fibers.wrapT = THREE.RepeatWrapping;
	fibers.wrapS = THREE.RepeatWrapping;
	fibers.repeat.set( 9, 1 );

	return {
		none: null,
		fibers: fibers
	};

} )();

var gradientMaps = ( function () {

	var threeTone = textureLoader.load( '../../examples/textures/gradientMaps/threeTone.jpg' );
	threeTone.minFilter = THREE.NearestFilter;
	threeTone.magFilter = THREE.NearestFilter;

	var fiveTone = textureLoader.load( '../../examples/textures/gradientMaps/fiveTone.jpg' );
	fiveTone.minFilter = THREE.NearestFilter;
	fiveTone.magFilter = THREE.NearestFilter;

	return {
		none: null,
		threeTone: threeTone,
		fiveTone: fiveTone
	};

} )();

var envMapKeys = getObjectsKeys( envMaps );
var diffuseMapKeys = getObjectsKeys( diffuseMaps );
var roughnessMapKeys = getObjectsKeys( roughnessMaps );
var matcapKeys = getObjectsKeys( matcaps );
var alphaMapKeys = getObjectsKeys( alphaMaps );
var gradientMapKeys = getObjectsKeys( gradientMaps );

function generateVertexColors( geometry ) {

	var positionAttribute = geometry.attributes.position;

	var colors = [];
	var color = new THREE.Color();

	for ( var i = 0, il = positionAttribute.count; i < il; i ++ ) {

		color.setHSL( i / il * Math.random(), 0.5, 0.5 );
		colors.push( color.r, color.g, color.b );

	}

	geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

}

function handleColorChange( color ) {

	return function ( value ) {

		if ( typeof value === 'string' ) {

			value = value.replace( '#', '0x' );

		}

		color.setHex( value );

	};

}

function needsUpdate( material, geometry ) {

	return function () {

		material.vertexColors = parseInt( material.vertexColors ); //Ensure number
		material.side = parseInt( material.side ); //Ensure number
		material.needsUpdate = true;
		geometry.attributes.position.needsUpdate = true;
		geometry.attributes.normal.needsUpdate = true;
		geometry.attributes.color.needsUpdate = true;

	};

}

function updateTexture( material, materialKey, textures ) {

	return function ( key ) {

		material[ materialKey ] = textures[ key ];
		material.needsUpdate = true;

	};

}

function guiScene( gui, scene ) {

	var folder = gui.addFolder( 'Scene' );

	var data = {
		background: '#000000',
		'ambient light': ambientLight.color.getHex()
	};

	var color = new THREE.Color();
	var colorConvert = handleColorChange( color );

	folder.addColor( data, 'background' ).onChange( function ( value ) {

		colorConvert( value );

		renderer.setClearColor( color.getHex() );

	} );

	folder.addColor( data, 'ambient light' ).onChange( handleColorChange( ambientLight.color ) );

	guiSceneFog( folder, scene );

}

function guiSceneFog( folder, scene ) {

	var fogFolder = folder.addFolder( 'scene.fog' );

	var fog = new THREE.Fog( 0x3f7b9d, 0, 60 );

	var data = {
		fog: {
			'THREE.Fog()': false,
			'scene.fog.color': fog.color.getHex()
		}
	};

	fogFolder.add( data.fog, 'THREE.Fog()' ).onChange( function ( useFog ) {

		if ( useFog ) {

			scene.fog = fog;

		} else {

			scene.fog = null;

		}

	} );

	fogFolder.addColor( data.fog, 'scene.fog.color' ).onChange( handleColorChange( fog.color ) );

}

function guiMaterial( gui, mesh, material, geometry ) {

	var folder = gui.addFolder( 'THREE.Material' );

	folder.add( material, 'transparent' );
	folder.add( material, 'opacity', 0, 1 ).step( 0.01 );
	// folder.add( material, 'blending', constants.blendingMode );
	// folder.add( material, 'blendSrc', constants.destinationFactors );
	// folder.add( material, 'blendDst', constants.destinationFactors );
	// folder.add( material, 'blendEquation', constants.equations );
	folder.add( material, 'depthTest' );
	folder.add( material, 'depthWrite' );
	// folder.add( material, 'polygonOffset' );
	// folder.add( material, 'polygonOffsetFactor' );
	// folder.add( material, 'polygonOffsetUnits' );
	folder.add( material, 'alphaTest', 0, 1 ).step( 0.01 ).onChange( needsUpdate( material, geometry ) );
	folder.add( material, 'visible' );
	folder.add( material, 'side', constants.side ).onChange( needsUpdate( material, geometry ) );

}

function guiMeshBasicMaterial( gui, mesh, material, geometry ) {

	var data = {
		color: material.color.getHex(),
		envMaps: envMapKeys[ 0 ],
		map: diffuseMapKeys[ 0 ],
		alphaMap: alphaMapKeys[ 0 ]
	};

	var folder = gui.addFolder( 'THREE.MeshBasicMaterial' );

	folder.addColor( data, 'color' ).onChange( handleColorChange( material.color ) );
	folder.add( material, 'wireframe' );
	folder.add( material, 'wireframeLinewidth', 0, 10 );
	folder.add( material, 'vertexColors', constants.colors ).onChange( needsUpdate( material, geometry ) );
	folder.add( material, 'fog' );

	folder.add( data, 'envMaps', envMapKeys ).onChange( updateTexture( material, 'envMap', envMaps ) );
	folder.add( data, 'map', diffuseMapKeys ).onChange( updateTexture( material, 'map', diffuseMaps ) );
	folder.add( data, 'alphaMap', alphaMapKeys ).onChange( updateTexture( material, 'alphaMap', alphaMaps ) );
	folder.add( material, 'combine', constants.combine );
	folder.add( material, 'reflectivity', 0, 1 );
	folder.add( material, 'refractionRatio', 0, 1 );

}

function guiMeshDepthMaterial( gui, mesh, material, geometry ) {

	var data = {
		alphaMap: alphaMapKeys[ 0 ]
	};

	var folder = gui.addFolder( 'THREE.MeshDepthMaterial' );

	folder.add( material, 'wireframe' );
	folder.add( material, 'wireframeLinewidth', 0, 10 );

	folder.add( data, 'alphaMap', alphaMapKeys ).onChange( updateTexture( material, 'alphaMap', alphaMaps ) );

}

function guiMeshNormalMaterial( gui, mesh, material, geometry ) {

	var folder = gui.addFolder( 'THREE.MeshNormalMaterial' );

	folder.add( material, 'flatShading' ).onChange( needsUpdate( material, geometry ) );
	folder.add( material, 'wireframe' );
	folder.add( material, 'wireframeLinewidth', 0, 10 );

}

function guiLineBasicMaterial( gui, mesh, material, geometry ) {

	var data = {
		color: material.color.getHex()
	};

	var folder = gui.addFolder( 'THREE.LineBasicMaterial' );

	folder.addColor( data, 'color' ).onChange( handleColorChange( material.color ) );
	folder.add( material, 'linewidth', 0, 10 );
	folder.add( material, 'linecap', [ 'butt', 'round', 'square' ] );
	folder.add( material, 'linejoin', [ 'round', 'bevel', 'miter' ] );
	folder.add( material, 'vertexColors', constants.colors ).onChange( needsUpdate( material, geometry ) );
	folder.add( material, 'fog' );

}

function guiMeshLambertMaterial( gui, mesh, material, geometry ) {

	var data = {
		color: material.color.getHex(),
		emissive: material.emissive.getHex(),
		envMaps: envMapKeys[ 0 ],
		map: diffuseMapKeys[ 0 ],
		alphaMap: alphaMapKeys[ 0 ]
	};

	var folder = gui.addFolder( 'THREE.MeshLambertMaterial' );

	folder.addColor( data, 'color' ).onChange( handleColorChange( material.color ) );
	folder.addColor( data, 'emissive' ).onChange( handleColorChange( material.emissive ) );

	folder.add( material, 'wireframe' );
	folder.add( material, 'wireframeLinewidth', 0, 10 );
	folder.add( material, 'vertexColors', constants.colors ).onChange( needsUpdate( material, geometry ) );
	folder.add( material, 'fog' );

	folder.add( data, 'envMaps', envMapKeys ).onChange( updateTexture( material, 'envMap', envMaps ) );
	folder.add( data, 'map', diffuseMapKeys ).onChange( updateTexture( material, 'map', diffuseMaps ) );
	folder.add( data, 'alphaMap', alphaMapKeys ).onChange( updateTexture( material, 'alphaMap', alphaMaps ) );
	folder.add( material, 'combine', constants.combine );
	folder.add( material, 'reflectivity', 0, 1 );
	folder.add( material, 'refractionRatio', 0, 1 );

}

function guiMeshMatcapMaterial( gui, mesh, material ) {

	var data = {
		color: material.color.getHex(),
		matcap: matcapKeys[ 1 ],
		alphaMap: alphaMapKeys[ 0 ]
	};

	var folder = gui.addFolder( 'THREE.MeshMatcapMaterial' );

	folder.addColor( data, 'color' ).onChange( handleColorChange( material.color ) );
	folder.add( data, 'matcap', matcapKeys ).onChange( updateTexture( material, 'matcap', matcaps ) );
	folder.add( data, 'alphaMap', alphaMapKeys ).onChange( updateTexture( material, 'alphaMap', alphaMaps ) );

}

function guiMeshPhongMaterial( gui, mesh, material, geometry ) {

	var data = {
		color: material.color.getHex(),
		emissive: material.emissive.getHex(),
		specular: material.specular.getHex(),
		envMaps: envMapKeys[ 0 ],
		map: diffuseMapKeys[ 0 ],
		alphaMap: alphaMapKeys[ 0 ]
	};

	var folder = gui.addFolder( 'THREE.MeshPhongMaterial' );

	folder.addColor( data, 'color' ).onChange( handleColorChange( material.color ) );
	folder.addColor( data, 'emissive' ).onChange( handleColorChange( material.emissive ) );
	folder.addColor( data, 'specular' ).onChange( handleColorChange( material.specular ) );

	folder.add( material, 'shininess', 0, 100 );
	folder.add( material, 'flatShading' ).onChange( needsUpdate( material, geometry ) );
	folder.add( material, 'wireframe' );
	folder.add( material, 'wireframeLinewidth', 0, 10 );
	folder.add( material, 'vertexColors', constants.colors ).onChange( needsUpdate( material, geometry ) );
	folder.add( material, 'fog' );
	folder.add( data, 'envMaps', envMapKeys ).onChange( updateTexture( material, 'envMap', envMaps ) );
	folder.add( data, 'map', diffuseMapKeys ).onChange( updateTexture( material, 'map', diffuseMaps ) );
	folder.add( data, 'alphaMap', alphaMapKeys ).onChange( updateTexture( material, 'alphaMap', alphaMaps ) );

}

function guiMeshToonMaterial( gui, mesh, material ) {

	var data = {
		color: material.color.getHex(),
		map: diffuseMapKeys[ 0 ],
		gradientMap: gradientMapKeys[ 1 ],
		alphaMap: alphaMapKeys[ 0 ]
	};

	var folder = gui.addFolder( 'THREE.MeshToonMaterial' );

	folder.addColor( data, 'color' ).onChange( handleColorChange( material.color ) );

	folder.add( data, 'map', diffuseMapKeys ).onChange( updateTexture( material, 'map', diffuseMaps ) );
	folder.add( data, 'gradientMap', gradientMapKeys ).onChange( updateTexture( material, 'gradientMap', gradientMaps ) );
	folder.add( data, 'alphaMap', alphaMapKeys ).onChange( updateTexture( material, 'alphaMap', alphaMaps ) );

}

function guiMeshStandardMaterial( gui, mesh, material, geometry ) {

	var data = {
		color: material.color.getHex(),
		emissive: material.emissive.getHex(),
		envMaps: envMapKeys[ 0 ],
		map: diffuseMapKeys[ 0 ],
		roughnessMap: roughnessMapKeys[ 0 ],
		alphaMap: alphaMapKeys[ 0 ]
	};

	var folder = gui.addFolder( 'THREE.MeshStandardMaterial' );

	folder.addColor( data, 'color' ).onChange( handleColorChange( material.color ) );
	folder.addColor( data, 'emissive' ).onChange( handleColorChange( material.emissive ) );

	folder.add( material, 'roughness', 0, 1 );
	folder.add( material, 'metalness', 0, 1 );
	folder.add( material, 'flatShading' ).onChange( needsUpdate( material, geometry ) );
	folder.add( material, 'wireframe' );
	folder.add( material, 'wireframeLinewidth', 0, 10 );
	folder.add( material, 'vertexColors', constants.colors ).onChange( needsUpdate( material, geometry ) );
	folder.add( material, 'fog' );
	folder.add( data, 'envMaps', envMapKeys ).onChange( updateTexture( material, 'envMap', envMaps ) );
	folder.add( data, 'map', diffuseMapKeys ).onChange( updateTexture( material, 'map', diffuseMaps ) );
	folder.add( data, 'roughnessMap', roughnessMapKeys ).onChange( updateTexture( material, 'roughnessMap', roughnessMaps ) );
	folder.add( data, 'alphaMap', alphaMapKeys ).onChange( updateTexture( material, 'alphaMap', alphaMaps ) );

	// TODO metalnessMap

}

function guiMeshPhysicalMaterial( gui, mesh, material, geometry ) {

	var data = {
		color: material.color.getHex(),
		emissive: material.emissive.getHex(),
		envMaps: envMapKeys[ 0 ],
		map: diffuseMapKeys[ 0 ],
		roughnessMap: roughnessMapKeys[ 0 ],
		alphaMap: alphaMapKeys[ 0 ]
	};

	var folder = gui.addFolder( 'THREE.MeshPhysicalMaterial' );

	folder.addColor( data, 'color' ).onChange( handleColorChange( material.color ) );
	folder.addColor( data, 'emissive' ).onChange( handleColorChange( material.emissive ) );

	folder.add( material, 'roughness', 0, 1 );
	folder.add( material, 'metalness', 0, 1 );
	folder.add( material, 'reflectivity', 0, 1 );
	folder.add( material, 'clearCoat', 0, 1 ).step( 0.01 );
	folder.add( material, 'clearCoatRoughness', 0, 1 ).step( 0.01 );
	folder.add( material, 'flatShading' ).onChange( needsUpdate( material, geometry ) );
	folder.add( material, 'wireframe' );
	folder.add( material, 'wireframeLinewidth', 0, 10 );
	folder.add( material, 'vertexColors', constants.colors ).onChange( needsUpdate( material, geometry ) );
	folder.add( material, 'fog' );
	folder.add( data, 'envMaps', envMapKeys ).onChange( updateTexture( material, 'envMap', envMaps ) );
	folder.add( data, 'map', diffuseMapKeys ).onChange( updateTexture( material, 'map', diffuseMaps ) );
	folder.add( data, 'roughnessMap', roughnessMapKeys ).onChange( updateTexture( material, 'roughnessMap', roughnessMaps ) );
	folder.add( data, 'alphaMap', alphaMapKeys ).onChange( updateTexture( material, 'alphaMap', alphaMaps ) );

	// TODO metalnessMap

}

function chooseFromHash( gui, mesh, geometry ) {

	var selectedMaterial = window.location.hash.substring( 1 ) || 'MeshBasicMaterial';
	var material;

	switch ( selectedMaterial ) {

		case 'MeshBasicMaterial' :

			material = new THREE.MeshBasicMaterial( { color: 0x2194CE } );
			guiMaterial( gui, mesh, material, geometry );
			guiMeshBasicMaterial( gui, mesh, material, geometry );

			return material;

			break;

		case 'MeshLambertMaterial' :

			material = new THREE.MeshLambertMaterial( { color: 0x2194CE } );
			guiMaterial( gui, mesh, material, geometry );
			guiMeshLambertMaterial( gui, mesh, material, geometry );

			return material;

			break;

		case 'MeshMatcapMaterial' :

			material = new THREE.MeshMatcapMaterial( { matcap: matcaps.porcelainWhite } );
			guiMaterial( gui, mesh, material, geometry );
			guiMeshMatcapMaterial( gui, mesh, material, geometry );

			return material;

			break;

		case 'MeshPhongMaterial' :

			material = new THREE.MeshPhongMaterial( { color: 0x2194CE } );
			guiMaterial( gui, mesh, material, geometry );
			guiMeshPhongMaterial( gui, mesh, material, geometry );

			return material;

			break;

		case 'MeshToonMaterial' :

			material = new THREE.MeshToonMaterial( { color: 0x2194CE, gradientMap: gradientMaps.threeTone } );
			guiMaterial( gui, mesh, material, geometry );
			guiMeshToonMaterial( gui, mesh, material, geometry );

			// only use a single point light

			lights[ 0 ].visible = false;
			lights[ 2 ].visible = false;

			return material;

			break;

		case 'MeshStandardMaterial' :

			material = new THREE.MeshStandardMaterial( { color: 0x2194CE } );
			guiMaterial( gui, mesh, material, geometry );
			guiMeshStandardMaterial( gui, mesh, material, geometry );

			return material;

			break;

		case 'MeshPhysicalMaterial' :

			material = new THREE.MeshPhysicalMaterial( { color: 0x2194CE } );
			guiMaterial( gui, mesh, material, geometry );
			guiMeshPhysicalMaterial( gui, mesh, material, geometry );

			return material;

			break;

		case 'MeshDepthMaterial' :

			material = new THREE.MeshDepthMaterial();
			guiMaterial( gui, mesh, material, geometry );
			guiMeshDepthMaterial( gui, mesh, material, geometry );

			return material;

			break;

		case 'MeshNormalMaterial' :

			material = new THREE.MeshNormalMaterial();
			guiMaterial( gui, mesh, material, geometry );
			guiMeshNormalMaterial( gui, mesh, material, geometry );

			return material;

			break;

		case 'LineBasicMaterial' :

			material = new THREE.LineBasicMaterial( { color: 0x2194CE } );
			guiMaterial( gui, mesh, material, geometry );
			guiLineBasicMaterial( gui, mesh, material, geometry );

			return material;

			break;

	}

}
