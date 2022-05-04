import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";

import { Layout } from "../components/Layout/Layout";
import _8fall from "../config/nft/8fall.json";

export default function HomePage() {
  const [minAmount, setMinAmount] = useState(0);
  const { active } = useWeb3React();

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0xf3fD7B44a3dab4E9ed61c6eBA1e70DAe1E87A254",
        _8fall.abi,
        signer
      );

      try {
        const response = await contract.mint(BigNumber.from(minAmount), {
          value: ethers.utils.parseEther((0.001 * minAmount).toString()),
        });
        console.log({ response });
      } catch (exception) {
        console.error(exception);
      }
    }
  }

  function handleDecrement() {
    if (minAmount <= 1) return;
    setMinAmount(minAmount - 1);
  }

  function handleIncrement() {
    if (minAmount >= 5) return;
    setMinAmount(minAmount + 1);
  }

  return (
    <Layout>
      {active && (
        <>
          <div className="flex">
            <button onClick={handleDecrement}>-</button>
            <input type="number" value={minAmount} disabled />
            <button onClick={handleIncrement}>+</button>
          </div>
          <button onClick={handleMint}>Mint</button>
        </>
      )}
    </Layout>
  );
}
