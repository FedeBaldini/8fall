import { useCallback, useEffect, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

import API from "../api";
import { Layout } from "../components/Layout/Layout";
import { Countdown } from "../components/Countdown";
import { Button } from "../components/Button";
import { IContractDetails, Nullable } from "../utils/types";
import { Loader } from "../components/Loader";
import { Minter } from "../components/Minter";
import { ABI } from "../config/nft";

export default function HomePage() {
  const { t } = useTranslation();

  const [contract, setContract] = useState<Nullable<ethers.Contract>>(null);
  const [contractDetails, setContractDetails] =
    useState<Nullable<IContractDetails>>(null);

  const [isLoading, setLoading] = useState(false);

  const [isPublicMintActive, setIsPublicMintActive] = useState(false);
  const [isPresaleMintActive, setIsPresaleMintActive] = useState(false);
  const [presaleMintStartDate, setPresaleMintStartDate] = useState<number>();
  const [publicMintStartDate, setPublicMintStartDate] = useState<number>();
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [merkleProof, setMerkleProof] = useState<string[]>([]);

  const { active, account } = useWeb3React();

  const loadContractData = useCallback(async () => {
    if (!contract) return;

    setLoading(true);
    const publicMintActive = await contract.mintingActive();
    const presaleMintActive = await contract.presaleActive();

    if (account) {
      try {
        const contractDetails = await API.contracts.getDetails(
          contract.address
        );

        const merkleProofs = contractDetails.merkle_proofs || {};
        const merkleProof = merkleProofs[account] || [];
        setMerkleProof(merkleProof);

        const publicMintStart = new Date(contractDetails.public_mint_start);
        const presaleMintStart = new Date(contractDetails.presale_mint_start);
        const isWhitelisted =
          contractDetails.presale_whitelisted_addresses.includes(account);

        setPublicMintStartDate(publicMintStart.getTime());
        setPresaleMintStartDate(presaleMintStart.getTime());
        setContractDetails(contractDetails);
        setIsWhitelisted(isWhitelisted);
      } catch (_exception) {}
    }

    setIsPublicMintActive(publicMintActive);
    setIsPresaleMintActive(publicMintActive ? false : presaleMintActive);

    setLoading(false);
  }, [contract, account]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x2A66812e12d2226d402A07Cdb5a86205f4675ca3",
      ABI,
      signer
    );

    setContract(contract);
  }, []);

  useEffect(() => {
    loadContractData();
  }, [loadContractData]);

  const mintingCountdownTitle = useMemo(() => {
    if (!isPresaleMintActive && !isPublicMintActive) {
      return (
        <div className="flex flex-col text-lg text-pink-600 mb-4">
          <div>
            <Trans i18nKey="mint.countdown.preSaleComingSoon" />
          </div>
          <span className="text-black">{t("mint.countdown.get")}</span>
        </div>
      );
    }
    if (isPresaleMintActive && !isPublicMintActive) {
      return (
        <div className="text-lg text-pink-600 mb-4">
          <Trans i18nKey="mint.countdown.publicComingSoon" />
        </div>
      );
    }
  }, [isPresaleMintActive, isPublicMintActive, t]);

  const mintingCountdown = useMemo(() => {
    if (!isPresaleMintActive && !isPublicMintActive) {
      return <Countdown className="mb-6" date={presaleMintStartDate!} />;
    }
    if (isPresaleMintActive && !isPublicMintActive) {
      return <Countdown className="mb-6" date={publicMintStartDate!} />;
    }
  }, [
    isPresaleMintActive,
    isPublicMintActive,
    presaleMintStartDate,
    publicMintStartDate,
  ]);

  return (
    <Layout>
      {active && (
        <div data-testid="Minter">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="w-full flex justify-center">
              <div className="bg-white p-10 rounded-lg shadow-inner shadow-slate-400 text-black text-center min-w-1/3">
                {mintingCountdownTitle}
                {mintingCountdown}

                {isPublicMintActive && (
                  <>
                    <div className="text-3xl font-bold mb-4">
                      {t("mint.public")}
                    </div>

                    <div className="flex flex-col">
                      <div className="mb-4 text-sky-600">
                        {t("mint.canMint")}
                      </div>
                      <NFTInfo contractDetails={contractDetails} />
                      <Minter
                        contract={contract}
                        contractDetails={contractDetails}
                        merkleProof={merkleProof}
                        isPresaleMintActive={isPresaleMintActive}
                        isPublicMintActive={isPublicMintActive}
                      />
                    </div>
                  </>
                )}

                {isPresaleMintActive && (
                  <>
                    <div className="text-3xl font-bold mb-4">
                      {t("mint.preSale")}
                    </div>
                    {!isWhitelisted ? (
                      <>
                        <div className="mb-2 text-red-700">
                          {t("mint.notWhitelisted")}
                        </div>
                        <Button onClick={() => {}} transparent>
                          {t("mint.getOnWhitelist")}
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col">
                        <div className="mb-4 text-sky-600">
                          {t("mint.whitelisted")}
                        </div>
                        <NFTInfo contractDetails={contractDetails} />
                        <Minter
                          contract={contract}
                          contractDetails={contractDetails}
                          merkleProof={merkleProof}
                          isPresaleMintActive={isPresaleMintActive}
                          isPublicMintActive={isPublicMintActive}
                        />
                      </div>
                    )}
                  </>
                )}

                {!isPublicMintActive && !isPresaleMintActive && (
                  <Button onClick={() => {}} transparent>
                    {t("mint.getOnWhitelist")}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

interface NFTInfoProps {
  contractDetails: Nullable<IContractDetails>;
}
function NFTInfo({ contractDetails }: NFTInfoProps) {
  const { t } = useTranslation();
  return (
    <div className="flex text-sm justify-between mb-4">
      <div className="flex flex-col">
        <span className="text-title">{t("mint.supply")}</span>
        {contractDetails?.max_supply}
      </div>
      <div className="flex flex-col">
        <span className="text-title">{t("mint.price")}</span>
        {contractDetails?.mint_price} ETH
      </div>
      <div className="flex flex-col">
        <span className="text-title">{t("mint.max")}</span>
        {contractDetails?.tokens_per_mint}
      </div>
    </div>
  );
}
