import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

import { MenuItem } from "./MenuItem";

export interface Props {
  isOpen: boolean;
}

export function MainMenu({ isOpen }: Props) {
  const { t } = useTranslation();
  const classList = useMemo(
    () =>
      classNames(
        { "open block": isOpen, "closed hidden lg:block": !isOpen },
        "z-10 top-0 left-0 absolute w-1/2 lg:static lg:w-auto",
        "h-full lg:h-auto"
      ),
    [isOpen]
  );

  return (
    <nav className={classList}>
      <ul
        className={classNames(
          "flex flex-wrap justify-start",
          "max-w-xl mx-auto lg:max-w-full",
          "flex-col lg:flex-row",
          "bg-black lg:bg-transparent",
          "h-full lg:h-auto",
          "py-2 pl-2 lg:py-0 lg:pl-4"
        )}
      >
        <li className="m-2 lg:mx-1 xl:my-2 xl:mr-4 xl:ml-0 w">
          <MenuItem href="/gallery" text={t("menu.gallery")} />
        </li>
        <li className="m-2 lg:mx-1 xl:my-2 xl:mr-4 xl:ml-0">
          <MenuItem href="/roadmap" text={t("menu.roadMap")} />
        </li>
        <li className="m-2 lg:mx-1 xl:my-2 xl:mr-4 xl:ml-0">
          <MenuItem href="/team" text={t("menu.team")} />
        </li>
        <li className="m-2 lg:mx-1 xl:my-2 xl:mr-4 xl:ml-0">
          <MenuItem href="/buy" text={t("menu.buy")} />
        </li>
      </ul>
    </nav>
  );
}
