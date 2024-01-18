import { useEffect, useState } from 'react';
import './App.css';
import { useField } from './hooks/useField';
import { Cell } from './components/Cell/Cell';

function App() {
  const [isMove, setIsMove] = useState(false);
  const { field, Move, createCell, claerMessage, gameOverMessage, isClear } = useField(setIsMove);


  //フィールドの状態を見る
  useEffect(() => {
    //クリアしていないなら
    if (!isClear) {
      document.addEventListener("keydown", Move);
      return () => {
        document.removeEventListener("keydown", Move)
      }
    }

  }, [field, isClear])

  useEffect(() => {
    if (isMove) {
      createCell()
      setIsMove(false)
    }
  }, [isMove])
  return (
    <>
      <div className='title'>2048</div>
      <div className='frame'>
        <div className="board">
          {field.map((y, yIndex) => {
            return y.map((x, xIndex) => {
              return <Cell x={x} field={field} yIndex={yIndex} xIndex={xIndex} />
            })
          })}
        </div>
      </div>
      {claerMessage && <div className='clear'>{claerMessage}</div>}
      {gameOverMessage && <div className='game-over'>{gameOverMessage}</div>}
    </>
  );
}

export default App;