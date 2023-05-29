import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Nextmove from "./Nextmove";

let Check = (king_box, color, states_N) => {
    for (let ennemy of document.getElementsByClassName(`${(color == "W" ? "vB" : "vW")}`)) {
        if (ennemy.classList.contains("W") || ennemy.classList.contains("B")) {
            if (Nextmove(ennemy.classList[5].substring(1, 3), ennemy.classList[1], ennemy.classList[4][1], true, true, states_N).includes(`${king_box}`)) {
                return true
            }
        } else {
            if (Nextmove(ennemy.classList[3].substring(1, 3), ennemy.classList[1], ennemy.classList[2][1], true, true, states_N).includes(`${king_box}`)) {
                return true
            }
        }
    }
    return false
}

export default Check;