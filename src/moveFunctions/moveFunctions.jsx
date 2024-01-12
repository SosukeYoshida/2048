export const rightMove = (fieldNum, prevField, marge, setIsMove, initMarge, setMarge) => {
    for (let i = 0; i < fieldNum; i++) {
        for (let j = fieldNum - 1; j >= 0; j--) {
            if (prevField[i][j] !== 0) {
                let k = j - 1;
                while (k >= 0 && prevField[i][k] === prevField[i][j]) {
                    // 合体
                    if (marge[i][j] !== true) {
                        if (marge[i][j - 1] !== true && marge[i][j - 2] !== true) {
                            console.log(i, j);
                            prevField[i][j] *= 2;
                            prevField[i][k] = 0;
                            marge[i][j] = true
                            marge[i][j - 1] = true
                            j = k;
                            setIsMove(true);
                        }
                    }
                    k--;
                }
                let l = j + 1;
                while (l < 4 && prevField[i][l] === 0) {
                    //     // 右に空セルがある限り移動
                    prevField[i][l] = prevField[i][j];
                    prevField[i][j] = 0;
                    l++;
                    setIsMove(true);
                }
            }
        }
    }
    console.log(marge);
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
                    if (marge[i][j] !== true) {
                        if (marge[i][j + 1] !== true && marge[i][j + 2] !== true) {
                            prevField[i][j] *= 2;
                            prevField[i][k] = 0;
                            marge[i][j] = true;
                            marge[i][j + 1] = true;
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
                //今調べている値と下方向にある値の２倍があるときに先に合体判定をtrue
                //そして一致する配列の上の値が今調べているのと同じなら合体判定をfalse
                //例
                // [8, 0, 0, 0],   [8, 0, 0, 0],
                // [8, 0, 0, 0],   [0, 0, 0, 0],
                // [4, 0, 0, 0],   [4, 0, 0, 0],
                // [4, 0, 0, 0],   [4, 0, 0, 0],  のときに動作する
                for (let m = 0; m < 4; m++) {
                    if (m + 1 < 4 && prevField[i][j] === prevField[m][j] * 2 && prevField[i][j] === prevField[m + 1][j] * 2) {
                        marge[i][j] = true;
                        if (m + 1 < 4 && prevField[i][j] === prevField[m - 1][j]) {
                            marge[i][j] = false;
                        }
                    }
                }
                let k = i + 1;
                while (k < 4 && prevField[k][j] === prevField[i][j]) {
                    // 合体
                    if (marge[i] && marge[i][j] !== true) {
                        if (marge[i + 1] && marge[i + 1][j] !== true) {
                            prevField[i][j] *= 2;
                            prevField[k][j] = 0;
                            marge[i][j] = true;
                            marge[i + 1][j] = true;
                            i = k;
                            setIsMove(true);
                        }
                    }
                    k++;
                }
                let l = i - 1;
                while (l >= 0 && prevField[l][j] === 0) {
                    //     // 上に空セルがある限り移動
                    prevField[l][j] = prevField[l + 1][j];
                    prevField[l + 1][j] = 0;
                    l--;
                    setIsMove(true);
                }
            }
        }
    }
    setMarge(initMarge.map(row => [...row]));  // 新しい配列を生成してセット
    return [...prevField];
};

export const downMove = (fieldNum, prevField, marge, setIsMove, initMarge, setMarge) => {
    for (let j = 0; j < fieldNum; j++) {
        for (let i = fieldNum - 1; i >= 0; i--) {
            if (prevField[i][j] !== 0) {
                //今調べている値と下方向にある値の２倍があるときに先に合体判定をtrue
                //そして一致する配列の上の値が今調べているのと同じなら合体判定をfalse
                //例
                // [4, 0, 0, 0],   [4, 0, 0, 0],
                // [4, 0, 0, 0],   [4, 0, 0, 0],
                // [8, 0, 0, 0],   [0, 0, 0, 0],
                // [8, 0, 0, 0],   [8, 0, 0, 0],  のときに動作する
                for (let m = 3; m >= 0; m--) {
                    if (m - 1 >= 0 && prevField[i][j] === prevField[m][j] * 2 && prevField[i][j] === prevField[m - 1][j] * 2) {
                        marge[i][j] = true;
                        if (m - 1 >= 0 && prevField[i][j] === prevField[m + 1][j]) {
                            marge[i][j] = false;
                        }
                    }
                }
                let k = i - 1;
                while (k >= 0 && prevField[k][j] === prevField[i][j]) {
                    // 合体
                    if (marge[i] && marge[i][j] !== true) {
                        if (marge[i - 1] && marge[i - 1][j] !== true) {
                            prevField[i][j] *= 2;
                            prevField[k][j] = 0;
                            marge[i][j] = true;
                            i = k;
                            setIsMove(true);
                        }
                    }
                    k--;
                }
                let l = i + 1;
                while (l < 4 && prevField[l][j] === 0) {
                    //     // 下に空セルがある限り移動
                    prevField[l][j] = prevField[l - 1][j];
                    prevField[l - 1][j] = 0;
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