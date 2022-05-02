import { useTranslation } from "react-i18next";

import { useBoolean } from "../../../hooks/useBoolean";
import { IconByName } from "../../Icon";
import { LinkWithIcon } from "./LinkWithIcon";
import { MainMenu } from "./MainMenu";
import { Logo } from "../../Logo";

export function Header() {
  const [isMenuOpen, , , , toggleMenu] = useBoolean(false);
  const { t } = useTranslation();

  return (
    <header>
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-2 px-4 sm:py-2">
          <div className="flex items-center justify-between flex-1 md:justify-center">
            <div className="mr-6">
              <Logo />
            </div>
            <div className="hidden mr-8 md:flex md:items-center">
              <LinkWithIcon
                href="https://www.facebook.com/8fall"
                icon="Facebook"
                className="mr-4"
              />
              <LinkWithIcon
                href="https://twitter.com/8Fall"
                icon="Twitter"
                className="mr-4"
              />
              <LinkWithIcon
                href="https://www.instagram.com/8fall/"
                icon="Instagram"
                className="mr-4"
              />
              <LinkWithIcon
                href="https://www.youtube.com/user/8fall"
                icon="YouTube"
                className="mr-4"
              />
            </div>
            <MainMenu isOpen={isMenuOpen} />
            <button
              className="p-2 rounded focus:outline-none lg:hidden"
              onClick={() => toggleMenu()}
              data-testid="menu-toggler"
              aria-label={t("menu")}
            >
              <IconByName
                name={isMenuOpen ? "Close" : "Menu"}
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
