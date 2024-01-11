export const rightMove = (fieldNum, prevField, marge, setIsMove, initMarge, setMarge) => {
    for (let i = 0; i < fieldNum; i++) {
        for (let j = fieldNum - 1; j >= 0; j--) {
            if (prevField[i][j] !== 0) {
                let k = j - 1;
                while (k >= 0 && prevField[i][k] === prevField[i][j]) {
                    // 合体
                    if (marge[i][k] !== true) {
                        if (marge[i][k - 1] !== true) {
                            prevField[i][j] *= 2;
                            prevField[i][k] = 0;
                            marge[i][k] = true
                            console.log(i, k);
                            j = k;
                            setIsMove(true);
                        }
                    }
                    k--;
                }
                let l = j + 1;
                while (l < 4 && prevField[i][l] === 0) {
                    //     // 右に空セルがある限り移動
                    console.log(i, j);
                    prevField[i][l] = prevField[i][j];
                    prevField[i][j] = 0;
                    l++;
                    setIsMove(true);
                }
            }
        }
    }
    setMarge(initMarge.map(row => [...row]));  // 新しい配列を生成してセット
    return [...prevField];
};

export const leftMove = (fieldNum, prevField, marge, setIsMove, initMarge, setMarge) => {
    for (let i = 0; i < fieldNum; i++) {
        for (let j = 0; j < fieldNum; j++) {
            if (prevField[i][j] !== 0) {
                let k = j + 1;

                while (k < 4 && prevField[i][k] === prevField[i][j]) {
                    // 合体
                    if (marge[i][k] !== true) {
                        if (marge[i][k + 1] !== true) {
                            marge[i][k] = true
                            prevField[i][j] *= 2;
                            prevField[i][k] = 0;
                            console.log(i, k);
                            j = k;
                            setIsMove(true);
                        }
                    }
                    k++;
                }
                let l = j - 1;
                while (l >= 0 && prevField[i][l] === 0) {
                    //     // 左に空セルがある限り移動
                    prevField[i][l] = prevField[i][j];
                    prevField[i][j] = 0;

                    l--;
                    setIsMove(true);
                }
            }
        }
    }
    setMarge(initMarge.map(row => [...row]));  // 新しい配列を生成してセット
    return [...prevField];
};

export const upMove = (fieldNum, prevField, marge, setIsMove, initMarge, setMarge) => {
    for (let j = 0; j < fieldNum; j++) {
        for (let i = 0; i < fieldNum; i++) {
            if (prevField[i][j] !== 0) {
                let k = i + 1;
                while (k < 4 && prevField[k][j] === prevField[i][j]) {
                    // 合体
                    console.log(k + 1);
                    if (marge[k] && marge[k][j] !== true) {
                        if (marge[k + 1] && marge[k + 1][j] !== true) {
                            console.log(k + 1);
                            marge[k][j] = true
                            prevField[i][j] *= 2;
                            // prevField[k][j] = 0;
                            i = k;
                            setIsMove(true);
                        } else {
                            console.log("条件処理がスキップされました。");
                        }
                    }
                    k++;
                }
                let l = i - 1;
                while (l >= 0 && prevField[l][j] === 0) {
                    //     // 上に空セルがある限り移動
                    prevField[l][j] = prevField[i][j];
                    prevField[i][j] = 0;
                    l--;
                    setIsMove(true);
                }
            }
        }
    }
    setMarge(initMarge.map(row => [...row]));  // 新しい配列を生成してセット
    console.log(marge);
    return [...prevField];
};

export const downMove = (fieldNum, prevField, marge, setIsMove, initMarge, setMarge) => {
    // for (let j = 0; j < fieldNum; j++) {
    //     for (let i = fieldNum - 2; i >= 0; i--) {
    //         if (prevField[i][j] !== 0) {
    //             let k = i + 1;
    //             while (k < fieldNum && prevField[k][j] === 0) {
    //                 // 下に空セルがある限り移動
    //                 prevField[k][j] = prevField[k - 1][j];
    //                 prevField[k - 1][j] = 0;
    //                 k++;
    //                 setIsMove(true);
    //             }

    //             if (k < fieldNum && prevField[k][j] === prevField[i][j] && marge[i][j] == false) {
    //                 // 合体
    //                 prevField[k][j] *= 2;
    //                 prevField[i][j] = 0;
    //                 marge[i][j] = true
    //                 setIsMove(true);
    //             }
    //         }
    //     }
    // }

    // return prevField;
    for (let j = 0; j < fieldNum; j++) {
        for (let i = fieldNum - 1; i >= 0; i--) {
            if (prevField[i][j] !== 0) {
                let k = i - 1;
                while (k >= 0 && prevField[k][j] === prevField[i][j]) {
                    // 合体
                    console.log(k, j);
                    if (marge[k] && marge[k][j] !== true) {
                        if (marge[1][j] !== true) {
                            marge[k][j] = true
                            prevField[i][j] *= 2;
                            prevField[k][j] = 0;
                            i = k;
                            setIsMove(true);
                        } else {
                            console.log("条件処理がスキップされました。");
                        }
                    }
                    k--;
                }
                let l = i + 1;
                while (l < 4 && prevField[l][j] === 0) {
                    //     // 下に空セルがある限り移動
                    prevField[l][j] = prevField[i][j];
                    prevField[i][j] = 0;
                    l++;
                    setIsMove(true);
                }
            }
        }
    }
    setMarge(initMarge.map(row => [...row]));  // 新しい配列を生成してセット
    console.log(marge);
    return [...prevField];
};