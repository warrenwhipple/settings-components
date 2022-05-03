import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  MouseEventHandler,
  SetStateAction,
  useMemo,
  useRef,
} from "react";
import { ChevronDownSolidIcon } from "../icons";
import { keyCategories } from "../keyCategories";
import { ComboboxCellEditor } from "./ComboboxCellEditor";

type Props = {
  rowIndex: number;
  columnIndex: number;
  value: string;
  setValues: Dispatch<SetStateAction<string[][]>>;
  isEditing: boolean;
  setEditing: Dispatch<
    SetStateAction<{ rowIndex: number; columnIndex: number } | undefined>
  >;
  cells: HTMLDivElement[][];
};

export const ComboboxCell = ({
  rowIndex,
  columnIndex,
  value,
  setValues,
  isEditing,
  setEditing,
  cells,
}: Props) => {
  if (!cells[rowIndex]) cells[rowIndex] = [];

  const cellRef = useRef<HTMLDivElement>();
  const initialInputRef = useRef<string | null>(null);

  const { divProps, buttonOnClick } = useMemo<{
    divProps: Partial<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >;
    buttonOnClick: MouseEventHandler<HTMLButtonElement>;
  }>(
    () => ({
      divProps: {
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
        onKeyDown: (e) => {
          const { key } = e;
          switch (key) {
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
              initialInputRef.current = null;
              setEditing({ rowIndex, columnIndex });
              return;
            }
            case "Backspace":
            case "Delete": {
              setValues((prev) => {
                if (prev[rowIndex][columnIndex] === "") return prev;
                const data = prev.slice();
                data[rowIndex] = prev[rowIndex].slice();
                data[rowIndex][columnIndex] = "";
                return data;
              });
              return;
            }
          }
          if (key === " " || !keyCategories[key]) {
            initialInputRef.current = "";
            setEditing({ rowIndex, columnIndex });
          }
        },
      },
      buttonOnClick: () => {
        initialInputRef.current = null;
        setEditing({ rowIndex, columnIndex });
      },
    }),
    [rowIndex, columnIndex, cells, setValues, setEditing]
  );

  return (
    <div
      tabIndex={0}
      className="relative w-32 cursor-pointer hover:ring-1 hover:ring-slate-300 focus:z-10 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
      ref={divProps.ref}
      onKeyDown={isEditing ? undefined : divProps.onKeyDown}
    >
      <div className="flex">
        <div className="flex-1 p-1">{value}</div>
        <button
          className="m-1 rounded-md text-slate-300 hover:bg-slate-400 hover:text-white"
          tabIndex={-1}
          onClick={buttonOnClick}
        >
          <ChevronDownSolidIcon className="h-6 w-6" />
        </button>
      </div>
      {isEditing && (
        <ComboboxCellEditor
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          selectedValue={value}
          initialInputValue={initialInputRef.current}
          setValues={setValues}
          setEditing={setEditing}
          cells={cells}
        />
      )}
    </div>
  );
};
