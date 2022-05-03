import classNames from "classnames";
import { WithChildren, WithOptionalClassName } from "../utils/types";

interface Props extends WithOptionalClassName, WithChildren {
  onClick: () => void;
  style?: "primary" | "secondary";
  transparent?: boolean;
}

export function Button({
  children,
  className,
  style = "primary",
  transparent,
  onClick,
}: Props) {
  const isPrimaryStyle = style === "primary";
  const isSecondaryStyle = style === "secondary";

  return (
    <button
      className={classNames(
        {
          "bg-sky-600": isPrimaryStyle,
          "bg-pink-600": isSecondaryStyle,
        },
        {
          "border-sky-600 bg-transparent border-2 text-sky-600":
            transparent && isPrimaryStyle,
          "border-pink-600 bg-transparent border-2 text-pink-600":
            transparent && isSecondaryStyle,
        },
        "transition ease-in-out delay-150 rounded-lg text-title uppercase tracking-wider	px-6 py-2 hover:-translate-y-1 hover:scale-110 hover:opacity-90 duration-300",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
