import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { notify } from "../../../Utils/Notify"; // Import the notification system
import { Board } from "../Board/Board";
import "./Game.css";
import { BackgroundChanger } from "../../SharedArea/BackgroundChanger/BackgroundChanger";

// Define the winning lines outside of the functions to avoid duplication
const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const Game: React.FC = () => {
    const calculateWinner = (cells: (string | null)[]) => {
        for (let i = 0; i < winningLines.length; i++) {
            const [a, b, c] = winningLines[i];
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                notify.success(`${cells[a]} has won!`);
                return cells[a];  // Return 'X' or 'O' as the winner
            }
        }
        return null;  // Return null if no winner is found
    };

    const findBestMove = (cells: (string | null)[], player: string) => {
        for (let i = 0; i < winningLines.length; i++) {
            const [a, b, c] = winningLines[i];
            if (cells[a] === player && cells[b] === player && cells[c] === null) return c;
            if (cells[a] === player && cells[c] === player && cells[b] === null) return b;
            if (cells[b] === player && cells[c] === player && cells[a] === null) return a;
        }
        return null;
    };

    const [cells, setCells] = useState<(string | null)[]>(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [mode, setMode] = useState<'playerVsPlayer' | 'playerVsPC' | null>(null);

    // Automatically handle the computer move if in "Player vs PC" mode and it's O's turn
    useEffect(() => {
        if (mode === 'playerVsPC' && !xIsNext && !calculateWinner(cells)) {
            const timer = setTimeout(() => {
                const player = "X"; // You as a player are "X"
                const computer = "O"; // The computer is "O"

                const blockMove = findBestMove(cells, player);
                let moveIndex = blockMove;

                if (moveIndex === null) {
                    const emptyCells = cells
                        .map((cell, i) => (cell === null ? i : null))
                        .filter(i => i !== null) as number[];
                    moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                }

                const newCells = [...cells];
                newCells[moveIndex!] = computer;  // Computer plays "O"
                setCells(newCells);
                setXIsNext(true);  // Switch back to player
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [xIsNext, mode, cells]);

    const handleClick = (index: number) => {
        const cellCopy = cells.slice();
        if (calculateWinner(cells) || cellCopy[index]) return;

        if (mode === 'playerVsPlayer') {
            cellCopy[index] = xIsNext ? "X" : "O";
            setCells(cellCopy);
            setXIsNext(!xIsNext);
        }

        if (mode === 'playerVsPC' && xIsNext) {
            cellCopy[index] = "X";
            setCells(cellCopy);
            setXIsNext(false);
        }
    };

    const winner = calculateWinner(cells);
    const isBoardFull = cells.every(cell => cell !== null);

    useEffect(() => {
        if (winner) {
            if (mode === 'playerVsPlayer') {
                notify.success(`Player ${winner} has won!`);
            } else if (mode === 'playerVsPC') {
                if (winner === "X") {
                    notify.success("Congratulations! You beat the computer!");
                } else {
                    notify.error("Game Over! The computer has won.");
                }
            }
        } else if (isBoardFull) {
            notify.draw("It's a draw!");
        }
    }, [winner, isBoardFull, mode]);

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (isBoardFull) {
        status = "It's a draw!";
    } else {
        status = `Next Player: ${xIsNext ? "X" : "O"}`;
    }

    return (
        <div className="Game">
            {/* Render BackgroundChanger only before mode is selected */}
           
            {!mode ? (
                <div>
                    <h3>Tic Tac Toe</h3>
                    <Button variant="outlined" sx={{ color: 'black', borderColor: 'black',  margin: '10px' }} onClick={() => setMode('playerVsPlayer')}>Player vs Player</Button>
                    <Button variant="outlined" sx={{ color: 'black', borderColor: 'black',  margin: '10px' }} onClick={() => setMode('playerVsPC')}>Player vs PC</Button>
                </div>
            ) : (
                <>
                    <Board cells={cells} onclick={handleClick} />
                    <div><span>{status}</span></div>
                    <Button variant="outlined" sx={{ color: 'black', borderColor: 'black',  margin: '10px' }} onClick={() => window.location.reload()}>Restart Game</Button>
                </>
            )}
             {!mode && <BackgroundChanger />}
        </div>
    );
};

export default Game;
