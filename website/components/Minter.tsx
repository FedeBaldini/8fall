import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";

import { IContractDetails, Nullable } from "../utils/types";
import { Button } from "./Button";
import { NumberField } from "./NumberField";

interface Props {
  contract: Nullable<ethers.Contract>;
  contractDetails: Nullable<IContractDetails>;
  merkleProof: string[];
  isPublicMintActive: boolean;
  isPresaleMintActive: boolean;
}

export function Minter({
  contractDetails,
  contract,
  merkleProof,
  isPublicMintActive,
  isPresaleMintActive,
}: Props) {
  const { t } = useTranslation();

  const [amount, setAmount] = useState(1);
  const [total, setTotal] = useState(0);

  const [transactionUrl, setTransactionUrl] = useState<string>();
  const [hasError, setHasError] = useState<boolean>(false);

  const { account } = useWeb3React();

  useEffect(() => {
    if (contractDetails && amount) {
      const total = amount * contractDetails.mint_price;
      setTotal(total);
    }
  }, [amount, contractDetails]);

  async function mint() {
    if (contract) {
      const value = ethers.utils.parseEther((0.001 * amount).toString());

      if (isPublicMintActive) {
        try {
          const mintTransaction = await contract.mint(BigNumber.from(amount), {
            from: account,
            value: value.toString(),
          });
          if (mintTransaction) {
            const url = `https://rinkeby.etherscan.io/tx/${mintTransaction.hash}`;
            setTransactionUrl(url);
            setHasError(false);
          } else {
            setHasError(true);
          }
        } catch (exception) {
          setHasError(true);
        }
      } else if (isPresaleMintActive) {
        try {
          const presaleMintTransaction = await contract.presaleMint(
            BigNumber.from(amount),
            merkleProof,
            {
              from: account,
              value: value.toString(),
            }
          );
          if (presaleMintTransaction) {
            const url = `https://rinkeby.etherscan.io/tx/${presaleMintTransaction.hash}`;
            setTransactionUrl(url);
            setHasError(false);
          } else {
            setHasError(true);
          }
        } catch (exception) {
          setHasError(true);
        }
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (transactionUrl && transactionUrl.trim() !== "") {
        setTransactionUrl(undefined);
      }
    }, 10000);
  }, [transactionUrl]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex items-center">
          <NumberField initialValue={1} onChange={setAmount} />
          <span className="text-xs font-semibold ml-2">{total} ETH</span>
        </div>
        <Button className="text-white" onClick={mint}>
          {t("mint.title")}
        </Button>
      </div>
      {transactionUrl && (
        <div className="flex items-start mt-4">
          <span className="text-green-600">{t("mint.transactionSuccess")}</span>
          <a className="ml-2" href={transactionUrl} target="_blank">
            {t("mint.checkTransaction")}
          </a>
        </div>
      )}
      {hasError && (
        <div className="flex items-start mt-4">
          <span className="text-red-700">{t("mint.transactionFailed")}</span>
        </div>
      )}
    </div>
  );
}
