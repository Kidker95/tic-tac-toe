import { Cell } from "../Cell/Cell";
import "./Board.css";

type BoardProps = {
    cells: (string | null)[];
    onclick: (index: number) => void
};

export const Board: React.FC<BoardProps> = ({ cells, onclick }) =>  {

    const renderCell = (index: number) => {
        return <Cell value={cells[index]} onClick={() => onclick(index)}/>
    }
    return (
        <div className="Board">
            <div className="line">{renderCell(0)}{renderCell(1)}{renderCell(2)}</div>
            <div className="line">{renderCell(3)}{renderCell(4)}{renderCell(5)}</div>
            <div className="line">{renderCell(6)}{renderCell(7)}{renderCell(8)}</div>
        </div>
    );
}
