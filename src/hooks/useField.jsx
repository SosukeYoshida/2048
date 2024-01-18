import { useEffect, useRef, useState } from "react";
import { rightMove, leftMove, upMove, downMove } from "../moveFunctions/moveFunctions";

export const useField = (setIsMove) => {

    const [field, setField] = useState([]);
    const [marge, setMarge] = useState([]);
    const [initMarge, setInitMarge] = useState([]);
    const [gameOverMessage, setGameOverMessage] = useState("");
    const [claerMessage, setClearMessage] = useState("");
    const [isClear, setIsClear] = useState(false);

    //合体したか判断するやつ

    //初期化用
    const margeBool = [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
    ];
    //初期配列:デバッグ作業用
    const cells = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]

    //4方向探索配列
    const cellArround = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ]
    //フィールド作成
    const createField = () => {
        //初期配列代入
        setField(cells);
        setMarge(margeBool)
        const initMarge = JSON.parse(JSON.stringify(margeBool));
        setInitMarge(initMarge);
        //２をランダムな位置にセットする
        let randomRow1 = 0,
            randomColumn1 = 0,
            randomRow2 = 0,
            randomColumn2 = 0;
        setField((prevField) => {
            //重複しないようにする
            do {
                randomRow1 = Math.floor(Math.random() * 4);
                randomColumn1 = Math.floor(Math.random() * 4);
                randomRow2 = Math.floor(Math.random() * 4);
                randomColumn2 = Math.floor(Math.random() * 4);
            } while (
                (randomRow1 === randomRow2 && randomColumn1 === randomColumn2));
            prevField[randomRow1][randomColumn1] = Math.floor(Math.random() * 2) === 0 ? 2 : 4;
            prevField[randomRow2][randomColumn2] = Math.floor(Math.random() * 2) === 0 ? 2 : 4;
            return [...prevField]
        })
    }
    useEffect(() => {
        createField()
    }, [])



    //場内判定
    const outField = (yNum, xNum) => {
        return yNum >= 0 && yNum < 4 && xNum >= 0 && xNum < 4
    }

    //全体探索
    const judge = () => {
        let slideArray = [];
        const newField = [...field];
        //フィールドすべてを取得
        for (const [dyIndex, dy] of newField.entries()) {
            for (const [dxIndex, dx] of dy.entries()) {
                //全てのマス4方向探索
                for (const Arr of cellArround) {
                    const [yArr, xArr] = Arr;
                    let yNum = dyIndex + yArr;
                    let xNum = dxIndex + xArr;

                    while (outField(yNum, xNum)) {
                        //空白のマスじゃないなら処理終了
                        if (newField[yNum][xNum] > 0) {
                            break;
                        }
                        //空白のマスなら空白のマスのindex番号をpushする 
                        else {
                            slideArray.push([yNum, xNum]);
                        }
                        yNum += yArr;
                        xNum += xArr;
                    }
                }
            }
        }
        return slideArray
    }

    //空いているマスにランダムに2か4のセルを生成する
    const createCell = () => {
        const newCell = judge();
        if (newCell.length > 0) {
            const randomNum = Math.floor(Math.random() * newCell.length);
            const [canPutY, canPutX] = newCell[randomNum];
            setField((prevField) => {
                prevField[canPutY][canPutX] = Math.floor(Math.random() * 2) === 0 ? 2 : 4;
                return prevField
            })
        }
    }


    //すでに置いてあるマスの判定をする
    const putCellCheck = () => {
        const newField = [...field]
        const cellPut = [];
        for (let i = 0; i < newField.length; i++) {
            for (let j = 0; j < newField[i].length; j++) {
                if (newField[i][j] > 0) {
                    cellPut.push([i, j],)
                }
            }
        }
        return cellPut
    }


    //動かせるマスを格納する配列
    //フィールド移動
    const Move = (e) => {
        const newField = [...field];
        const cellPut = putCellCheck();
        for (const [y, x] of cellPut) {
            const upCheck = y - 1 >= 0;
            const downCheck = y + 1 < 4;
            const leftCheck = x - 1 >= 0;
            const rightCheck = x + 1 < 4;
            if (rightCheck && newField[y][x]) {
                if (e.key == "ArrowRight") {
                    setField((prevField) => {
                        const slideField = [...prevField]
                        const fieldNum = 4
                        rightMove(fieldNum, prevField, marge, setIsMove, initMarge, setMarge);

                        return slideField
                    })
                    setMarge(margeBool);
                }

            }
            if (leftCheck && newField[y][x]) {
                if (e.key == "ArrowLeft") {
                    setField((prevField) => {
                        const slideField = [...prevField]
                        const fieldNum = 4
                        leftMove(fieldNum, prevField, marge, setIsMove, initMarge, setMarge)
                        return slideField
                    })
                    setMarge(margeBool);
                }
            } if (upCheck && newField[y][x]) {
                if (e.key == "ArrowUp") {
                    setField((prevField) => {
                        const slideField = [...prevField]
                        const fieldNum = 4
                        upMove(fieldNum, prevField, marge, setIsMove, initMarge, setMarge)

                        return slideField
                    })
                    setMarge(margeBool);
                }
            } if (downCheck && newField[y][x]) {
                if (e.key == "ArrowDown") {
                    setField((prevField) => {
                        const slideField = [...prevField]
                        const fieldNum = 4
                        downMove(fieldNum, prevField, marge, setIsMove, initMarge, setMarge)

                        return slideField
                    })
                    setMarge(margeBool);
                }
            }
        }
    }

    // 一つ一つくっつくセルがあるか４方向を判定する

    const margeJude = () => {
        const newField = [...field];
        for (const [yIndex, y] of newField.entries()) {
            for (const [xIndex, x] of y.entries()) {
                //フィールドの空セルがないなら
                for (const Arr of cellArround) {
                    const [yArr, xArr] = Arr;
                    let yNum = yIndex + yArr;
                    let xNum = xIndex + xArr;

                    if (outField(yNum, xNum)) {
                        // 今探索しているセルと４方向探索で見たセルの値が同じなら hasSameAdjacentCell を true に設定
                        //空セルがあるかを判定する

                        if (newField[yNum][xNum] === 0) {
                            return true;
                        }
                        //今見ている数字が0でないかつの周りにあるセルが自分の数字と同じならまだ動ける
                        if (newField[yNum][xNum] !== 0 && newField[yIndex][xIndex] !== 0 && newField[yIndex][xIndex] === newField[yNum][xNum]) {
                            console.log(newField[yIndex][xIndex] === newField[yNum][xNum]);
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }


    const checkClear = () => {
        const newField = [...field];
        for (const [yIndex, y] of newField.entries()) {
            for (const [xIndex, x] of y.entries()) {
                //ゲームクリア
                if (newField[yIndex][xIndex] == 2048) {
                    setIsClear(true)
                    break;
                }
            }
        }
    }

    const isGameOver = margeJude();
    useEffect(() => {
        checkClear()
        if (field.length === 0) {
            return;
        }
        if (!isGameOver && field[0]) {
            setGameOverMessage("ゲームオーバー")
        }
    }, [field, isGameOver]);


    useEffect(() => {
        if (isClear) {
            setClearMessage("ゲームクリア")
        }
    }, [isClear])

    return { field, Move, createCell, claerMessage, gameOverMessage, isClear }
}
