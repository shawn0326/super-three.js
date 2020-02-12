/**
 * @author mrdoob / http://mrdoob.com/
 */

function painterSortStable( a, b ) {

	if ( a.groupOrder !== b.groupOrder ) {

		return a.groupOrder - b.groupOrder;

	} else if ( a.renderOrder !== b.renderOrder ) {

		return a.renderOrder - b.renderOrder;

	} else if ( a.program !== b.program ) {

		return a.program.id - b.program.id;

	} else if ( a.material.id !== b.material.id ) {

		return a.material.id - b.material.id;

	} else if ( a.z !== b.z ) {

		return a.z - b.z;

	} else {

		return a.id - b.id;

	}

}

function reversePainterSortStable( a, b ) {

	if ( a.groupOrder !== b.groupOrder ) {

		return a.groupOrder - b.groupOrder;

	} else if ( a.renderOrder !== b.renderOrder ) {

		return a.renderOrder - b.renderOrder;

	} else if ( a.z !== b.z ) {

		return b.z - a.z;

	} else if ( a.material.id !== b.material.id ) {

		// @THREE-Modification
		// Prevent unstable sequencing.
		return a.material.id - b.material.id;

	} else {

		return a.id - b.id;

	}

}


function WebGLRenderList() {

	var renderItems = [];
	var renderItemsIndex = 0;

	var custom1 = []; // @THREE-Modification
	var opaque = [];
	var transparent = [];

	var defaultProgram = { id: - 1 };

	function init() {

		renderItemsIndex = 0;

		custom1.length = 0; // @THREE-Modification
		opaque.length = 0;
		transparent.length = 0;

	}

	function getNextRenderItem( object, geometry, material, groupOrder, z, group ) {

		var renderItem = renderItems[ renderItemsIndex ];

		if ( renderItem === undefined ) {

			renderItem = {
				id: object.id,
				object: object,
				geometry: geometry,
				material: material,
				program: material.program || defaultProgram,
				groupOrder: groupOrder,
				renderOrder: object.renderOrder,
				z: z,
				group: group
			};

			renderItems[ renderItemsIndex ] = renderItem;

		} else {

			renderItem.id = object.id;
			renderItem.object = object;
			renderItem.geometry = geometry;
			renderItem.material = material;
			renderItem.program = material.program || defaultProgram;
			renderItem.groupOrder = groupOrder;
			renderItem.renderOrder = object.renderOrder;
			renderItem.z = z;
			renderItem.group = group;

		}

		renderItemsIndex ++;

		return renderItem;

	}

	function push( object, geometry, material, groupOrder, z, group ) {

		var renderItem = getNextRenderItem( object, geometry, material, groupOrder, z, group );

		// @THREE-Modification
		if ( object.renderLayer === 1 ) {

			custom1.push( renderItem );

		} else {

			( material.transparent === true ? transparent : opaque ).push( renderItem );

		}

	}

	function unshift( object, geometry, material, groupOrder, z, group ) {

		var renderItem = getNextRenderItem( object, geometry, material, groupOrder, z, group );

		// @THREE-Modification
		if ( object.renderLayer === 1 ) {

			custom1.unshift( renderItem );

		} else {

			( material.transparent === true ? transparent : opaque ).unshift( renderItem );

		}

	}

	function sort() {

		if ( custom1.length > 1 ) custom1.sort( painterSortStable ); // @THREE-Modification
		if ( opaque.length > 1 ) opaque.sort( painterSortStable );
		if ( transparent.length > 1 ) transparent.sort( reversePainterSortStable );

	}

	return {
		custom1: custom1, // @THREE-Modification
		opaque: opaque,
		transparent: transparent,

		init: init,
		push: push,
		unshift: unshift,

		sort: sort
	};

}

function WebGLRenderLists() {

	var lists = new WeakMap();

	function onSceneDispose( event ) {

		var scene = event.target;

		scene.removeEventListener( 'dispose', onSceneDispose );

		lists.delete( scene );

	}

	function get( scene, camera ) {

		var cameras = lists.get( scene );
		var list;
		if ( cameras === undefined ) {

			list = new WebGLRenderList();
			lists.set( scene, new WeakMap() );
			lists.get( scene ).set( camera, list );

			scene.addEventListener( 'dispose', onSceneDispose );

		} else {

			list = cameras.get( camera );
			if ( list === undefined ) {

				list = new WebGLRenderList();
				cameras.set( camera, list );

			}

		}

		return list;

	}

	function dispose() {

		lists = new WeakMap();

	}

	return {
		get: get,
		dispose: dispose
	};

}


export { WebGLRenderLists };
