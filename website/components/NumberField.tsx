import classNames from "classnames";
import { useEffect, useState } from "react";

import { WithOptionalClassName } from "../utils/types";

interface Props extends WithOptionalClassName {
  onChange: (value: number) => void;
  initialValue?: number;
}
export function NumberField({ initialValue = 1, className, onChange }: Props) {
  const [amount, setAmount] = useState(initialValue);

  useEffect(() => {
    onChange(amount);
  }, [amount]);

  function handleDecrement() {
    if (amount <= 1) return;
    setAmount(amount - 1);
  }

  function handleIncrement() {
    if (amount >= 5) return;
    setAmount(amount + 1);
  }

  return (
    <div className={classNames("flex justify-center", className)}>
      <button
        className="rounded-lg bg-sky-600 px-4 py-2 font-bold text-white"
        onClick={handleDecrement}
        data-testid="Decrement"
      >
        -
      </button>
      <div className="flex items-center justify-center px-4 font-bold w-10">
        {amount}
      </div>
      <button
        className="rounded-lg bg-sky-600 px-4 py-2 font-bold text-white"
        onClick={handleIncrement}
        data-testid="Increment"
      >
        +
      </button>
    </div>
  );
}
