import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  useMemo,
  useRef,
} from "react";

type Props = {
  rowIndex: number;
  columnIndex: number;
  setData: Dispatch<SetStateAction<string[][]>>;
  setEditing: Dispatch<
    SetStateAction<{ row: number; column: number } | undefined>
  >;
  cells: HTMLDivElement[][];
  children: ReactNode;
};

export const Cell = ({
  rowIndex,
  columnIndex,
  setData,
  setEditing,
  cells,
  children,
}: Props) => {
  if (!cells[rowIndex]) cells[rowIndex] = [];

  const cellRef = useRef<HTMLDivElement>();

  const cellProps = useMemo<
    Partial<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>
  >(
    () => ({
      ref: (el) => {
        if (el) {
          cellRef.current = el;
          cells[rowIndex][columnIndex] = el;
        } else if (
          cellRef.current &&
          cellRef.current === cells[rowIndex][columnIndex]
        ) {
          delete cells[rowIndex][columnIndex];
        }
      },
      onClick: (e) => {},
      onKeyDown: (e) => {
        switch (e.key) {
          case "ArrowUp": {
            cells[rowIndex - 1]?.[columnIndex]?.focus();
            return;
          }
          case "ArrowDown": {
            cells[rowIndex + 1]?.[columnIndex]?.focus();
            return;
          }
          case "ArrowLeft": {
            cells[rowIndex]?.[columnIndex - 1]?.focus();
            return;
          }
          case "ArrowRight": {
            cells[rowIndex]?.[columnIndex + 1]?.focus();
            return;
          }
          case "Enter": {
            setEditing({ row: rowIndex, column: columnIndex });
            return;
          }
          case "Backspace":
          case "Delete": {
            setData((prev) => {
              if (prev[rowIndex][columnIndex] === "") return prev;
              const data = prev.slice();
              data[rowIndex] = prev[rowIndex].slice();
              data[rowIndex][columnIndex] = "";
              return data;
            });
            return;
          }
        }
      },
    }),
    [rowIndex, columnIndex, cells, setData, setEditing]
  );

  return (
    <div
      tabIndex={0}
      className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:ring-1 hover:ring-slate-300 p-1 w-32 relative"
      {...cellProps}
    >
      {children}
    </div>
  );
};
