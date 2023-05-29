import React, { useEffect, useState } from "react";
import Game from "./game"

let Init = () => {
    const [whitesTurn, isWhitesTurn] = useState(true);
    const [selected, isSelected] = useState(false);
    const [enPassant, setEnPassant] = useState(["00", false]);
    const [roqueW, setRoqueW] = useState([true, true]);
    const [roqueB, setRoqueB] = useState([true, true]);
    const [closedPawn, setClosedPawn] = useState(true);
    let states = [[whitesTurn, isWhitesTurn], [selected, isSelected], [enPassant, setEnPassant],
    [roqueW, setRoqueW], [roqueB, setRoqueB], [closedPawn, setClosedPawn]];

    return (
        <div>
            <table>
                <caption>Echecs</caption>
                <tbody id="board">
                    <tr>
                        <td className="WhiteCase 11 B TW vB vTW" onClick={(self) => { Game(self, states) }}>TW</td>
                        <td className="BlackCase 12 B HS vB vHS" onClick={(self) => { Game(self, states) }}>HS</td>
                        <td className="WhiteCase 13 B BS vB vBS" onClick={(self) => { Game(self, states) }}>BS</td>
                        <td className="BlackCase 14 B QU vB vQU" onClick={(self) => { Game(self, states) }}>QU</td>
                        <td className="WhiteCase 15 B KI vB vKI" onClick={(self) => { Game(self, states) }}>KI</td>
                        <td className="BlackCase 16 B BS vB vBS" onClick={(self) => { Game(self, states) }}>BI</td>
                        <td className="WhiteCase 17 B HS vB vHS" onClick={(self) => { Game(self, states) }}>HS</td>
                        <td className="BlackCase 18 B TW vB vTW" onClick={(self) => { Game(self, states) }}>TW</td>
                    </tr>
                    <tr>
                        <td className="BlackCase 21 B PW vB vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                        <td className="WhiteCase 22 B PW vB vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                        <td className="BlackCase 23 B PW vB vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                        <td className="WhiteCase 24 B PW vB vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                        <td className="BlackCase 25 B PW vB vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                        <td className="WhiteCase 26 B PW vB vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                        <td className="BlackCase 27 B PW vB vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                        <td className="WhiteCase 28 B PW vB vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                    </tr>
                    <tr>
                        <td className="WhiteCase 31" onClick={(self) => { Game(self, states) }}></td>
                        <td className="BlackCase 32" onClick={(self) => { Game(self, states) }}></td>
                        <td className="WhiteCase 33" onClick={(self) => { Game(self, states) }}></td>
                        <td className="BlackCase 34" onClick={(self) => { Game(self, states) }}></td>
                        <td className="WhiteCase 35" onClick={(self) => { Game(self, states) }}></td>
                        <td className="BlackCase 36" onClick={(self) => { Game(self, states) }}></td>
                        <td className="WhiteCase 37" onClick={(self) => { Game(self, states) }}></td>
                        <td className="BlackCase 38" onClick={(self) => { Game(self, states) }}></td>
                    </tr>
                    <tr>
                        <td className="BlackCase 41" onClick={(self) => { Game(self, states) }}></td>
                        <td className="WhiteCase 42" onClick={(self) => { Game(self, states) }}></td>
                        <td className="BlackCase 43" onClick={(self) => { Game(self, states) }}></td>
                        <td className="WhiteCase 44" onClick={(self) => { Game(self, states) }}></td>
                        <td className="BlackCase 45" onClick={(self) => { Game(self, states) }}></td>
                        <td className="WhiteCase 46" onClick={(self) => { Game(self, states) }}></td>
                        <td className="BlackCase 47" onClick={(self) => { Game(self, states) }}></td>
                        <td className="WhiteCase 48" onClick={(self) => { Game(self, states) }}></td>
                    </tr>
                    <tr>
                        <td className="WhiteCase 51" onClick={(self) => { Game(self, states) }}></td>
                        <td className="BlackCase 52" onClick={(self) => { Game(self, states) }}></td>
                        <td className="WhiteCase 53" onClick={(self) => { Game(self, states) }}></td>
                        <td className="BlackCase 54" onClick={(self) => { Game(self, states) }}></td>
                        <td className="WhiteCase 55" onClick={(self) => { Game(self, states) }}></td>
                        <td className="BlackCase 56" onClick={(self) => { Game(self, states) }}></td>
                        <td className="WhiteCase 57" onClick={(self) => { Game(self, states) }}></td>
                        <td className="BlackCase 58" onClick={(self) => { Game(self, states) }}></td>
                    </tr>
                    <tr>
                        <td className="BlackCase 61" onClick={(self) => { Game(self, states) }}></td>
                        <td className="WhiteCase 62" onClick={(self) => { Game(self, states) }}></td>
                        <td className="BlackCase 63" onClick={(self) => { Game(self, states) }}></td>
                        <td className="WhiteCase 64" onClick={(self) => { Game(self, states) }}></td>
                        <td className="BlackCase 65" onClick={(self) => { Game(self, states) }}></td>
                        <td className="WhiteCase 66" onClick={(self) => { Game(self, states) }}></td>
                        <td className="BlackCase 67" onClick={(self) => { Game(self, states) }}></td>
                        <td className="WhiteCase 68" onClick={(self) => { Game(self, states) }}></td>
                    </tr>
                    <tr>
                        <td className="WhiteCase 71 W PW vW vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                        <td className="BlackCase 72 W PW vW vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                        <td className="WhiteCase 73 W PW vW vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                        <td className="BlackCase 74 W PW vW vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                        <td className="WhiteCase 75 W PW vW vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                        <td className="BlackCase 76 W PW vW vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                        <td className="WhiteCase 77 W PW vW vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                        <td className="BlackCase 78 W PW vW vPW" onClick={(self) => { Game(self, states) }}>PW</td>
                    </tr>
                    <tr>
                        <td className="BlackCase 81 W TW vW vTW" onClick={(self) => { Game(self, states) }}>TW</td>
                        <td className="WhiteCase 82 W HS vW vHS" onClick={(self) => { Game(self, states) }}>HS</td>
                        <td className="BlackCase 83 W BS vW vBS" onClick={(self) => { Game(self, states) }}>BS</td>
                        <td className="WhiteCase 84 W QU vW vQU" onClick={(self) => { Game(self, states) }}>QU</td>
                        <td className="BlackCase 85 W KI vW vKI" onClick={(self) => { Game(self, states) }}>KI</td>
                        <td className="WhiteCase 86 W BS vW vBS" onClick={(self) => { Game(self, states) }}>BS</td>
                        <td className="BlackCase 87 W HS vW vHS" onClick={(self) => { Game(self, states) }}>HS</td>
                        <td className="WhiteCase 88 W TW vW vTW" onClick={(self) => { Game(self, states) }}>TW</td>
                    </tr>
                </tbody>
            </table>
            <div class="Change_pawn">
            </div>
        </div>
    )
}

export default Init;