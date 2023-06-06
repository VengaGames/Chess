import React, { useState } from "react";
const ChessGame = () => {
  const [game, setGame] = useState([
    { piece: { type: "R", color: "black" }, row: 0, col: 0 },
    { piece: { type: "N", color: "black" }, row: 0, col: 1 },
    { piece: { type: "B", color: "black" }, row: 0, col: 2 },
    { piece: { type: "Q", color: "black" }, row: 0, col: 3 },
    { piece: { type: "K", color: "black" }, row: 0, col: 4 },
    { piece: { type: "B", color: "black" }, row: 0, col: 5 },
    { piece: { type: "N", color: "black" }, row: 0, col: 6 },
    { piece: { type: "R", color: "black" }, row: 0, col: 7 },
    { piece: { type: "P", color: "black" }, row: 1, col: 0 },
    { piece: { type: "P", color: "black" }, row: 1, col: 1 },
    { piece: { type: "P", color: "black" }, row: 1, col: 2 },
    { piece: { type: "P", color: "black" }, row: 1, col: 3 },
    { piece: { type: "P", color: "black" }, row: 1, col: 4 },
    { piece: { type: "P", color: "black" }, row: 1, col: 5 },
    { piece: { type: "P", color: "black" }, row: 1, col: 6 },
    { piece: { type: "P", color: "black" }, row: 1, col: 7 },
    { piece: null, row: 2, col: 0 },
    { piece: null, row: 2, col: 1 },
    { piece: null, row: 2, col: 2 },
    { piece: null, row: 2, col: 3 },
    { piece: null, row: 2, col: 4 },
    { piece: null, row: 2, col: 5 },
    { piece: null, row: 2, col: 6 },
    { piece: null, row: 2, col: 7 },
    { piece: null, row: 3, col: 0 },
    { piece: null, row: 3, col: 1 },
    { piece: null, row: 3, col: 2 },
    { piece: null, row: 3, col: 3 },
    { piece: null, row: 3, col: 4 },
    { piece: null, row: 3, col: 5 },
    { piece: null, row: 3, col: 6 },
    { piece: null, row: 3, col: 7 },
    { piece: null, row: 4, col: 0 },
    { piece: null, row: 4, col: 1 },
    { piece: null, row: 4, col: 2 },
    { piece: null, row: 4, col: 3 },
    { piece: null, row: 4, col: 4 },
    { piece: null, row: 4, col: 5 },
    { piece: null, row: 4, col: 6 },
    { piece: null, row: 4, col: 7 },
    { piece: null, row: 5, col: 0 },
    { piece: null, row: 5, col: 1 },
    { piece: null, row: 5, col: 2 },
    { piece: null, row: 5, col: 3 },
    { piece: null, row: 5, col: 4 },
    { piece: null, row: 5, col: 5 },
    { piece: null, row: 5, col: 6 },
    { piece: null, row: 5, col: 7 },
    { piece: { type: "P", color: "white" }, row: 6, col: 0 },
    { piece: { type: "P", color: "white" }, row: 6, col: 1 },
    { piece: { type: "P", color: "white" }, row: 6, col: 2 },
    { piece: { type: "P", color: "white" }, row: 6, col: 3 },
    { piece: { type: "P", color: "white" }, row: 6, col: 4 },
    { piece: { type: "P", color: "white" }, row: 6, col: 5 },
    { piece: { type: "P", color: "white" }, row: 6, col: 6 },
    { piece: { type: "P", color: "white" }, row: 6, col: 7 },
    { piece: { type: "R", color: "white" }, row: 7, col: 0 },
    { piece: { type: "N", color: "white" }, row: 7, col: 1 },
    { piece: { type: "B", color: "white" }, row: 7, col: 2 },
    { piece: { type: "Q", color: "white" }, row: 7, col: 3 },
    { piece: { type: "K", color: "white" }, row: 7, col: 4 },
    { piece: { type: "B", color: "white" }, row: 7, col: 5 },
    { piece: { type: "N", color: "white" }, row: 7, col: 6 },
    { piece: { type: "R", color: "white" }, row: 7, col: 7 },
  ]);

  const [selectedPiece, setSelectedPiece] = useState(null);
  const [error, setError] = useState(null);
  const [turn, setTurn] = useState("white");

  const playPiece = (square) => {
    const piece = selectedPiece.piece;
    if (!piece) {
      setSelectedPiece(null);
      return setError("No piece selected");
    }
    if (piece?.color !== turn) {
      setSelectedPiece(null);
      return setError("Not your piece");
    }
    setGame((prev) => {
      const newGame = [...prev];
      const from = newGame.findIndex((square) => square.row === selectedPiece.row && square.col === selectedPiece.col);
      const to = newGame.findIndex((s) => s.row === square.row && s.col === square.col);
      newGame[from].piece = null;
      newGame[to].piece = piece;
      console.log(newGame[to], selectedPiece);
      return newGame;
    });
    setSelectedPiece(null);
    setTurn((prev) => (prev === "white" ? "black" : "white"));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
      <div className="flex flex-row gap-3 items-center justify-center">
        <h1 className="text-4xl text-white">Chess | </h1>
        <div className="text-2xl text-white">Turn: {turn}</div>
      </div>
      <div className="grid grid-cols-8 w-[500px] h-[500px] m-4">
        {game.map((square, index) => {
          return (
            <div
              className={`h-[62.5px] flex items-center cursor-pointer justify-center  ${(square.row + square.col) % 2 ? "bg-slate-700" : "bg-slate-400"} ${
                selectedPiece?.row === square.row && selectedPiece?.col === square.col ? "!bg-green-500" : ""
              } ${square.piece?.color === "black" ? "text-black" : "text-white"}`}
              style={{ gridRow: square.row + 1, gridColumn: square.col + 1 }}
              key={index}
              onClick={() => {
                return selectedPiece !== null ? playPiece(square) : setSelectedPiece(structuredClone(square));
              }}>
              {square.piece && square.piece.type}
            </div>
          );
        })}
      </div>
      {error && (
        <div onClick={() => setError(null)} className="bg-red-500 text-white p-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default ChessGame;
