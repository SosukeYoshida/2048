import { useEffect, useState } from "react";

export const useField = () => {

    const [field, setField] = useState([]);
    //初期配列
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

        //２をランダムな位置にセットする
        let randomRow;
        let randomColumn;
        setField((prevField) => {
            for (let i = 0; i < 2; i++) {
                randomRow = Math.floor(Math.random() * 4)
                randomColumn = Math.floor(Math.random() * 4)
                prevField[randomRow][randomColumn] = 2
            }
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
        // newField.forEach((dy, dyIndex) => {
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

    //空いているマスにランダムに2のセルを生成する
    const createCell = () => {
        const newCell = judge();
        if (newCell.length > 0) {
            const randomNum = Math.floor(Math.random() * newCell.length);
            const [canPutY, canPutX] = newCell[randomNum];
            setField((prevField) => {
                prevField[canPutY][canPutX] = 2
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
        let canSlide = [];
        const newField = [...field];
        const cellPut = putCellCheck();
        cellPut.forEach(([y, x]) => {
            const upCheck = y - 1 >= 0;
            const downCheck = y + 1 < 4;
            const leftCheck = x - 1 >= 0;
            const rightCheck = x + 1 < 4;
            // console.log(upCheck);
            if (rightCheck && newField[y][x]) {
                if (e.key == "ArrowRight") {
                    setField((prevField) => {
                        const slideField = [...prevField]
                        const fieldNum = 4
                        rightMove(fieldNum, prevField)
                        return slideField
                    })
                }
            }
            if (leftCheck && newField[y][x]) {
                if (e.key == "ArrowLeft") {
                    setField((prevField) => {
                        const slideField = [...prevField]
                        const fieldNum = 4
                        leftMove(fieldNum, prevField)
                        return slideField
                    })
                }
            } if (upCheck && newField[y][x]) {
                if (e.key == "ArrowUp") {
                    setField((prevField) => {
                        const slideField = [...prevField]
                        const fieldNum = 4
                        upMove(fieldNum, prevField)
                        return slideField
                    })
                }
            } if (downCheck && newField[y][x]) {
                if (e.key == "ArrowDown") {
                    setField((prevField) => {
                        const slideField = [...prevField]
                        const fieldNum = 4
                        downMove(fieldNum, prevField)
                        return slideField
                    })
                }
            }
            cellArround.forEach((Arr) => {
                const [yArr, xArr] = Arr;
                let yNum = y + yArr;
                let xNum = x + xArr;
                while (outField(yNum, xNum)) {
                    //空白のマスじゃないなら処理終了
                    if (newField[yNum][xNum] > 0) {
                        break;
                    } else {
                        canSlide.push([yNum, xNum]);
                    }
                    yNum += yArr;
                    xNum += xArr;
                }
            })




        })
        return canSlide
    }

    const rightMove = (fieldNum, prevField) => {
        //フィールドの縦を調べる
        for (let i = 0; i < fieldNum; i++) {

            // 合体処理
            //右から左を見るようにする by:ChatGPT
            for (let j = fieldNum - 1; j > 0; j--) {
                //セルの値が0でないなら実行
                if (prevField[i][j] !== 0) {
                    //今いるセルの横座標から場外にでるまで繰り返し
                    for (let k = j - 1; k >= 0; k--) {
                        //繰り返している途中に別のセルがあるなら
                        if (prevField[i][k] !== 0) {
                            //今見ているセルと探索して見つけたセルが同じだったら処理
                            if (prevField[i][j] === prevField[i][k]) {
                                // 合体
                                prevField[i][j] *= 2;
                                prevField[i][k] = 0;
                            }
                            break;  // 合体したら終了
                        }
                    }
                }
            }

            // 空セルを右端に寄せる処理
            for (let j = fieldNum - 1; j > 0; j--) {
                //まず横座標の0を見つける
                if (prevField[i][j] === 0) {
                    //今探した0のセルの横座標から場外にでるまで繰り返し
                    for (let k = j - 1; k >= 0; k--) {
                        //右からセルの値が0にならないやつを探す
                        if (prevField[i][k] !== 0) {
                            // 右端に寄せる
                            prevField[i][j] = prevField[i][k];
                            prevField[i][k] = 0;
                            break;
                        }
                    }
                }
            }
        }
        return prevField
    }

    const leftMove = (fieldNum, prevField) => {
        //フィールドの縦を調べる
        for (let i = 0; i < fieldNum; i++) {

            // 合体処理
            //左から右を見るようにする by:ChatGPT
            for (let j = 0; j < fieldNum; j++) {
                //セルの値が0でないなら実行
                if (prevField[i][j] !== 0) {
                    //今いるセルの横座標から場外にでるまで繰り返し
                    for (let k = j + 1; k < fieldNum; k++) {
                        //繰り返している途中に別のセルがあるなら
                        if (prevField[i][k] !== 0) {
                            //今見ているセルと探索して見つけたセルが同じだったら処理
                            if (prevField[i][j] === prevField[i][k]) {
                                // 合体
                                prevField[i][j] *= 2;
                                prevField[i][k] = 0;
                            }
                            break;  // 合体したら終了
                        }
                    }
                }
            }

            // 空セルを左端に寄せる処理
            for (let j = 0; j < fieldNum; j++) {
                if (prevField[i][j] === 0) {
                    for (let k = j + 1; k < 4; k++) {
                        if (prevField[i][k] !== 0) {
                            // 左端に寄せる
                            prevField[i][j] = prevField[i][k];
                            prevField[i][k] = 0;
                            break;
                        }
                    }
                }
            }
        }
        return prevField
    }

    const upMove = (fieldNum, prevField) => {
        //フィールドの横を調べる
        for (let j = 0; j < fieldNum; j++) {

            // 合体処理
            //上から下を見るようにする by:ChatGPT
            for (let i = 0; i < fieldNum; i++) {
                //セルの値が0でないなら実行
                if (prevField[i][j] !== 0) {
                    //今いるセルの縦座標から場外にでるまで繰り返し
                    for (let k = i + 1; k < fieldNum; k++) {
                        //繰り返している途中に別のセルがあるなら
                        if (prevField[k][j] !== 0) {
                            //今見ているセルと探索して見つけたセルが同じだったら処理
                            if (prevField[i][j] === prevField[k][j]) {
                                // 合体
                                prevField[i][j] *= 2;
                                prevField[k][j] = 0;
                            }
                            break;  // 合体したら終了
                        }
                    }
                }
            }

            // 空セルを上端に寄せる処理
            for (let i = 0; i < fieldNum; i++) {
                if (prevField[i][j] === 0) {
                    for (let k = i + 1; k < 4; k++) {
                        if (prevField[k][j] !== 0) {
                            // 上端に寄せる
                            prevField[i][j] = prevField[k][j];
                            prevField[k][j] = 0;
                            break;
                        }
                    }
                }
            }
        }
        return prevField
    }

    const downMove = (fieldNum, prevField) => {
        //フィールドの横を調べる
        for (let j = 0; j < fieldNum; j++) {

            // 合体処理
            //下から上を見るようにする by:ChatGPT
            for (let i = fieldNum - 1; i >= 0; i--) {
                //セルの値が0でないなら実行
                if (prevField[i][j] !== 0) {
                    //今いるセルの縦座標から場外にでるまで繰り返し
                    for (let k = i - 1; k >= 0; k--) {
                        //繰り返している途中に別のセルがあるなら
                        if (prevField[k][j] !== 0) {
                            //今見ているセルと探索して見つけたセルが同じだったら処理
                            if (prevField[i][j] === prevField[k][j]) {
                                // 合体
                                prevField[i][j] *= 2;
                                prevField[k][j] = 0;
                            }
                            break;  // 合体したら終了
                        }
                    }
                }
            }

            // 空セルを上端に寄せる処理
            for (let i = fieldNum - 1; i >= 0; i--) {
                if (prevField[i][j] === 0) {
                    for (let k = i - 1; k >= 0; k--) {
                        if (prevField[k][j] !== 0) {
                            // 上端に寄せる
                            prevField[i][j] = prevField[k][j];
                            prevField[k][j] = 0;
                            break;
                        }
                    }
                }
            }
        }
        return prevField
    }


    useEffect(() => {
        document.addEventListener("keydown", Move,);
        createCell()  //by :chatGPT
        return () => {
            document.removeEventListener("keydown", Move)
        }

    }, [field])


    return { field }
}
