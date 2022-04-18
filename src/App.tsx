import { useRef, useState } from "react";
import { Cell, CellsContext } from "./Cell";

const initialData: string[][] = Array(3).fill(Array(3).fill("Hello world!"));

export const App = () => {
  const [data, setData] = useState(initialData);

  const cellsRef = useRef<HTMLDivElement[][]>();
  if (!cellsRef.current) cellsRef.current = [];

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col">
        <CellsContext.Provider value={cellsRef.current}>
          {data.map((row, i) => (
            <div key={i} className="flex">
              {row.map((value, j) => (
                <Cell key={j} rowIndex={i} columnIndex={j} setData={setData}>
                  {value}
                </Cell>
              ))}
            </div>
          ))}
        </CellsContext.Provider>
      </div>
    </div>
  );
};
