export const rightMove = (fieldNum, prevField, marge, setIsMove, initMarge, setMarge) => {
    for (let i = 0; i < fieldNum; i++) {
        for (let j = fieldNum - 1; j >= 0; j--) {
            if (prevField[i][j] !== 0) {
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
    for (let i = 0; i < fieldNum; i++) {
        for (let j = fieldNum - 1; j >= 0; j--) {
            let k = j - 1;
            while (k >= 0) {
                // 合体
                if (prevField[i][k] === prevField[i][j]) {
                    console.log(prevField[i][k + 1]);
                    //同じ値のセルの間に別の値セルがあった場合の処理
                    if (prevField[i][k + 1] !== prevField[i][k] && prevField[i][k + 1] !== 0) {
                        break;
                    }
                    if (marge[i][j] !== true) {
                        if (marge[i][j - 1] !== true) {
                            prevField[i][j] *= 2;
                            prevField[i][k] = 0;
                            marge[i][j] = true
                            setIsMove(true);
                        }
                    }
                }
                k--;
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
    for (let i = 0; i < fieldNum; i++) {
        for (let j = 0; j < fieldNum; j++) {
            let k = j + 1;
            while (k < 4) {
                // 合体
                if (prevField[i][k] === prevField[i][j]) {
                    //同じ値のセルの間に別の値セルがあった場合の処理
                    if (prevField[i][k - 1] !== prevField[i][k] && prevField[i][k - 1] !== 0) {
                        break;
                    }
                    if (marge[i][j] !== true) {
                        if (marge[i][j + 1] !== true) {
                            prevField[i][j] *= 2;
                            prevField[i][k] = 0;
                            marge[i][j] = true;
                            j = k;
                            setIsMove(true);
                        }
                    }
                }
                k++;
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
    for (let j = 0; j < fieldNum; j++) {
        for (let i = 0; i < fieldNum; i++) {
            let k = i + 1;
            while (k < 4) {
                // 合体
                if (prevField[k][j] === prevField[i][j]) {
                    //同じ値のセルの間に別の値セルがあった場合の処理
                    if (prevField[k - 1][j] !== prevField[k][j] && prevField[k - 1][j] !== 0) {
                        break;
                    }
                    if (marge[i] && marge[i][j] !== true) {
                        if (marge[i + 1] && marge[i + 1][j] !== true) {
                            prevField[i][j] *= 2;
                            prevField[k][j] = 0;
                            marge[i][j] = true;
                            i = k;
                            setIsMove(true);
                        }
                    }
                }
                k++;
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
    for (let j = 0; j < fieldNum; j++) {
        for (let i = fieldNum - 1; i >= 0; i--) {
            let k = i - 1;
            while (k >= 0) {
                // 合体
                if (prevField[k][j] === prevField[i][j]) {
                    //同じ値のセルの間に別の値セルがあった場合の処理
                    if (prevField[k + 1][j] !== prevField[k][j] && prevField[k + 1][j] !== 0) {
                        break;
                    }
                    if (marge[i] && marge[i][j] !== true) {
                        if (marge[i - 1] && marge[i - 1][j] !== true) {
                            prevField[i][j] *= 2;
                            prevField[k][j] = 0;
                            marge[i][j] = true;
                            i = k;
                            setIsMove(true);
                        }
                    }
                }
                k--;
            }
        }
    }
    setMarge(initMarge.map(row => [...row]));  // 新しい配列を生成してセット
    console.log(marge);
    return [...prevField];
};