import React, { useEffect, useState } from "react";

let next = [];
let next_boxes = [];
let special_moves = [];
let move_piece = "";
let box_ = ""
let old_box = "";

let Init = () => {
    const [whitesTurn, isWhitesTurn] = useState(true);
    const [selected, isSelected] = useState(false);
    const [enPassant, setEnPassant] = useState(["00", false]);

    let Play = (box) => {
        let col = box.target.className[13];
        let whos_turn = (whitesTurn ? "W" : "B")
        let piece = box.target.className.substring(15, 17);
        if (selected == false && col == whos_turn) {
            isSelected(true);
            move_piece = box.target.className.substring(15, 17);
            next_boxes = Nextmove(move_piece, box.target.className.substring(10, 12), col);
            old_box = box.target;
        } else if (selected && next_boxes.includes(`${box.target.className.substring(10, 12)}`)) {
            box.target.innerHTML = move_piece;
            let old_class = box.target.className;
            old_box.className = old_box.className.substring(0, 12);
            old_box.innerHTML = "";
            box.target.className = old_class.substring(0, 12) + " " + (whitesTurn ? "W" : "B") + " " + move_piece;
            if (whitesTurn) {
                isWhitesTurn(false);
            } else {
                isWhitesTurn(true);
            }
            isSelected(false);
        } else {
            isSelected(false);
        }

    }

    let Nextmove = (piece, box, col) => {
        next_boxes = [];
        special_moves = [];
        switch (piece) {
            case 'PW':
                if (col == "W") {
                    box_ = `${Number(box[0]) - 1}${box[1]}`;
                    (document.getElementsByClassName(`${box_}`)[0].classList[2] != col && next_boxes.push(box_));
                    if (box[0] == 7) {
                        box_ = `${Number(box[0]) - 2}${box[1]}`;
                        (document.getElementsByClassName(`${box_}`)[0].classList[2] != col && next_boxes.push(box_));
                    }
                    for (let i of [-1, 1]) {
                        {
                            box_ = `${Number(box[0]) - 1}${Number(box[1]) + i}`;
                            ((Number(box[1]) + i <= 8 && Number(box[1]) + i >= 1 &&
                                document.getElementsByClassName(`${box_}`)[0].classList[2] == "B")
                                && next_boxes.push(box_))
                        }
                    }
                    if (enPassant[0] == true && enPassant[1][0] == box[0] &&
                        (Number(enPassant[1][1]) == Number(box[1]) + 1 || Number(enPassant[1][1]) == Number(box[1]) - 1)) {
                        next_boxes.push(`${enPassant[1]}`)
                    }
                } else {
                    box_ = `${Number(box[0]) + 1}${box[1]}`;
                    (document.getElementsByClassName(`${box_}`)[0].classList[2] != col && next_boxes.push(box_));
                    if (box[0] == 2) {
                        box_ = `${Number(box[0]) + 2}${box[1]}`;
                        (document.getElementsByClassName(`${box_}`)[0].classList[2] != col && next_boxes.push(box_));
                    }
                    for (let i of [-1, 1]) {
                        box_ = `${Number(box[0]) + 1}${Number(box[1]) + i}`;
                        (Number(box[1]) + i <= 8 && Number(box[1]) + i >= 1 &&
                            document.getElementsByClassName(`${box_}`)[0].classList[2] == "W") && next_boxes.push(box_);
                    }
                    if (enPassant[0] == true && enPassant[1][0] == box[0] &&
                        (Number(enPassant[1][1]) == Number(box[1]) + 1 || Number(enPassant[1][1]) == Number(box[1]) - 1)) {
                        next_boxes.push(`${enPassant[1]}`)
                    }
                }
                break;

            case 'TW':
                let haut = true;
                let i = 1;
                while (haut && i < 8) {
                    box_ = `${Number(box[0]) - i}${box[1]}`;
                    if (Number(box[0]) - i >= 1) {
                        (document.getElementsByClassName(`${box_}`)[0].classList[2] != col ? next_boxes.push(box_) : haut = false);
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
                        (document.getElementsByClassName(`${box_}`)[0].classList[2] != col ? next_boxes.push(box_) : bas = false);
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
                        (document.getElementsByClassName(`${box_}`)[0].classList[2] != col ? next_boxes.push(box_) : droite = false);
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
                        (document.getElementsByClassName(`${box_}`)[0].classList[2] != col ? next_boxes.push(box_) : gauche = false);
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
                                document.getElementsByClassName(`${box_}`)[0].classList[2] != col)
                                && next_boxes.push(box_)
                        };
                        {
                            box_ = `${Number(box[0]) + j}${Number(box[1]) + i}`;
                            ((Number(box[0]) + j <= 8 && Number(box[1]) + i <= 8
                                && Number(box[0]) + j >= 1 && Number(box[1]) + i) >= 1 &&
                                document.getElementsByClassName(`${box_}`)[0].classList[2] != col)
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
                                (document.getElementsByClassName(`${box_}`)[0].classList[2] != col ?
                                    next_boxes.push(box_) : bg = false);
                            } else {
                                bg = false;
                            }
                        }
                    };
                    {
                        if (hg) {
                            box_ = `${Number(box[0]) - i}${Number(box[1]) - i}`;
                            if (Number(box[0]) - i >= 1 && Number(box[1]) - i >= 1) {
                                (document.getElementsByClassName(`${box_}`)[0].classList[2] != col ?
                                    next_boxes.push(box_) : hg = false);
                            } else {
                                hg = false;
                            }
                        }
                    }
                    {
                        if (hd) {
                            box_ = `${Number(box[0]) - i}${Number(box[1]) + i}`;
                            if (Number(box[0]) - i >= 1 && Number(box[1]) + i <= 8) {
                                (document.getElementsByClassName(`${box_}`)[0].classList[2] != col
                                    ? next_boxes.push(box_) : hd = false);
                            } else {
                                hd = false;
                            }
                        }
                    }
                    {
                        if (bg) {
                            box_ = `${Number(box[0]) + i}${Number(box[1]) - i}`;
                            if (Number(box[0]) + i <= 8 && Number(box[1]) - i >= 1) {
                                (document.getElementsByClassName(`${box_}`)[0].classList[2] != col
                                    ? next_boxes.push(box_) : bg = false);
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
                        (document.getElementsByClassName(`${box_}`)[0].classList[2] != col ? next_boxes.push(box_) : haut_ = false);
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
                        (document.getElementsByClassName(`${box_}`)[0].classList[2] != col ? next_boxes.push(box_) : bas_ = false);
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
                        (document.getElementsByClassName(`${box_}`)[0].classList[2] != col ? next_boxes.push(box_) : droite_ = false);
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
                        (document.getElementsByClassName(`${box_}`)[0].classList[2] != col ? next_boxes.push(box_) : gauche_ = false);
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
                                (document.getElementsByClassName(`${box_}`)[0].classList[2] != col ?
                                    next_boxes.push(box_) : bg_ = false);
                            } else {
                                bg_ = false;
                            }
                        }
                    };
                    {
                        if (hg_) {
                            box_ = `${Number(box[0]) - i}${Number(box[1]) - i}`;
                            if (Number(box[0]) - i >= 1 && Number(box[1]) - i >= 1) {
                                (document.getElementsByClassName(`${box_}`)[0].classList[2] != col ?
                                    next_boxes.push(box_) : hg_ = false);
                            } else {
                                hg_ = false;
                            }
                        }
                    }
                    {
                        if (hd_) {
                            box_ = `${Number(box[0]) - i}${Number(box[1]) + i}`;
                            if (Number(box[0]) - i >= 1 && Number(box[1]) + i <= 8) {
                                (document.getElementsByClassName(`${box_}`)[0].classList[2] != col
                                    ? next_boxes.push(box_) : hd_ = false);
                            } else {
                                hd_ = false;
                            }
                        }
                    }
                    {
                        if (bg_) {
                            box_ = `${Number(box[0]) + i}${Number(box[1]) - i}`;
                            if (Number(box[0]) + i <= 8 && Number(box[1]) - i >= 1) {
                                (document.getElementsByClassName(`${box_}`)[0].classList[2] != col
                                    ? next_boxes.push(box_) : bg_ = false);
                            } else {
                                bg_ = false;
                            }
                        }
                    }

                }
                break;

            case 'KI':
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        {
                            box_ = `${Number(box[0]) + i}${Number(box[1]) + j}`;
                            ((Number(box[0]) + i <= 8 && Number(box[1]) + j <= 8 && Number(box[0]) + i >= 1 && Number(box[1]) + j >= 1 &&
                                document.getElementsByClassName(`${box_}`)[0].classList[2] != col)
                                && next_boxes.push(box_))
                        }
                    }
                }
                break;
        }
        return (next_boxes)
    }

    return (<table>
        <caption>Echecs</caption>
        <tbody id="board">
            <tr>
                <td className="WhiteCase 11 B TW" onClick={Play}>TW</td>
                <td className="BlackCase 12 B HS" onClick={Play}>HS</td>
                <td className="WhiteCase 13 B BS" onClick={Play}>BS</td>
                <td className="BlackCase 14 B QU" onClick={Play}>QU</td>
                <td className="WhiteCase 15 B KI" onClick={Play}>KI</td>
                <td className="BlackCase 16 B BS" onClick={Play}>BI</td>
                <td className="WhiteCase 17 B HS" onClick={Play}>HS</td>
                <td className="BlackCase 18 B TW" onClick={Play}>TW</td>
            </tr>
            <tr>
                <td className="BlackCase 21 B PW" onClick={Play}>PW</td>
                <td className="WhiteCase 22 B PW" onClick={Play}>PW</td>
                <td className="BlackCase 23 B PW" onClick={Play}>PW</td>
                <td className="WhiteCase 24 B PW" onClick={Play}>PW</td>
                <td className="BlackCase 25 B PW" onClick={Play}>PW</td>
                <td className="WhiteCase 26 B PW" onClick={Play}>PW</td>
                <td className="BlackCase 27 B PW" onClick={Play}>PW</td>
                <td className="WhiteCase 28 B PW" onClick={Play}>PW</td>
            </tr>
            <tr>
                <td className="WhiteCase 31" onClick={Play}></td>
                <td className="BlackCase 32" onClick={Play}></td>
                <td className="WhiteCase 33" onClick={Play}></td>
                <td className="BlackCase 34" onClick={Play}></td>
                <td className="WhiteCase 35" onClick={Play}></td>
                <td className="BlackCase 36" onClick={Play}></td>
                <td className="WhiteCase 37" onClick={Play}></td>
                <td className="BlackCase 38" onClick={Play}></td>
            </tr>
            <tr>
                <td className="BlackCase 41" onClick={Play}></td>
                <td className="WhiteCase 42" onClick={Play}></td>
                <td className="BlackCase 43" onClick={Play}></td>
                <td className="WhiteCase 44" onClick={Play}></td>
                <td className="BlackCase 45" onClick={Play}></td>
                <td className="WhiteCase 46" onClick={Play}></td>
                <td className="BlackCase 47" onClick={Play}></td>
                <td className="WhiteCase 48" onClick={Play}></td>
            </tr>
            <tr>
                <td className="WhiteCase 51" onClick={Play}></td>
                <td className="BlackCase 52" onClick={Play}></td>
                <td className="WhiteCase 53" onClick={Play}></td>
                <td className="BlackCase 54" onClick={Play}></td>
                <td className="WhiteCase 55" onClick={Play}></td>
                <td className="BlackCase 56" onClick={Play}></td>
                <td className="WhiteCase 57" onClick={Play}></td>
                <td className="BlackCase 58" onClick={Play}></td>
            </tr>
            <tr>
                <td className="BlackCase 61" onClick={Play}></td>
                <td className="WhiteCase 62" onClick={Play}></td>
                <td className="BlackCase 63" onClick={Play}></td>
                <td className="WhiteCase 64" onClick={Play}></td>
                <td className="BlackCase 65" onClick={Play}></td>
                <td className="WhiteCase 66" onClick={Play}></td>
                <td className="BlackCase 67" onClick={Play}></td>
                <td className="WhiteCase 68" onClick={Play}></td>
            </tr>
            <tr>
                <td className="WhiteCase 71 W PW" onClick={Play}>PW</td>
                <td className="BlackCase 72 W PW" onClick={Play}>PW</td>
                <td className="WhiteCase 73 W PW" onClick={Play}>PW</td>
                <td className="BlackCase 74 W PW" onClick={Play}>PW</td>
                <td className="WhiteCase 75 W PW" onClick={Play}>PW</td>
                <td className="BlackCase 76 W PW" onClick={Play}>PW</td>
                <td className="WhiteCase 77 W PW" onClick={Play}>PW</td>
                <td className="BlackCase 78 W PW" onClick={Play}>PW</td>
            </tr>
            <tr>
                <td className="BlackCase 81 W TW" onClick={Play}>TW</td>
                <td className="WhiteCase 82 W HS" onClick={Play}>HS</td>
                <td className="BlackCase 83 W BS" onClick={Play}>BS</td>
                <td className="WhiteCase 84 W KI" onClick={Play}>KI</td>
                <td className="BlackCase 85 W QU" onClick={Play}>QU</td>
                <td className="WhiteCase 86 W BS" onClick={Play}>BS</td>
                <td className="BlackCase 87 W HS" onClick={Play}>HS</td>
                <td className="WhiteCase 88 W PW" onClick={Play}>TW</td>
            </tr>
        </tbody>
    </table>)
}

export default Init;