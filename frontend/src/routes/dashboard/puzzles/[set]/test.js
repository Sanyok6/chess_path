import { Chess } from 'chess.ts'
const chess = new Chess()

const variation = "1. e4 e5 (1... c5 2. Nf3 (2. Nc3 d6) 2... d6 3. d4 (3. Bb5+ Bd7)) 2. Nf3 Nc6"
const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

const loadPGN = (/** @type {string} */ pgn) => {
    let moveList = [{id:0, fen:fen, moves:[]}]
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
            chess.move(m.replaceAll(")", ""))
        }
        for (let i=0; i<m.split(")").length-1; i++) {
            chess.load(hist.pop() || "")
            ids.ids.pop()
        }
    }
    return moveList
} 

loadPGN(variation)