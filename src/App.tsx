import {
  createContext,
  KeyboardEventHandler,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

const CellsContext = createContext<HTMLSpanElement[][]>([]);

const Cell = ({
  rowIndex,
  columnIndex,
  children,
}: {
  rowIndex: number;
  columnIndex: number;
  children: ReactNode;
}) => {
  const cells = useContext(CellsContext);
  if (!cells[rowIndex]) cells[rowIndex] = [];

  const callbackRef = useCallback(
    (el: HTMLSpanElement | null) => {
      if (el) cells[rowIndex][columnIndex] = el;
      else delete cells[rowIndex][columnIndex];
    },
    [rowIndex, columnIndex, cells]
  );

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLSpanElement>>(
    (e) => {
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
    [rowIndex, columnIndex, cells]
  );

  return (
    <span
      ref={callbackRef}
      tabIndex={0}
      className="border-2"
      onKeyDown={onKeyDown}
    >
      {children}
    </span>
  );
};

const rows = [0, 1, 2];
const columns = [0, 1, 2];

export const App = () => {
  const [value, setValue] = useState("Hello world!");

  const cellsRef = useRef<HTMLSpanElement[][]>();
  if (!cellsRef.current) cellsRef.current = [];

  return (
    <div className="p-4">
      <div>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
      <CellsContext.Provider value={cellsRef.current}>
        {rows.map((i) => (
          <div key={i}>
            {columns.map((j) => (
              <Cell key={j} rowIndex={i} columnIndex={j}>
                {value}
              </Cell>
            ))}
          </div>
        ))}
      </CellsContext.Provider>
    </div>
  );
};
