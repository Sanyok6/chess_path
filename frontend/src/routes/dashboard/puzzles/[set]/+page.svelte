<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchApi, fetchUserData } from '$lib/api';
	import { page } from '$app/stores';
    import { userStore, type PuzzleSetWithPuzzles, type User } from '$lib/store';
	import { Chessground, cgStylesHelper, type Api } from 'svelte-use-chessground';
	import 'svelte-use-chessground/cgstyles/chessground.css';

	let userData: User | null = null;
	let currentSet: PuzzleSetWithPuzzles | null = null; 

	let createModalOpen = false
	let setSettingsModalOpen = false
	let boardSettingsModalOpen = false

	let messages: string[] = []
	let newFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
	let newPGN = "1. e4 e5 (1... c5 2. Nf3 (2. Nc3 d6) 2... d6 3. d4 (3. Bb5+ Bd7)) 2. Nf3 Nc6"

	let fen = ""
	let moves: any[] = []

	let board_size = 800
	let board_color = "blue"
	let piece_set = "merida"
	let orientation: "white" | "black" = "white"

	onMount(() => {
		board_size = JSON.parse(localStorage.getItem("boardOptions") || "{}").board_size || board_size
		board_color = JSON.parse(localStorage.getItem("boardOptions") || "{}").board_color || board_color
		piece_set = JSON.parse(localStorage.getItem("boardOptions") || "{}").piece_set || piece_set
	})

	const saveBoardSettings = () => {
		localStorage.setItem(
			"boardOptions", 
			JSON.stringify({board_size: board_size, board_color: board_color, piece_set: piece_set})
		)
	}

	let config = {
		movable:{
			free:false,
			dests: new Map(),
			events: {after: (f, t, m) => {}}
		},
		fen:fen,
        lastMove: [],
        orientation: orientation
	};

    let cgApi: Api;
    function initializer(api: any) {
		cgApi = api;

		cgApi.set({fen: fen, orientation: orientation})
		cgApi.state.movable.dests = validMovesAsDests();
		// cgApi.setShapes([{orig:"a2", brush:"green"}])
	}

	let feedback = {state: "starting", response: "", animate: false, current_puzzle: 0}

    import { Chess } from 'chess.ts'
    import { to_number } from 'svelte/internal';
    import { goto } from '$app/navigation';


    const chess = new Chess()


	// const variation = "1. b3 e5 (1... d5 2. Nf3 Nf6 (2... Bg4 3. e3) 3. Bb2) 2. Bb2"
	const variation = "1. e4 e5 (1... c5 2. Nf3 (2. Nc3 d6) 2... d6 3. d4 (3. Bb5+ Bd7)) 2. Nf3 Nc6"
	const position = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

	fen = position

	const loadPGN = (pgn: string) => {
		let moveList: Array<{id: number; fen: string; moves: string[]}> = [{id:0, fen:fen, moves:[]}]
		let splitMoves = pgn.split(" ")
		let hist = [{fen: fen, move: splitMoves[0]}]
		let ids = {ids: [0], max: 1}

		chess.load(fen)

		for (let i in splitMoves) {
			let m = splitMoves[i]
			if (m.includes("(")) {
				let undone = chess.undo()
				hist.push({fen: chess.fen(), move: undone?.san})
				moveList.push({
					id: ids.max,
					fen:chess.fen(),
					moves:[]
				})
				ids.ids.push(moveList[moveList.length-1].id)

				ids.max++
			}
			else if (m.includes(".")) {}
			else {					
				moveList.filter(obj => {return obj.id == ids.ids[ids.ids.length-1]})[0].moves.push(m.replaceAll(")", ""))
				chess.move(m.replaceAll(")", ""))
			}
			for (let i=0; i<m.split(")").length-1; i++) {
				let lastest = hist.pop()
				chess.load(lastest?.fen || "")
				chess.move(lastest?.move || "")
				ids.ids.pop()
			}
		}
		return moveList
	} 

	const goThroughEach = (action: (m: string, c: Chess, ab: [number, number]) => boolean) => {
		let c = new Chess()
		for (let d = 0; d < moves.length; d++) {
			let m = moves[d]
			c.load(m.fen)
			for (let x = 0; x < m.moves.length; x++) {
				c.move(m.moves[x])
				if (!action(m.moves[x], c, [d, x])) {return false}
			}
		}
		return true
	}

	const validMovesAsDests = () => {
		const dests = new Map();
		const moves = chess.moves({ verbose: true });

		for (const validMove of moves) {
			const entry = dests.get(validMove.from);
			if (entry) {
				entry.push(validMove.to);
			} else {
				dests.set(validMove.from, [validMove.to]);
			}
		}

		return dests;
	}

    const createNewPuzzle = () => {
		const create = async () => {
			const response = await fetchApi("puzzlesets/puzzles/", {
				method: "POST",
				body: JSON.stringify({
					"in_set": currentSet?.id,
					"fen": newFEN,
					"correct_variations": newPGN,
            	})
			});
			if (response.ok) {
				createModalOpen=false
				messages = []
				newFEN = ""
				newPGN = ""
				fetchUserData()
				startPuzzle(currentSet?.puzzles.length-1)
			} else {
				alert("Error sending data to server.") 
			}
		}

        if (chess.validateFen(newFEN).valid) {
			fen = newFEN
			let formattedPGN = '[SetUp "1"]\n[FEN "'+newFEN+'"]\n\n'+newPGN.split("\n").reverse()[0]
			if (chess.loadPgn(formattedPGN)) {
				newPGN = formattedPGN.split("\n").reverse()[0].replace(" *", "")
				moves = loadPGN(newPGN)
				create()
			} else messages = ["Error loading correct variations, make sure the moves are in the right format."]

		} else messages = ["Invalid Starting Position"]

    }

	const deletePuzzle = async (i: number) => {
		const response = await fetchApi("puzzlesets/puzzles/"+currentSet?.puzzles[i].id, {
            method: "DELETE",
        });
        if (response.ok) {
			cgApi.set({fen: ""})
			feedback.current_puzzle = 0
            fetchUserData()
        } else {
            alert("Error deleting puzzle.")
        }
	}

	const startPuzzle = (index: number) => {
		const puzzle = currentSet?.puzzles[index]

		fen = puzzle?.fen || ""

		moves = loadPGN(puzzle?.correct_variations || "")

		chess.load(fen)

		orientation = chess.turn() == "w" ? "white" : "black"
		config.movable.dests = validMovesAsDests()
		config.movable.events.after = afterMove

		feedback.state = "start"
		feedback.current_puzzle = index

		localStorage.setItem("puzzleIndex", index)

	}

	const afterMove = (from: string, to: string, metadata: string) => {
		const movePlayed = chess.move(from+to, {sloppy:true})
		const currentPosition = chess.fen().split(" ")[0]

		let correctMoves: string[] = [] // {move:"", response:""}
		let responses: string[] = []
		let after: string[] = []
		goThroughEach((m, c, [a, b]) => {
			if (currentPosition == c.fen().split(" ")[0]) {
				correctMoves.push(m)
				responses.push(moves[a].moves[b+1] || "")	
				after.push(moves[a].moves[b+2] || "")
			}
			return true
		})

		let moveIndex = correctMoves.indexOf(movePlayed?.san || "")
		if (moveIndex > -1) {
			const response = chess.move(responses[moveIndex])
			if (response) {
				feedback.state = "correct"
				feedback.response = response?.san || ""
				setTimeout(() => {
					cgApi.move(response?.from, response?.to);
					cgApi.state.movable.dests = validMovesAsDests();
					cgApi.playPremove();
					if (!after[moveIndex]) {
						feedback.state = "done"
					}
					fen = chess.fen()
				}, 300);
			} else {
				feedback.state = "done"
			}
		} else {
			feedback.state = "wrong"
			setTimeout(() => {
				let undone = chess.undo()
				cgApi.move(undone?.to, undone?.from)
				cgApi.state.lastMove = []
				cgApi.state.movable.dests = validMovesAsDests();
				fen = chess.fen()
				initializer(cgApi)
			}, 300)
		}
		feedback.animate = true
		setTimeout(() => feedback.animate = false, 500)

	}

	const getSolution = (hint: boolean) => {
		let move: string[] = ["", ""]
		goThroughEach((m, c, [a, b]) => {
			let u = c.undo()
			if (fen.split(" ")[0] == c.fen().split(" ")[0]) {
				move = [u?.from || '', u?.to || '']
				return false
			}
			c.move(u?.san || "")
			return true
		})
		if (hint) {cgApi.setShapes([{orig: move[0], brush: "green"}])}
		else {cgApi.setShapes([{orig: move[0], dest: move[1], brush: "green"}])}
	}

	userStore.subscribe(async d => {
		userData = d;
		if (userData) {
			const response = await fetchApi("puzzlesets/sets/"+$page.params.set+"/")
			if (response.ok) {
				await response.json().then(d => currentSet = d)
			} else {
				alert("Invalid id. This set does not exist, or may have been deleted.")
				goto("/dashboard/puzzles")
			}

			startPuzzle(to_number(localStorage.getItem("puzzleIndex"))	|| 0)
		}
	})
</script>


{#if userData && currentSet}
<div class="w-full lg:p-8 lg:-mt-10 mt-20 flex flex-wrap justify-center">
	<div
		class="mx-8 lg:mt-0 mt-24"
		style="width:{board_size}px; height:{board_size}px; aspect-ratio:1"
		use:Chessground={{config, initializer}}
		use:cgStylesHelper="{{ piecesFolderUrl: '/chess/pieces/'+piece_set, boardUrl: '/chess/board/board_'+board_color+'.svg' }}"
	/>

	<div class="max-h-[{board_size}px] w-full lg:w-[20vw] bg-gray-200 dark:bg-gray-900 flex flex-col rounded-lg">
		<div class="p-1 border-b-gray-500 dark:border-b-gray-300 border-b-[1px] mx-2 flex flex-col content-center justify-center">
			<div class="flex justify-between">
				<div class="flex flex-nowrap">
					<p class="text-2xl mt-2">{currentSet.name}</p>
				</div>
				<button on:click={() => setSettingsModalOpen = true} class="btn btn-ghost p-0 w-10">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
					</svg>
				</button>
			</div>
		</div>
		<div class="h-full overflow-y-scroll">
			{#each currentSet.puzzles as s, i}
				<div on:click={() => {startPuzzle(i)}} class="border-2 rounded-lg m-3 p-2 flex justify-between border-gray-400 dark:border-gray-300 hover:bg-blue-500/40 {feedback.current_puzzle==i ? 'bg-blue-500/25' : ''}">
					<div class="flex flex-nowrap">
						<!-- <div class="mt-0.5 text-green-600 dark:text-green-400">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
								<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
							</svg>
						</div> -->
						<p class="text-lg mx-1">Puzzle {i+1}</p>
					</div>
					<div on:click={() => {deletePuzzle(i)}} class="mt-1 hover:text-red-600 dark:hover:text-red-400">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
							<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
							<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
						  </svg>
					</div>
				</div>
			{/each}

			<div on:click={() => {createModalOpen = true}} class="text-center border-2 rounded-lg m-3 p-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
				<p class="text-lg mx-1">Create New Puzzle</p>
			</div>
		</div>
		<div class="h-32 border-y-gray-500 dark:border-y-gray-300 border-y-[1px] m-2 flex flex-col items-center justify-center">
			<div class="w-full px-2 flex justify-between flex-wrap">
				<button on:click={() => getSolution(true)} class="btn btn-ghost h-14">
					<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16">
						<path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
					</svg>
				</button>
				<button on:click={() => getSolution(false)} class="btn btn-ghost h-14">
					<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
						<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
					</svg>
				</button>
				<button on:click={() => {orientation = orientation == "white" ? "black" : "white"; config.orientation = orientation}} class="btn btn-ghost h-14">
					<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
						<path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
						<path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
					</svg>
				</button>
				<button on:click={() => boardSettingsModalOpen = true} class="btn btn-ghost h-14">
					<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
						<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
						<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
					</svg>
				</button>
			</div>
		</div>
		<div class="{feedback.state == 'wrong' ? 'bg-red-400' : feedback.state == 'done' ? 'bg-green-500' : 'bg-cyan-500'} py-12 p-3 text-xl flex flex-col items-center justify-center">
			<div class="flex flex-nowrap items-center justify-center {feedback.animate ? 'bounce' : ''}">
				{#if feedback.state == "correct"}
					<div class="mr-3">
						<svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
							<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
						</svg>
					</div>
					<p>The opponent responds with <span class="font-extrabold">{feedback.response}</span>. What is the next move?</p>
				{:else if feedback.state == "wrong"}
					<div class="mr-3">
						<svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
							<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
						</svg>
					</div>
					<p>Inncorect move, try again.</p>
				{:else if feedback.state == "done"}
					<div class="mr-3">
						<svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
							<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
						</svg>
					</div>
					<p>You did it! Puzzle complete.</p>
				{:else}
					<div class="mr-3">
						<svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
							<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
						</svg>
					</div>
					<p>{chess.turn() == "w" ? "White" : "Black"} to move and slove the puzzle.</p>
				{/if}
			</div>
		</div>
	</div>
</div>

<input type="checkbox" id="create-modal" class="modal-toggle"  bind:checked={createModalOpen} />
<div class="modal">
  <div class="modal-box">
    <label for="create-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="font-bold text-lg mb-2 -mt-2">Create New Puzzle</h3>

    <form class="my-5" on:submit|preventDefault={createNewPuzzle}>
        {#if messages.length}
            <div class="alert alert-warning shadow-lg">
                <div>
					<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
					<span>{messages}</span>
                </div>
            </div>
        {/if}

        <div class="my-3">
            <p>Starting Position FEN</p>
            <input bind:value={newFEN} type="text" maxlength="100" required placeholder="Starting Position in FEN notation" class="input input-bordered input-primary w-full max-w-xs" />
        </div>

        <div class="my-3">
            <p>Correct Variation(s)</p>
            <textarea bind:value={newPGN} maxlength="1000" type="textarea" required placeholder="Correct Variations in PGN notation" class="input input-bordered input-primary h-24 w-full max-w-xs" />
        </div>

        <div class="modal-action">
            <button class="btn" type="submit">
              create
            </button>
        </div>
    </form>
  </div>
</div>

<input type="checkbox" id="board-settings-modal" class="modal-toggle" bind:checked={boardSettingsModalOpen} />
<div class="modal">
  <div class="modal-box">
    <label for="board-settings-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="font-bold text-lg mb-2 -mt-2">Create New Puzzle</h3>
        <div class="my-3">
            <p>Peice Set</p>
			<select bind:value={piece_set} on:change={saveBoardSettings} class="select select-bordered w-full max-w-xs">
				<option disabled selected>Piece Set</option>
				<option>merida</option>
				<option>gioco</option>
			</select>
		</div>

        <div class="my-3">
            <p>Board Theme</p>
			<select bind:value={board_color} on:change={saveBoardSettings} class="select select-bordered w-full max-w-xs">
				<option disabled selected>Board Theme</option>
				<option>brown</option>
				<option>blue</option>
			</select>
        </div>

		<div class="my-3">
            <p>Board Size</p>
			<input type="range" bind:value={board_size} on:change={saveBoardSettings} step="25" min="300" max="1000" class="range range-accent range-sm" />
        </div>

        <div class="modal-action">
            <label for="board-settings-modal" class="btn btn-success btn-outline w-full">
              save & close
			</label>
        </div>
  </div>
</div>

<input type="checkbox" id="set-settings-modal" class="modal-toggle" bind:checked={setSettingsModalOpen} />
<div class="modal">
  <div class="modal-box">
    <label for="set-settings-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="font-bold text-lg mb-2 -mt-2">Set Options</h3>

	<div class="my-3">
		<p class="font-extrabold">Set Name</p>
		<input on:blur={() => {}} class="input input-sm input-primary" value={currentSet.name} placeholder="change set name" />
	</div>

	<div class="my-3">
		<p class="font-extrabold">Delete Set</p>
		<p class="text-sm">Set will be permanatly deleted.</p>
		<button class="btn btn-error btn-sm">delete set</button>
	</div>

	<div class="my-3">
		<p class="font-extrabold">Share Set</p>
		<p class="text-sm">Everybody with this link can practice your set.</p>
		<div class="flex flex-nowrap">
			<button class="btn btn-square btn-success btn-sm" on:click={() => {window.open("mailto: ?cc=, &bcc= &subject=Link to Puzzle Set on Chess Path&body="+window.location.href)}}>
				<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
					<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
				</svg>
			</button>
			<input disabled class="input input-sm input-primary" value={window.location.href} placeholder="change set name" />
		</div>
	</div>

	<div class="modal-action">
		<label for="board-settings-modal" class="btn btn-info btn-outline w-full">
		  save & close
		</label>
	</div>

  </div>
</div>

{:else}

<div role="status">
    <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
    </svg>
    <span class="sr-only">Loading...</span>
</div>

Chess Path
{/if}


<style>
	.bounce {
		animation: bounce 0.5s;
	}
	@keyframes bounce {
    0% {
        transform: scale(1,1);
    }
    50% {
        transform: scale(1.05,1.05);
    }
    100% {
        transform: scale(1,1);
    }
}
</style>