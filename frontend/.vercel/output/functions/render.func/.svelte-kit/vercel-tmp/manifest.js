export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["chess/board/board_blue.svg","chess/board/board_brown.svg","chess/pieces/gioco/bB.svg","chess/pieces/gioco/bK.svg","chess/pieces/gioco/bN.svg","chess/pieces/gioco/bP.svg","chess/pieces/gioco/bQ.svg","chess/pieces/gioco/bR.svg","chess/pieces/gioco/wB.svg","chess/pieces/gioco/wK.svg","chess/pieces/gioco/wN.svg","chess/pieces/gioco/wP.svg","chess/pieces/gioco/wQ.svg","chess/pieces/gioco/wR.svg","chess/pieces/merida/bB.svg","chess/pieces/merida/bK.svg","chess/pieces/merida/bN.svg","chess/pieces/merida/bP.svg","chess/pieces/merida/bQ.svg","chess/pieces/merida/bR.svg","chess/pieces/merida/wB.svg","chess/pieces/merida/wK.svg","chess/pieces/merida/wN.svg","chess/pieces/merida/wP.svg","chess/pieces/merida/wQ.svg","chess/pieces/merida/wR.svg","favicon.png","homepage/goals.png","homepage/path.png","homepage/puzzles.png","profilePic.png"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-87e62be0.js","imports":["_app/immutable/start-87e62be0.js","_app/immutable/chunks/index-1680125d.js","_app/immutable/chunks/singletons-b50b55eb.js"],"stylesheets":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js'),
			() => import('../output/server/nodes/5.js'),
			() => import('../output/server/nodes/6.js'),
			() => import('../output/server/nodes/7.js'),
			() => import('../output/server/nodes/8.js'),
			() => import('../output/server/nodes/9.js'),
			() => import('../output/server/nodes/10.js'),
			() => import('../output/server/nodes/11.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/auth/login",
				pattern: /^\/auth\/login\/?$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/auth/logout",
				pattern: /^\/auth\/logout\/?$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/auth/signup",
				pattern: /^\/auth\/signup\/?$/,
				names: [],
				types: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				names: [],
				types: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/dashboard/goals",
				pattern: /^\/dashboard\/goals\/?$/,
				names: [],
				types: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/dashboard/path",
				pattern: /^\/dashboard\/path\/?$/,
				names: [],
				types: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/dashboard/puzzles",
				pattern: /^\/dashboard\/puzzles\/?$/,
				names: [],
				types: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/dashboard/puzzles/[set]",
				pattern: /^\/dashboard\/puzzles\/([^/]+?)\/?$/,
				names: ["set"],
				types: [null],
				page: { layouts: [0,2], errors: [1,,], leaf: 11 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
