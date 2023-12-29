export const rightMove = (fieldNum, prevField,marge,setIsMove) => {
    for (let i = 0; i < fieldNum; i++) {
        for (let j = fieldNum - 2; j >= 0; j--) {
            if (prevField[i][j] !== 0) {
                let k = j + 1;
                while (k < fieldNum && prevField[i][k] === 0) {
                    // 右に空セルがある限り移動
                    prevField[i][k] = prevField[i][k - 1];
                    prevField[i][k - 1] = 0;
                    k++;
                    setIsMove(true);
                }

                if (k < fieldNum && prevField[i][k] === prevField[i][j] && marge[i][j] == false) {
                    // 合体
                    prevField[i][k] *= 2;
                    prevField[i][j] = 0;
                    marge[i][j] = true
                    setIsMove(true);
                }
            }
        }
    }

    return prevField;
};

export const leftMove = (fieldNum, prevField,marge,setIsMove) => {
    for (let i = 0; i < fieldNum; i++) {
        for (let j = 1; j < fieldNum; j++) {
            if (prevField[i][j] !== 0) {
                let k = j - 1;
                while (k >= 0 && prevField[i][k] === 0) {
                    // 左に空セルがある限り移動
                    prevField[i][k] = prevField[i][k + 1];
                    prevField[i][k + 1] = 0;
                    k--;
                    setIsMove(true);
                }

                if (k >= 0 && prevField[i][k] === prevField[i][j] && marge[i][j] == false) {
                    // 合体
                    prevField[i][k] *= 2;
                    prevField[i][j] = 0;
                    marge[i][j] = true
                    setIsMove(true);
                }
            }
        }
    }

    return prevField;
};

export const upMove = (fieldNum, prevField,marge,setIsMove) => {
    for (let j = 0; j < fieldNum; j++) {
        for (let i = 1; i < fieldNum; i++) {
            if (prevField[i][j] !== 0) {
                let k = i - 1;
                while (k >= 0 && prevField[k][j] === 0) {
                    // 上に空セルがある限り移動
                    prevField[k][j] = prevField[k + 1][j];
                    prevField[k + 1][j] = 0;
                    k--;
                    setIsMove(true);
                }

                if (k >= 0 && prevField[k][j] === prevField[i][j] && marge[i][j] == false) {
                    // 合体
                    prevField[k][j] *= 2;
                    prevField[i][j] = 0;
                    marge[i][j] = true
                    setIsMove(true);
                }
            }
        }
    }

    return prevField;
};

export const downMove = (fieldNum, prevField,marge,setIsMove) => {
    for (let j = 0; j < fieldNum; j++) {
        for (let i = fieldNum - 2; i >= 0; i--) {
            if (prevField[i][j] !== 0) {
                let k = i + 1;
                while (k < fieldNum && prevField[k][j] === 0) {
                    // 下に空セルがある限り移動
                    prevField[k][j] = prevField[k - 1][j];
                    prevField[k - 1][j] = 0;
                    k++;
                    setIsMove(true);
                }

                if (k < fieldNum && prevField[k][j] === prevField[i][j] && marge[i][j] == false) {
                    // 合体
                    prevField[k][j] *= 2;
                    prevField[i][j] = 0;
                    marge[i][j] = true
                    setIsMove(true);
                }
            }
        }
    }

    return prevField;
};