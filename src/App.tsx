import { useRef, useState } from "react";
import { Cell } from "./Cell";
import { CellEditor } from "./CellEditor";

const initialData: string[][] = Array(3).fill(Array(3).fill("Hello world!"));

export const App = () => {
  const [data, setData] = useState(initialData);
  const [editing, setEditing] = useState<{
    row: number;
    column: number;
  }>();

  const cellsRef = useRef<HTMLDivElement[][]>();
  if (!cellsRef.current) cellsRef.current = [];
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col">
        {data.map((row, i) => (
          <div key={i} className="flex">
            {row.map((value, j) => (
              <Cell
                key={j}
                rowIndex={i}
                columnIndex={j}
                setData={setData}
                setEditing={setEditing}
                cells={cellsRef.current!}
              >
                {!!editing && editing.row === i && editing.column === j && (
                  <CellEditor
                    rowIndex={i}
                    columnIndex={j}
                    initialVaule={value}
                    setData={setData}
                    setEditing={setEditing}
                    cells={cellsRef.current!}
                  />
                )}
                {value}
              </Cell>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
