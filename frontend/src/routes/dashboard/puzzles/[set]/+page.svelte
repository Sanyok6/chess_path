<script lang="ts">
	import { page } from '$app/stores';
    import { userStore, type PuzzleSet, type User } from '$lib/store';
	import { Chessground, cgStylesHelper } from 'svelte-use-chessground';
	import 'svelte-use-chessground/cgstyles/chessground.css';

	let userData: User | null = null;
	let currentSet: PuzzleSet | null = null; 

    userStore.subscribe(d => {
		userData = d;
		if (userData) {
			for (let p in userData.data.sets) {
				if (userData.data.sets[p].id == $page.params.set) {currentSet = userData.data.sets[p]}
			}
		}
	})

	let createModalOpen = false

	let messages: string[] = []
	let newFEN = ""
	let newCV = "" // abbriviation for Correct Variation

	let board_size = 50
	let board_style = "blue"

	// let config = {
	// 	movable:{
	// 		free:false,
	// 		dests:["d4"],
	// 		events: {after: []}
	// 	},
	// 	premovable:{
	// 		enabled:false,
	// 	},
	// 	fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    //     lastMove: [],
    //     orientation: "white",
	// };

    let config = {}

    let cgApi;

    function initializer(api: any) {
		cgApi = api;
	}


    import { Chess } from 'chess.ts'
    import { onMount } from 'svelte';

    const chess = new Chess()

	let fen = ""
	let moves: Array<any> = []

	const variation = "1. b3 e5 (1... d5 2. Nf3 Nf6 (2... Bg4 3. e3) 3. Bb2) 2. Bb2"
	// const variation = "1. e4 e5 (1... c5 2. Nf3 (2. Nc3 d6) 2... d6 3. d4 (3. Bb5+ Bd7)) 2. Nf3 Nc6"
	const position = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

	fen = position

	const loadPGN = (pgn: string) => {
		let moveList: Array<any> = [{id:0, fen:fen, moves:[]}]
		let hist = [fen]
		let splitMoves = pgn.split(" ")
		let ids = {ids: [0], max: 1}

		for (let i in splitMoves) {
			let m = splitMoves[i]
			if (m.includes("(")) {
				moveList.push({
					id: ids.max,
					fen:chess.fen(),
					moves:[]
				})
				hist.push(chess.fen())
				ids.ids.push(moveList[moveList.length-1].id)
				chess.undo()

				ids.max++
			}
			else if (m.includes(".")) {}
			else {					
				moveList.filter(obj => {return obj.id == ids.ids[ids.ids.length-1]})[0].moves.push(m.replaceAll(")", ""))
			}
			for (let i=0; i<m.split(")").length-1; i++) {
				chess.load(hist.pop() || "")
				ids.ids.pop()
			}
		}
		return moveList
	} 

	const goThroughEach = (action: (m: string) => boolean) => {
		for (let depth in moves) {
			chess.load(fen)
			for (let m in moves[depth]) {
			}
		}
	}


	onMount(() => {
		moves = loadPGN(variation)
		goThroughEach((m) => {
			console.log(m);
			return true;
		})

		console.log(moves)

	})


    const createNewPuzzle = () => {
        if (chess.validateFen(newFEN)) {
			chess.load(newFEN)
		}
    }


</script>


{#if userData && currentSet}

<div class="w-full p-8 flex flex-wrap justify-center">
	<div
		class="mx-8"
		style="width:{board_size}%;aspect-ratio:1"
		use:Chessground={{config, initializer}}
		use:cgStylesHelper="{{ piecesFolderUrl: '/pieces/', boardUrl: '/board/board_'+board_style+'.svg' }}"
	/>

	<div class="w-full lg:w-[20vw] bg-gray-200 dark:bg-gray-900 flex flex-col">
		<div class="p-1 border-b-gray-500 dark:border-b-gray-300 border-b-[1px] mx-2 flex flex-col content-center justify-center">
			<div class="flex justify-between">
				<p class="text-2xl mt-2">{currentSet.name}</p>
				<button class="btn btn-ghost p-0 w-10">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
						<path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
						<path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
					</svg>
				</button>
			</div>
		</div>
		<div class="h-full overflow-y-scroll">
			{#each currentSet.puzzles as s, i}
				<div class="border-2 rounded-lg m-3 p-2 flex justify-between border-gray-400 dark:border-gray-300">
					<div class="flex flex-nowrap">
						<div class="mt-0.5 text-green-400">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
								<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
							</svg>
						</div>
						<p class="text-lg mx-1">Puzzle {i+1}</p>
					</div>
					<div class="mt-1 hover:text-blue-600 dark:hover:text-blue-200">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
							<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
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
				<button class="btn btn-ghost h-14">
					<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16">
						<path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
					</svg>
				</button>
				<button class="btn btn-ghost h-14">
					<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
						<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
					</svg>
				</button>
				<button class="btn btn-ghost h-14">
					<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
						<path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
						<path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
					</svg>
				</button>
				<button class="btn btn-ghost h-14">
					<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
						<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
						<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
					</svg>
				</button>
			</div>
		</div>
		<div class="py-12 bg-cyan-500 p-3 text-xl flex flex-col items-center justify-center">
			<div class="flex flex-nowrap items-center justify-center">
				<div class="mr-3">
					<svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
						<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
					</svg>
				</div>
				<p>The opponent responds with <span class="font-extrabold">d5</span>. What is the next move?</p>
			</div>
		</div>
	</div>
</div>

<input type="checkbox" id="create-modal" class="modal-toggle"  bind:checked={createModalOpen} />
<div class="modal">
  <div class="modal-box">
    <label for="create-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="font-bold text-lg mb-2 -mt-2">Create New Puzzle</h3>

    <form class="my-5" on:submit|preventDefault={() => {}}>
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
            <input bind:value={newFEN} type="text" required placeholder="Starting Position in FEN notation" class="input input-bordered input-primary w-full max-w-xs" />
        </div>

        <div class="my-3">
            <p>Correct Variation(s)</p>
            <textarea bind:value={newCV} type="textarea" required placeholder="Correct Variations" class="input input-bordered input-primary h-24 w-full max-w-xs" />
        </div>

        <div class="modal-action">
            <button class="btn" type="submit">
              create
            </button>
          </div>

    </form>
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