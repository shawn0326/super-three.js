import { WebGLRenderTarget } from './WebGLRenderTarget.js';

function WebGLMultisampleRenderTarget( width, height, options ) {

	WebGLRenderTarget.call( this, width, height, options );

	this.samples = 4;

	// @THREE-Modification for share color render buffer
	this.webglColorRenderbuffer = options ? options.webglColorRenderbuffer : null;
	// @THREE-Modification for share depth render buffer
	this.webglDepthRenderbuffer = options ? options.webglDepthRenderbuffer : null;

}

WebGLMultisampleRenderTarget.prototype = Object.assign( Object.create( WebGLRenderTarget.prototype ), {

	constructor: WebGLMultisampleRenderTarget,

	isWebGLMultisampleRenderTarget: true,

	copy: function ( source ) {

		WebGLRenderTarget.prototype.copy.call( this, source );

		this.samples = source.samples;

		// @THREE-Modification for share color render buffer
		this.webglColorRenderbuffer = source.webglColorRenderbuffer;
		// @THREE-Modification for share depth render buffer
		this.webglDepthRenderbuffer = source.webglDepthRenderbuffer;

		return this;

	}

} );


export { WebGLMultisampleRenderTarget };
