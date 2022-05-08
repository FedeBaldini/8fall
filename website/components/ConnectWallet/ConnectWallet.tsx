import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { hasWallet } from "../../utils";
import { WithOptionalClassName } from "../../utils/types";
import { Button } from "../Button";
import { injectedConnector } from "./injectedConnector";

export function ConnectWallet({ className }: WithOptionalClassName) {
  const { t } = useTranslation();
  const { active, account, activate, deactivate } = useWeb3React();

  async function connect() {
    try {
      await activate(injectedConnector);
    } catch (exception) {
      console.error(exception);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (exception) {
      console.error(exception);
    }
  }

  return active ? (
    <div className={classNames("flex flex-col items-center", className)}>
      <Button
        className="mb-1"
        onClick={disconnect}
        style="secondary"
        transparent
      >
        {t("disconnect")}
      </Button>
      <span className="text-xxs">{account}</span>
    </div>
  ) : hasWallet() ? (
    <Button className={className} onClick={connect}>
      {t("connect")}
    </Button>
  ) : null;
}
