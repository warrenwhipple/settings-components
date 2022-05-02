import { useState } from "react";
import { InputGrid } from "./InputGrid/InputGrid";
import { ComboboxGrid } from "./ComboboxGrid/ComboboxGrid";

const initialData: string[][] = [
  ["alpha", "beta", "gamma"],
  ["delta", "epsilon", "zeta"],
  ["eta", "theta", "iota"],
];

export const App = () => {
  const [values, setValues] = useState(initialData);

  return (
    <div className="flex h-screen flex-col items-center justify-evenly">
      <InputGrid values={values} setValues={setValues} />
      <ComboboxGrid values={values} setValues={setValues} />
    </div>
  );
};
