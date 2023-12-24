import { useEffect } from 'react';
import './App.css';
import { useField } from './hooks/useField';
import { Cell } from './components/Cell/Cell';

function App() {
  const { field } = useField()


  //フィールドの状態を見る
  // useEffect(() => {
  // }, [field]);

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
    </>
  );
}

export default App;
