import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Change from "./Change"


let Change_pawn = (props) => {
    let box_num = props.box_num;
    let whitesTurn = props.whitesTurn;
    let setClosedPawn = props.setClosedPawn;
    return (
        <table>
            <caption>Changer Pion</caption>
            <tbody>
                <tr>
                    <td className="pawn_choice dame" id={box_num} onClick={(choice) => Change(choice, whitesTurn, setClosedPawn)}>Dame</td>
                    <td className="pawn_choice fou" id={box_num} onClick={(choice) => Change(choice, whitesTurn, setClosedPawn)}>Fou</td>
                    <td className="pawn_choice tour" id={box_num} onClick={(choice) => Change(choice, whitesTurn, setClosedPawn)}>Tour</td>
                    <td className="pawn_choice cavalier" id={box_num} onClick={(choice) => Change(choice, whitesTurn, setClosedPawn)}>Cavalier</td>
                </tr>
            </tbody>
        </table>)
}

export default Change_pawn;