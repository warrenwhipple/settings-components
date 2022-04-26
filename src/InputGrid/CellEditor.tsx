import React, { Dispatch, SetStateAction, useRef, useState } from "react";

type Props = {
  rowIndex: number;
  columnIndex: number;
  initialInputValue: string;
  setValues: Dispatch<SetStateAction<string[][]>>;
  setEditing: Dispatch<
    SetStateAction<{ rowIndex: number; columnIndex: number } | undefined>
  >;
  cells: HTMLDivElement[][];
};

export const CellEditor = ({
  rowIndex,
  columnIndex,
  initialInputValue,
  setValues,
  setEditing,
  cells,
}: Props) => {
  const [inputValue, setInputValue] = useState(initialInputValue);
  const didCompleteRef = useRef(false);
  return (
    <input
      className="focus:outline-none block absolute top-0 right-0 bottom-0 left-0 p-1 w-32 ring ring-cyan-500 shadow-xl"
      autoFocus
      value={inputValue}
      onChange={(e) => {
        const value = e.target.value;
        setInputValue(value);
      }}
      onKeyDown={(e) => {
        e.stopPropagation();
        switch (e.key) {
          case "Enter": {
            e.preventDefault();
            const commitValue = e.currentTarget.value;
            setValues((prev) => {
              if (prev[rowIndex][columnIndex] === commitValue) return prev;
              const data = prev.slice();
              data[rowIndex] = prev[rowIndex].slice();
              data[rowIndex][columnIndex] = commitValue;
              return data;
            });
            setEditing(undefined);
            didCompleteRef.current = true;
            const nextCell = cells[rowIndex + 1]?.[columnIndex];
            if (nextCell) nextCell.focus();
            else cells[rowIndex]?.[columnIndex]?.focus();
            return;
          }
          case "Escape": {
            e.preventDefault();
            setEditing(undefined);
            didCompleteRef.current = true;
            cells[rowIndex]?.[columnIndex]?.focus();
            return;
          }
        }
      }}
      onBlur={(e) => {
        if (didCompleteRef.current) return;
        const commitValue = e.currentTarget.value;
        setValues((prev) => {
          if (prev[rowIndex][columnIndex] === commitValue) return prev;
          const data = prev.slice();
          data[rowIndex] = prev[rowIndex].slice();
          data[rowIndex][columnIndex] = commitValue;
          return data;
        });
        setEditing(undefined);
        didCompleteRef.current = true;
      }}
    />
  );
};
