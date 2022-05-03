import { useTranslation } from "react-i18next";

import { useBoolean } from "../../../hooks/useBoolean";
import { IconByName } from "../../Icon";
import { LinkWithIcon } from "./LinkWithIcon";
import { MainMenu } from "./MainMenu";
import { Logo } from "../../Logo";
import { ConnectWallet } from "../../ConnectWallet";

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
                href="https://www.instagram.com/8fall/"
                icon="Instagram"
                className="mr-4"
              />
            </div>
            <MainMenu isOpen={isMenuOpen} />
            <ConnectWallet className="md:mr-8 lg:ml-8" />
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
