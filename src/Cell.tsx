import {
  createContext,
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useRef,
} from "react";

export const CellsContext = createContext<HTMLDivElement[][]>([]);

export const Cell = ({
  rowIndex,
  columnIndex,
  setData,
  children,
}: {
  rowIndex: number;
  columnIndex: number;
  setData: Dispatch<SetStateAction<string[][]>>;
  children: ReactNode;
}) => {
  const cells = useContext(CellsContext);
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
        }
      },
    }),
    [rowIndex, columnIndex, cells]
  );

  return (
    <div
      tabIndex={0}
      className="cursor-pointer focus:outline-none focus:ring focus:ring-cyan-500 hover:ring-1 hover:ring-slate-400 p-1"
      {...cellProps}
    >
      {children}
    </div>
  );
};
