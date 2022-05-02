import { Dispatch, SetStateAction, useRef, useState } from "react";
import { ComboboxCell } from "./ComboboxCell";

type Props = {
  values: string[][];
  setValues: Dispatch<SetStateAction<string[][]>>;
};

export const ComboboxGrid = ({ values, setValues }: Props) => {
  const [editing, setEditing] = useState<{
    rowIndex: number;
    columnIndex: number;
  }>();

  const cellsRef = useRef<HTMLDivElement[][]>();
  if (!cellsRef.current) cellsRef.current = [];

  return (
    <div className="flex flex-col">
      {values.map((row, i) => (
        <div key={i} className="flex">
          {row.map((value, j) => (
            <ComboboxCell
              key={j}
              rowIndex={i}
              columnIndex={j}
              value={value}
              setValues={setValues}
              isEditing={
                !!editing && editing.rowIndex === i && editing.columnIndex === j
              }
              setEditing={setEditing}
              cells={cellsRef.current!}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
