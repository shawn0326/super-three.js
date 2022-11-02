import { ImageLoader } from './ImageLoader.js';
import { Texture } from '../textures/Texture.js';
import { Loader } from './Loader.js';

function TextureLoader( manager ) {

	Loader.call( this, manager );

}

TextureLoader.prototype = Object.assign( Object.create( Loader.prototype ), {

	constructor: TextureLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		const texture = new Texture();

		const loader = new ImageLoader( this.manager );
		loader.setCrossOrigin( this.crossOrigin );
		loader.setPath( this.path );

		loader.load( url, function ( image ) {

			// @THREE-Modification use RGBAFormat by default.
			texture.image = image;
			texture.needsUpdate = true;

			if ( onLoad !== undefined ) {

				onLoad( texture );

			}

		}, onProgress, onError );

		return texture;

	}

} );


export { TextureLoader };
