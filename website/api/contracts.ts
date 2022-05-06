import { IContractDetails } from "../utils/types";

export async function getDetails(
  contractAddress: string,
  nftPortKey: string
): Promise<IContractDetails> {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: nftPortKey,
    },
  };
  const query = new URLSearchParams({
    chain: "rinkeby",
    include: "merkle_proofs",
  });

  const url = "https://api.nftport.xyz/v0/me/contracts/collections?";
  const data = await fetch(`${url}${query}`, options);
  const json = await data.json();
  return json.contracts.find(
    (contract: IContractDetails) =>
      contract.address.toLowerCase() === contractAddress.toLowerCase()
  );
}
