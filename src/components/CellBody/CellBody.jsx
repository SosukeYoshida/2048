import "./CellBody.css"

export const CellBody = ({ field, yIndex, xIndex }) => {

    return (
        <>
            <div className={`body ${field[yIndex][xIndex] >= 2 ? "x2" : ""}  ${field[yIndex][xIndex] >= 4 ? "x4" : ""}
             ${field[yIndex][xIndex] >= 8 ? "x8" : ""} ${field[yIndex][xIndex] >= 16 ? "x16" : ""}  ${field[yIndex][xIndex] >= 32 ? "x32" : ""}
             ${field[yIndex][xIndex] >= 64 ? "x64" : ""}`}>{field[yIndex][xIndex]}</div>
        </>
    )

}