import Check from "./Check";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

let box_ = "";

let Nextmove = (piece, box, col, virtual, check, [whitesTurn, enPassant, roqueW, roqueB]) => {
    let states_N = [whitesTurn, enPassant, roqueW, roqueB];
    let next_boxes = [];
    switch (piece) {
        case 'PW':
            let go = true;
            if (col == "W") {
                box_ = `${Number(box[0]) - 1}${box[1]}`;
                ((!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}W`) &&
                    !document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}B`)) ?
                    next_boxes.push(box_) : go = false);
                if (box[0] == 7 && go) {
                    box_ = `${Number(box[0]) - 2}${box[1]}`;
                    ((!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}W`) &&
                        !document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}B`)) &&
                        next_boxes.push(box_));
                }
                for (let i of [-1, 1]) {
                    {
                        box_ = `${Number(box[0]) - 1}${Number(box[1]) + i}`;
                        ((Number(box[1]) + i <= 8 && Number(box[1]) + i >= 1 &&
                            document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}B`))
                            && next_boxes.push(box_))
                    }
                }
                if (enPassant[1] == true && enPassant[0][0] == box[0] &&
                    (Number(enPassant[0][1]) == Number(box[1]) + 1 || Number(enPassant[0][1]) == Number(box[1]) - 1)) {
                    next_boxes.push(`${Number(enPassant[0]) - 10}`)
                }
            } else {
                box_ = `${Number(box[0]) + 1}${box[1]}`;
                ((!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}W`) &&
                    !document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}B`)) ?
                    next_boxes.push(box_) : go = false);
                if (box[0] == 2 && go) {
                    box_ = `${Number(box[0]) + 2}${box[1]}`;
                    ((!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}W`) &&
                        !document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}B`)) &&
                        next_boxes.push(box_));
                }
                for (let i of [-1, 1]) {
                    box_ = `${Number(box[0]) + 1}${Number(box[1]) + i}`;
                    (Number(box[1]) + i <= 8 && Number(box[1]) + i >= 1 &&
                        document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}W`)) &&
                        next_boxes.push(box_);
                }
                if (enPassant[1] == true && enPassant[0][0] == box[0] &&
                    (Number(enPassant[0][1]) == Number(box[1]) + 1 || Number(enPassant[0][1]) == Number(box[1]) - 1)) {
                    next_boxes.push(`${Number(enPassant[0]) + 10}`)
                }
            }
            break;

        case 'TW':
            let haut = true;
            let i = 1;
            while (haut && i < 8) {
                box_ = `${Number(box[0]) - i}${box[1]}`;
                if (Number(box[0]) - i >= 1) {
                    (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`) ? next_boxes.push(box_) : haut = false);
                    (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) && (haut = false));
                } else {
                    haut = false;
                }
                i += 1;
            }
            let bas = true;
            i = 1;
            while (bas && i < 8) {
                box_ = `${Number(box[0]) + i}${box[1]}`;
                if (Number(box[0]) + i <= 8) {
                    (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`) ? next_boxes.push(box_) : bas = false);
                    (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) && (bas = false));
                } else {
                    bas = false;
                }
                i += 1;
            }
            let droite = true;
            i = 1;
            while (droite && i < 8) {
                box_ = `${box[0]}${Number(box[1]) + i}`;
                if (Number(box[1]) + i <= 8) {
                    (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`) ? next_boxes.push(box_) : droite = false);
                    (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) && (droite = false));
                } else {
                    droite = false;
                }
                i += 1;
            }
            let gauche = true;
            i = 1;
            while (gauche && i < 8) {
                box_ = `${box[0]}${Number(box[1]) - i}`;
                if (Number(box[1]) - i >= 1) {
                    (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`) ? next_boxes.push(box_) : gauche = false);
                    (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) && (gauche = false));
                }
                i += 1;
            }
            break;

        case 'HS':
            for (let i of [2, -2]) {
                for (let j of [1, -1]) {
                    {
                        box_ = `${Number(box[0]) + i}${Number(box[1]) + j}`;
                        ((Number(box[0]) + i <= 8 && Number(box[1]) + j <= 8
                            && Number(box[0]) + i >= 1 && Number(box[1]) + j) >= 1 &&
                            !document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`))
                            && next_boxes.push(box_)
                    };
                    {
                        box_ = `${Number(box[0]) + j}${Number(box[1]) + i}`;
                        ((Number(box[0]) + j <= 8 && Number(box[1]) + i <= 8
                            && Number(box[0]) + j >= 1 && Number(box[1]) + i) >= 1 &&
                            !document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`))
                            && next_boxes.push(box_);
                    };
                }
            }
            break;

        case 'BS':
            let hd = true;
            let hg = true;
            let bd = true;
            let bg = true;
            for (let i = 1; i < 8; i++) {
                {
                    if (bd) {
                        box_ = `${Number(box[0]) + i}${Number(box[1]) + i}`;
                        if (Number(box[0]) + i <= 8 && Number(box[1]) + i <= 8) {
                            (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`) ?
                                next_boxes.push(box_) : bd = false);
                            (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) &&
                                (bd = false));
                        } else {
                            bd = false;
                        }
                    }
                };
                {
                    if (hg) {
                        box_ = `${Number(box[0]) - i}${Number(box[1]) - i}`;
                        if (Number(box[0]) - i >= 1 && Number(box[1]) - i >= 1) {
                            (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`) ?
                                next_boxes.push(box_) : hg = false);
                            (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) &&
                                (hg = false));
                        } else {
                            hg = false;
                        }
                    }
                }
                {
                    if (hd) {
                        box_ = `${Number(box[0]) - i}${Number(box[1]) + i}`;
                        if (Number(box[0]) - i >= 1 && Number(box[1]) + i <= 8) {
                            (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`)
                                ? next_boxes.push(box_) : hd = false);
                            (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) &&
                                (hd = false));
                        } else {
                            hd = false;
                        }
                    }
                }
                {
                    if (bg) {
                        box_ = `${Number(box[0]) + i}${Number(box[1]) - i}`;
                        if (Number(box[0]) + i <= 8 && Number(box[1]) - i >= 1) {
                            (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`)
                                ? next_boxes.push(box_) : bg = false);
                            (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) &&
                                (bg = false));
                        } else {
                            bg = false;
                        }
                    }
                }

            }
            break;

        case 'QU':
            let haut_ = true;
            let j = 1;
            while (haut_ && j < 8) {
                box_ = `${Number(box[0]) - j}${box[1]}`;
                if (Number(box[0]) - j >= 1) {
                    (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`) ? next_boxes.push(box_) : haut_ = false);
                    (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) && (haut_ = false));
                } else {
                    haut_ = false;
                }
                j += 1;
            }
            let bas_ = true;
            j = 1;
            while (bas_ && j < 8) {
                box_ = `${Number(box[0]) + j}${box[1]}`;
                if (Number(box[0]) + j <= 8) {
                    (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`) ? next_boxes.push(box_) : bas_ = false);
                    (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) && (bas_ = false));
                } else {
                    bas_ = false;
                }
                j += 1;
            }
            let droite_ = true;
            j = 1;
            while (droite_ && j < 8) {
                box_ = `${box[0]}${Number(box[1]) + j}`;
                if (Number(box[1]) + j <= 8) {
                    (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`) ? next_boxes.push(box_) : droite_ = false);
                    (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) && (droite_ = false));
                } else {
                    droite_ = false;
                }
                j += 1;
            }
            let gauche_ = true;
            j = 1;
            while (gauche_ && j < 8) {
                box_ = `${box[0]}${Number(box[1]) - j}`;
                if (Number(box[1]) - j >= 1) {
                    (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`) ? next_boxes.push(box_) : gauche_ = false);
                    (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) && (gauche_ = false));
                }
                j += 1;
            }
            let hd_ = true;
            let hg_ = true;
            let bd_ = true;
            let bg_ = true;
            for (let i = 1; i < 8; i++) {
                {
                    if (bd_) {
                        box_ = `${Number(box[0]) + i}${Number(box[1]) + i}`;
                        if (Number(box[0]) + i <= 8 && Number(box[1]) + i <= 8) {
                            (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`) ?
                                next_boxes.push(box_) : bd_ = false);
                            (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) && (bd_ = false));
                        } else {
                            bd_ = false;
                        }
                    }
                };
                {
                    if (hg_) {
                        box_ = `${Number(box[0]) - i}${Number(box[1]) - i}`;
                        if (Number(box[0]) - i >= 1 && Number(box[1]) - i >= 1) {
                            (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`) ?
                                next_boxes.push(box_) : hg_ = false);
                            (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) && (hg_ = false));
                        } else {
                            hg_ = false;
                        }
                    }
                }
                {
                    if (hd_) {
                        box_ = `${Number(box[0]) - i}${Number(box[1]) + i}`;
                        if (Number(box[0]) - i >= 1 && Number(box[1]) + i <= 8) {
                            (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`)
                                ? next_boxes.push(box_) : hd_ = false);
                            (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) && (hd_ = false));
                        } else {
                            hd_ = false;
                        }
                    }
                }
                {
                    if (bg_) {
                        box_ = `${Number(box[0]) + i}${Number(box[1]) - i}`;
                        if (Number(box[0]) + i <= 8 && Number(box[1]) - i >= 1) {
                            (!document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`)
                                ? next_boxes.push(box_) : bg_ = false);
                            (document.getElementsByClassName(`${box_}`)[0].classList.contains(`${(virtual ? "v" : "")}${(col == "W" ? "B" : "W")}`) && (bg_ = false));
                        } else {
                            bg_ = false;
                        }
                    }
                }

            }
            break;

        case 'KI':
            if (col == "W") {
                let box_w = "";
                let next_boxes_w = [];
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        {
                            box_w = `${Number(box[0]) + i}${Number(box[1]) + j}`;
                            if (!(i == 0 && j == 0) && Number(box[0]) + i <= 8 && Number(box[1]) + j <= 8 && Number(box[0]) + i >= 1 && Number(box[1]) + j >= 1) {
                                (!document.getElementsByClassName(`${box_w}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`) &&
                                    next_boxes_w.push(box_w));
                            }
                        }
                    }
                }
                if (!check) {
                    if ((roqueW[0] && whitesTurn == true && document.getElementsByClassName("81")[0].classList.contains("W", "TW")) ||
                        (roqueB[0] && whitesTurn == false && document.getElementsByClassName("11")[0].classList.contains("B", "TW"))) {
                        let count = 0;
                        for (let i = 1; i < 4; i++) {
                            box_w = `${Number(box[0])}${Number(box[1]) - i}`;
                            (document.getElementsByClassName(`${box_w}`)[0].innerHTML != "" ? count = count + 1 : null);
                        }
                        if (count == 0) {
                            document.getElementsByClassName(`${box}`)[0].classList.remove(`v${(whitesTurn ? "W" : "B")}`, "vKI", "selec");
                            for (let i = 0; i < 3; i++) {
                                box_w = `${Number(box[0])}${Number(box[1]) - i}`;
                                document.getElementsByClassName(`${box_w}`)[0].classList.add(`v${(whitesTurn ? "W" : "B")}`, "vKI");
                                (Check(box_w, (whitesTurn ? "W" : "B"), states_N) ? count = count + 1 : null);
                                document.getElementsByClassName(`${box_w}`)[0].classList.remove(`v${(whitesTurn ? "W" : "B")}`, "vKI");
                            }
                            document.getElementsByClassName(`${box}`)[0].classList.add(`v${(whitesTurn ? "W" : "B")}`, "vKI", "selec");
                            if (count == 0) {
                                next_boxes_w.push(`${Number(box[0])}${Number(box[1]) - 2}`);
                            }
                        }
                    }

                    if ((roqueW[1] && whitesTurn == true && document.getElementsByClassName("88")[0].classList.contains("W", "TW")) ||
                        (roqueB[1] && whitesTurn == false && document.getElementsByClassName("18")[0].classList.contains("B", "TW"))) {
                        let count = 0;
                        for (let i = 1; i < 3; i++) {
                            box_w = `${Number(box[0])}${Number(box[1]) + i}`;
                            (document.getElementsByClassName(`${box_w}`)[0].innerHTML != "" ? count = count + 1 : null);
                        }
                        if (count == 0) {
                            document.getElementsByClassName(`${box}`)[0].classList.remove(`v${(whitesTurn ? "W" : "B")}`, "vKI", "selec");
                            for (let i = 0; i < 3; i++) {
                                box_w = `${Number(box[0])}${Number(box[1]) + i}`;
                                document.getElementsByClassName(`${box_w}`)[0].classList.add(`v${(whitesTurn ? "W" : "B")}`, "vKI");
                                (Check(box_w, (whitesTurn ? "W" : "B"), states_N) ? count = count + 1 : null);
                                document.getElementsByClassName(`${box_w}`)[0].classList.remove(`v${(whitesTurn ? "W" : "B")}`, "vKI");
                            }
                            document.getElementsByClassName(`${box}`)[0].classList.add(`v${(whitesTurn ? "W" : "B")}`, "vKI", "selec");
                            if (count == 0) {
                                next_boxes_w.push(`${Number(box[0])}${Number(box[1]) + 2}`);
                            }
                        }
                    }
                }
                next_boxes = next_boxes_w;
            }
            if (col == "B") {
                let box_b = "";
                let next_boxes_b = [];
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        {
                            box_b = `${Number(box[0]) + i}${Number(box[1]) + j}`;
                            if (!(i == 0 && j == 0) && Number(box[0]) + i <= 8 && Number(box[1]) + j <= 8 && Number(box[0]) + i >= 1 && Number(box[1]) + j >= 1) {
                                (!document.getElementsByClassName(`${box_b}`)[0].classList.contains(`${(virtual ? "v" : "")}${col}`) &&
                                    next_boxes_b.push(box_b));
                            }
                        }
                    }
                }
                if (!check) {
                    if ((roqueW[0] && whitesTurn == true && document.getElementsByClassName("81")[0].classList.contains("W", "TW")) ||
                        (roqueB[0] && whitesTurn == false && document.getElementsByClassName("11")[0].classList.contains("B", "TW"))) {
                        let count = 0;
                        for (let i = 1; i < 4; i++) {
                            box_b = `${Number(box[0])}${Number(box[1]) - i}`;
                            (document.getElementsByClassName(`${box_b}`)[0].innerHTML != "" ? count = count + 1 : null);
                        }
                        if (count == 0) {
                            document.getElementsByClassName(`${box}`)[0].classList.remove(`v${(whitesTurn ? "W" : "B")}`, "vKI", "selec");
                            for (let i = 0; i < 3; i++) {
                                box_b = `${Number(box[0])}${Number(box[1]) - i}`;
                                document.getElementsByClassName(`${box_b}`)[0].classList.add(`v${(whitesTurn ? "W" : "B")}`, "vKI");
                                (Check(box_b, (whitesTurn ? "W" : "B"), states_N) ? count = count + 1 : null);
                                document.getElementsByClassName(`${box_b}`)[0].classList.remove(`v${(whitesTurn ? "W" : "B")}`, "vKI");
                            }
                            document.getElementsByClassName(`${box}`)[0].classList.add(`v${(whitesTurn ? "W" : "B")}`, "vKI", "selec");
                            if (count == 0) {
                                next_boxes_b.push(`${Number(box[0])}${Number(box[1]) - 2}`);
                            }
                        }
                    }

                    if ((roqueW[1] && whitesTurn == true) && document.getElementsByClassName("88")[0].classList.contains("W", "TW") ||
                        (roqueB[1] && whitesTurn == false && document.getElementsByClassName("18")[0].classList.contains("B", "TW"))) {
                        let count = 0;
                        for (let i = 1; i < 3; i++) {
                            box_b = `${Number(box[0])}${Number(box[1]) + i}`;
                            (document.getElementsByClassName(`${box_b}`)[0].innerHTML != "" ? count = count + 1 : null);
                        }
                        if (count == 0) {
                            document.getElementsByClassName(`${box}`)[0].classList.remove(`v${(whitesTurn ? "W" : "B")}`, "vKI", "selec");
                            for (let i = 0; i < 3; i++) {
                                box_b = `${Number(box[0])}${Number(box[1]) + i}`;
                                document.getElementsByClassName(`${box_b}`)[0].classList.add(`v${(whitesTurn ? "W" : "B")}`, "vKI");
                                (Check(box_b, (whitesTurn ? "W" : "B"), states_N) ? count = count + 1 : null);
                                document.getElementsByClassName(`${box_b}`)[0].classList.remove(`v${(whitesTurn ? "W" : "B")}`, "vKI");
                            }
                            document.getElementsByClassName(`${box}`)[0].classList.add(`v${(whitesTurn ? "W" : "B")}`, "vKI", "selec");
                            if (count == 0) {
                                next_boxes_b.push(`${Number(box[0])}${Number(box[1]) + 2}`);
                            }
                        }
                    }
                }
                next_boxes = next_boxes_b;
            }
            break;
    }
    return (next_boxes)
}


export default Nextmove;