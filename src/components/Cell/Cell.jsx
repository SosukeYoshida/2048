import "./Cell.css"
import { CellBody } from "../CellBody/CellBody"
import { useEffect } from "react"

export const Cell = ({ x, field, yIndex, xIndex }) => {
    // console.log(field[yIndex][xIndex]);
    return (
        <>
            <div className="cell">
                {field[yIndex][xIndex] > 0 &&
                    < CellBody field={field} yIndex={yIndex} xIndex={xIndex}></CellBody>
                }
            </div >
        </>
    )

}