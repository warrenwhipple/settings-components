import { useRef, useState } from "react";
import { Cell } from "./Cell";

const initialData: string[][] = [
  ["alpha", "beta", "gamma"],
  ["delta", "epsilon", "zeta"],
  ["eta", "theta", "iota"],
];

export const App = () => {
  const [values, setValues] = useState(initialData);
  const [editing, setEditing] = useState<{
    row: number;
    column: number;
  }>();

  const cellsRef = useRef<HTMLDivElement[][]>();
  if (!cellsRef.current) cellsRef.current = [];

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col">
        {values.map((row, i) => (
          <div key={i} className="flex">
            {row.map((value, j) => (
              <Cell
                key={j}
                rowIndex={i}
                columnIndex={j}
                value={value}
                setValues={setValues}
                isEditing={
                  !!editing && editing.row === i && editing.column === j
                }
                setEditing={setEditing}
                cells={cellsRef.current!}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
