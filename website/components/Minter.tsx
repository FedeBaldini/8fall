import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";

import {
  ErrorCode,
  Exception,
  IContractDetails,
  Nullable,
} from "../utils/types";
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
  const [errorCode, setErrorCode] = useState<ErrorCode>();

  const { account } = useWeb3React();

  useEffect(() => {
    if (contractDetails && amount) {
      const total = amount * contractDetails.mint_price;
      setTotal(total);
    }
  }, [amount, contractDetails]);

  useEffect(() => {
    setTimeout(() => {
      if (transactionUrl && transactionUrl.trim() !== "") {
        setTransactionUrl(undefined);
      }
    }, 10000);
  }, [transactionUrl]);

  useEffect(() => {
    setTimeout(() => {
      if (errorCode) {
        setErrorCode(undefined);
      }
    }, 10000);
  }, [errorCode]);

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
            setErrorCode(undefined);
          } else {
            setErrorCode(ErrorCode.Generic);
          }
        } catch (_exception) {
          const exception = _exception as Exception;
          setErrorCode(exception.error?.code ?? ErrorCode.Generic);
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
            setErrorCode(undefined);
          } else {
            setErrorCode(ErrorCode.Generic);
          }
        } catch (_exception) {
          const exception = _exception as Exception;
          setErrorCode(exception.error?.code ?? ErrorCode.Generic);
        }
      }
    }
  }

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
          <a
            className="ml-2"
            href={transactionUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t("mint.checkTransaction")}
          </a>
        </div>
      )}
      {errorCode && (
        <div className="flex items-start mt-4">
          <span className="text-red-700">
            {errorCode === ErrorCode.InsufficientFunds
              ? t("mint.insufficientFunds")
              : t("mint.transactionFailed")}
          </span>
        </div>
      )}
    </div>
  );
}
