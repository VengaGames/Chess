import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Nextmove from "./Nextmove";
import Check from "./Check";
import Change_pawn from "./Change/change_pawn"

let next_boxes = [];
let move_piece = "";
let box_ = "";
let old_box = "";
let old_box_ = "";
let virtual = false;
let next_boxes_ = "";
let states_N = [];

let Game = (box, [[whitesTurn, isWhitesTurn], [selected, isSelected], [enPassant, setEnPassant],
    [roqueW, setRoqueW], [roqueB, setRoqueB], [closedPawn, setClosedPawn]]) => {
    let col = box.target.className[13];
    let whos_turn = (whitesTurn ? "W" : "B")
    let piece = box.target.classList[3];
    states_N = [whitesTurn, enPassant, roqueW, roqueB]
    if (col == whos_turn) {
        isSelected(true);
        old_box_ != "" && old_box_.classList.remove("selec");
        box.target.classList.add("selec");
        move_piece = piece;
        next_boxes = Nextmove(move_piece, box.target.classList[1], col, false, false, states_N);
        old_box_ = box.target;
    } else if (selected && next_boxes.includes(`${box.target.classList[1]}`)) {
        old_box_.classList.remove((whitesTurn ? "vW" : "vB"), `v${move_piece}`);
        let virtual_col = "";
        let virtual_piece = "";
        if (box.target.classList.contains((whitesTurn ? "B" : "W"))) {
            virtual_col = box.target.classList[4];
            virtual_piece = box.target.classList[5];
            box.target.classList.replace(virtual_col, `v${(whitesTurn ? "W" : "B")}`);
            box.target.classList.replace(virtual_piece, `v${move_piece}`);
        } else {
            box.target.classList.add(`v${(whitesTurn ? "W" : "B")}`);
            box.target.classList.add(`v${move_piece}`);
        }
        let king = document.getElementsByClassName(`${(whitesTurn ? "W" : "B")} KI`)[0].classList[1];
        (move_piece == "KI" ? king = box.target.classList[1] : null);
        if (Check(king, (whitesTurn ? "W" : "B"), states_N)) {
            if (virtual_col != "") {
                box.target.classList.replace(`v${(whitesTurn ? "W" : "B")}`, virtual_col);
                box.target.classList.replace(`v${move_piece}`, virtual_piece);
            } else {
                box.target.classList.remove(`v${(whitesTurn ? "W" : "B")}`);
                box.target.classList.remove(`v${move_piece}`);
            }
            old_box_.classList.remove("selec");
            old_box_.classList.add((whitesTurn ? "vW" : "vB"), `v${move_piece}`);
            old_box_.classList.add("selec");
            isSelected(false);
        } else {
            box.target.innerHTML = move_piece;
            old_box_.classList.remove((whitesTurn ? "W" : "B"), move_piece);
            old_box_.innerHTML = "";
            old_box != "" && old_box.classList.remove("selec");
            if (move_piece == "PW" &&
                ((Number(box.target.classList[1][0]) == Number(old_box_.classList[1][0]) + 2 && whitesTurn == false) ||
                    (Number(box.target.classList[1][0]) == Number(old_box_.classList[1][0]) - 2 && whitesTurn == true))) {
                setEnPassant([box.target.classList[1], true]);
            } else if (move_piece == "PW" && enPassant[1] == true &&
                ((Number(box.target.classList[1]) == Number(enPassant[0]) + 10 && whitesTurn == false) ||
                    (Number(box.target.classList[1]) == Number(enPassant[0]) - 10 && whitesTurn == true))) {
                let pawn = document.getElementsByClassName(`${enPassant[0]}`)[0];
                pawn.classList.remove(pawn.classList[2], pawn.classList[3], pawn.classList[4], pawn.classList[5]);
                pawn.innerHTML = "";
                setEnPassant(["00", false]);
            } else {
                setEnPassant(["00", false]);
            }
            if (move_piece == "KI") {
                if (Number(box.target.classList[1][1]) == Number(old_box_.classList[1][1]) - 2) {
                    let box_tower = `${box.target.classList[1][0]}${box.target.classList[1][1] - 2}`;
                    let tw = document.getElementsByClassName(box_tower)[0];
                    tw.classList.remove("TW", `${(whitesTurn ? "W" : "B")}`, `v${(whitesTurn ? "W" : "B")}`, "vTW");
                    tw.innerHTML = "";
                    let nw_box_tower = `${Number(box.target.classList[1][0])}${Number(box.target.classList[1][1]) + 1}`;
                    let nw_tw = document.getElementsByClassName(nw_box_tower)[0];
                    nw_tw.classList.remove(`v${(whitesTurn ? "W" : "B")}`, "vKI");
                    nw_tw.classList.add(`${(whitesTurn ? "W" : "B")}`, "TW", `v${(whitesTurn ? "W" : "B")}`, "vTW");
                    nw_tw.innerHTML = "TW";
                    (whitesTurn ? setRoqueW([false, roqueW[1]]) : setRoqueB([false, roqueB[1]]))
                } else if (Number(box.target.classList[1][1]) == Number(old_box_.classList[1][1]) + 2) {
                    let box_tower = `${Number(box.target.classList[1][0])}${Number(box.target.classList[1][1]) + 1}`;
                    let tw = document.getElementsByClassName(box_tower)[0];
                    tw.classList.remove("TW", `${col}`, `v${col}`, "vTW");
                    tw.innerHTML = "";
                    let nw_box_tower = `${Number(box.target.classList[1][0])}${Number(box.target.classList[1][1]) - 1}`;
                    let nw_tw = document.getElementsByClassName(nw_box_tower)[0];
                    nw_tw.classList.remove(`v${(whitesTurn ? "W" : "B")}`, "vKI");
                    nw_tw.classList.add(`${(whitesTurn ? "W" : "B")}`, "TW", `v${(whitesTurn ? "W" : "B")}`, "vTW");
                    nw_tw.innerHTML = "TW";
                    (whitesTurn ? setRoqueW([roqueW[0], false]) : setRoqueB([roqueB[0], false]))
                } else {
                    (whitesTurn ? setRoqueW([false, false]) : setRoqueB([false, false]));
                }
            }
            if (move_piece == "TW") {
                ((old_box_.classList[1][0] == "1" && old_box_.classList[1][1] == "1") ? setRoqueB([false, roqueB[1]]) : null);
                ((old_box_.classList[1][0] == "1" && old_box_.classList[1][1] == "8") ? setRoqueB([roqueB[0], false]) : null);
                ((old_box_.classList[1][0] == "8" && old_box_.classList[1][1] == "1") ? setRoqueW([false, roqueW[1]]) : null);
                ((old_box_.classList[1][0] == "8" && old_box_.classList[1][1] == "8") ? setRoqueW([roqueW[0], false]) : null);
            }
            if (move_piece == "PW" && (box.target.classList[1][0] == 8 || box.target.classList[1][0] == 1)) {
                ReactDOM.createRoot(document.getElementsByClassName("Change_pawn")[0]).render(<Change_pawn box_num={box.target.classList[1]} whitesTurn={whitesTurn} setClosedPawn={setClosedPawn} />);
            }
            old_box = box.target;
            box.target.classList.remove(`v${(whitesTurn ? "W" : "B")}`);
            box.target.classList.remove(`v${move_piece}`);
            box.target.classList.contains((whitesTurn ? "B" : "W")) && box.target.classList.remove(box.target.classList[3]);
            box.target.classList.contains((whitesTurn ? "B" : "W")) && box.target.classList.replace((whitesTurn ? "B" : "W"), (whitesTurn ? "W" : "B"));
            box.target.classList.add((whitesTurn ? "W" : "B"), move_piece, (whitesTurn ? "vW" : "vB"), `v${move_piece}`, "selec",);
            if (whitesTurn) {
                while (!closedPawn) {
                }
                isWhitesTurn(false);
            } else {
                while (!closedPawn) {
                }
                isWhitesTurn(true);
            }
            isSelected(false);
        }
    } else {
        isSelected(false);
    }

}

export default Game;