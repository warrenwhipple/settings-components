import { useState } from "react";
import { InputGrid } from "./InputGrid/InputGrid";

const initialData: string[][] = [
  ["alpha", "beta", "gamma"],
  ["delta", "epsilon", "zeta"],
  ["eta", "theta", "iota"],
];

export const App = () => {
  const [values, setValues] = useState(initialData);

  return (
    <div className="h-screen flex justify-center items-center">
      <InputGrid values={values} setValues={setValues} />
    </div>
  );
};
