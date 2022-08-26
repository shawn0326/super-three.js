import { Material } from './Material.js';
import { Color } from '../math/Color.js';

/**
 * parameters = {
 *  color: <hex>,
 *  map: new THREE.Texture( <Image> ),
 *  alphaMap: new THREE.Texture( <Image> ),
 *  rotation: <float>,
 *  sizeAttenuation: <bool>
 * }
 */

function SpriteMaterial( parameters ) {

	Material.call( this );

	this.type = 'SpriteMaterial';

	this.color = new Color( 0xffffff );

	this.map = null;

	this.alphaMap = null;

	this.rotation = 0;

	this.sizeAttenuation = true;

	this.transparent = true;

	this.highlightColor = new Color( 0x000000 ); // @THREE-Modification highlight color
	this.highlightIntensity = 0; // @THREE-Modification highlight color

	this.setValues( parameters );

}

SpriteMaterial.prototype = Object.create( Material.prototype );
SpriteMaterial.prototype.constructor = SpriteMaterial;
SpriteMaterial.prototype.isSpriteMaterial = true;

SpriteMaterial.prototype.copy = function ( source ) {

	Material.prototype.copy.call( this, source );

	this.color.copy( source.color );

	this.map = source.map;

	this.alphaMap = source.alphaMap;

	this.rotation = source.rotation;

	this.sizeAttenuation = source.sizeAttenuation;

	this.highlightColor.copy( source.highlightColor ); // @THREE-Modification highlight color
	this.highlightIntensity = source.highlightIntensity; // @THREE-Modification highlight color

	return this;

};


export { SpriteMaterial };
