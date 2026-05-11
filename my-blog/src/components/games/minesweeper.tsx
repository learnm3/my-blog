"use client";

import { useState, useCallback, useEffect } from "react";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

type Cell = {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
};

function createBoard(): Cell[][] {
  const board: Cell[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    }))
  );

  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      placed++;
    }
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) {
            count++;
          }
        }
      }
      board[r][c].adjacent = count;
    }
  }

  return board;
}

function reveal(board: Cell[][], r: number, c: number): Cell[][] {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  const stack = [[r, c]];
  while (stack.length) {
    const [cr, cc] = stack.pop()!;
    const cell = newBoard[cr][cc];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    if (cell.adjacent === 0 && !cell.mine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
            stack.push([nr, nc]);
          }
        }
      }
    }
  }
  return newBoard;
}

export function Minesweeper() {
  const [board, setBoard] = useState<Cell[][]>(createBoard);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [minesLeft, setMinesLeft] = useState(MINES);

  const checkWin = useCallback((b: Cell[][]) => {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!b[r][c].mine && !b[r][c].revealed) return false;
      }
    }
    return true;
  }, []);

  const handleCellClick = useCallback(
    (r: number, c: number) => {
      if (gameOver || won) return;
      const cell = board[r][c];
      if (cell.revealed || cell.flagged) return;
      if (cell.mine) {
        setGameOver(true);
        return;
      }
      const newBoard = reveal(board, r, c);
      setBoard(newBoard);
      if (checkWin(newBoard)) setWon(true);
    },
    [board, gameOver, won, checkWin]
  );

  const handleRightClick = useCallback(
    (r: number, c: number, e: React.MouseEvent) => {
      e.preventDefault();
      if (gameOver || won) return;
      const cell = board[r][c];
      if (cell.revealed) return;
      const newBoard = board.map((row) => row.map((c) => ({ ...c })));
      newBoard[r][c].flagged = !newBoard[r][c].flagged;
      setBoard(newBoard);
      setMinesLeft(
        MINES - newBoard.flat().filter((c) => c.flagged).length
      );
    },
    [board, gameOver, won]
  );

  const reset = () => {
    setBoard(createBoard());
    setGameOver(false);
    setWon(false);
    setMinesLeft(MINES);
  };

  const getCellColor = (cell: Cell) => {
    if (!cell.revealed) return "";
    if (cell.mine) return "";
    const colors = [
      "",
      "text-blue-600",
      "text-green-600",
      "text-red-600",
      "text-purple-700",
      "text-red-800",
      "text-teal-600",
      "text-black",
      "text-zinc-500",
    ];
    return colors[cell.adjacent] || "";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center gap-4">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          Mines left: {minesLeft}
        </span>
        <button
          onClick={reset}
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
        >
          New Game
        </button>
        {(gameOver || won) && (
          <span className={`text-sm font-semibold ${won ? "text-green-600" : "text-red-600"}`}>
            {won ? "You Win!" : "Game Over!"}
          </span>
        )}
      </div>
      <div className="inline-grid grid-cols-9 border-2 border-zinc-400 dark:border-zinc-600">
        {board.map((row, r) =>
          row.map((cell, c) => {
            let content = "";
            let bg = "bg-zinc-200 dark:bg-zinc-700";
            if (cell.revealed) {
              bg = "bg-zinc-50 dark:bg-zinc-800";
              if (cell.mine) {
                content = "💣";
                bg = "bg-red-200 dark:bg-red-900";
              } else if (cell.adjacent > 0) {
                content = String(cell.adjacent);
              }
            } else if (cell.flagged) {
              content = "🚩";
            }
            return (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                onContextMenu={(e) => handleRightClick(r, c, e)}
                className={`flex h-8 w-8 items-center justify-center border border-zinc-300 text-xs font-bold transition-colors dark:border-zinc-600 ${bg} ${getCellColor(cell)} ${!cell.revealed && !gameOver ? "hover:bg-zinc-300 dark:hover:bg-zinc-600" : ""}`}
              >
                {content}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
