import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

let Change = (choice, whitesTurn, setClosedPawn) => {
    let pawn_choice = choice.target.classList[1];
    let pawnChoice = "";
    switch (pawn_choice) {
        case "dame":
            pawnChoice = "QU";
            break;
        case "fou":
            pawnChoice = "BS";
            break;
        case "tour":
            pawnChoice = "TW";
            break;
        case "cavalier":
            pawnChoice = "HS";
            break;
    }
    let pawnBox = choice.target.id;
    pawnBox = document.getElementsByClassName(pawnBox)[0];
    pawnBox.innerHTML = pawnChoice;
    let class1 = pawnBox.classList[0];
    let class2 = pawnBox.classList[1];
    pawnBox.setAttribute("class", "");
    pawnBox.classList.add(class1, class2, (whitesTurn ? "W" : "B"), pawnChoice, `v${(whitesTurn ? "W" : "B")}`, `v${pawnChoice}`);
    (pawnChoice != "" && ReactDOM.createRoot(document.getElementsByClassName("Change_pawn")[0]).render(<ReInit />));
    setClosedPawn(true);
}

let ReInit = () => {
    return ""
}

export default Change;