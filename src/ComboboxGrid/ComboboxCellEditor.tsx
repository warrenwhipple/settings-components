import { Combobox } from "@headlessui/react";
import {
  Dispatch,
  Fragment,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
  FocusEvent,
} from "react";

const options = [
  "alpha",
  "beta",
  "gamma",
  "delta",
  "epsilon",
  "zeta",
  "eta",
  "theta",
  "iota",
  "kappa",
  "lambda",
  "mu",
  "nu",
  "xi",
  "omicron",
  "pi",
  "rho",
  "sigma",
  "tau",
  "upsilon",
  "phi",
  "chi",
  "psi",
  "omega",
];

type Props = {
  rowIndex: number;
  columnIndex: number;
  selectedValue: string;
  initialInputValue: string | null;
  setValues: Dispatch<SetStateAction<string[][]>>;
  setEditing: Dispatch<
    SetStateAction<{ rowIndex: number; columnIndex: number } | undefined>
  >;
  cells: HTMLDivElement[][];
};

export const ComboboxCellEditor = ({
  rowIndex,
  columnIndex,
  selectedValue,
  initialInputValue,
  setValues,
  setEditing,
  cells,
}: Props) => {
  const [inputValue, setInputValue] = useState(
    initialInputValue ?? selectedValue
  );
  const didEditRef = useRef(initialInputValue !== null);
  const didCompleteRef = useRef(false);

  const filteredOptions =
    !didEditRef.current || inputValue === ""
      ? options
      : options.filter((option) =>
          option.toLowerCase().includes(inputValue.toLowerCase())
        );

  return (
    <Combobox
      value={selectedValue}
      onChange={(commitValue) => {
        didCompleteRef.current = true;
        setValues((prev) => {
          if (prev[rowIndex][columnIndex] === commitValue) return prev;
          const values = prev.slice();
          values[rowIndex] = prev[rowIndex].slice();
          values[rowIndex][columnIndex] = commitValue;
          return values;
        });
        setEditing(undefined);
      }}
    >
      <Combobox.Input
        className="absolute top-0 right-0 bottom-0 left-0 z-20 block w-32 p-1 ring ring-cyan-500 focus:outline-none"
        autoFocus
        value={inputValue}
        onChange={(e) => {
          didEditRef.current = true;
          const value = e.target.value;
          setInputValue(value);
        }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          e.stopPropagation();
          switch (e.key) {
            case "Enter": {
            }
          }
        }}
        onBlur={(e: FocusEvent<HTMLInputElement>) => {
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
      <Combobox.Options
        className="absolute top-full z-10 w-full border border-slate-300 bg-white pt-0.5 shadow-xl"
        static
      >
        {filteredOptions.map((option) => (
          <Combobox.Option as={Fragment} key={option} value={option}>
            {({ active, selected }) => (
              <li
                className={`px-1 py-0.5 ${active ? "bg-slate-100" : ""} ${
                  selected ? "bg-cyan-500 text-white" : ""
                }`}
              >
                {option}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
  return (
    <input
      onKeyDown={(e) => {
        e.stopPropagation();
        switch (e.key) {
          case "Enter": {
            e.preventDefault();
            const commitValue = e.currentTarget.value;
            setValues((prev) => {
              if (prev[rowIndex][columnIndex] === commitValue) return prev;
              const values = prev.slice();
              values[rowIndex] = prev[rowIndex].slice();
              values[rowIndex][columnIndex] = commitValue;
              return values;
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
    />
  );
};
