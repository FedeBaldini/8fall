import { IContractDetails } from "../utils/types";

export function createContractDetails(
  overrides?: Partial<IContractDetails>
): IContractDetails {
  return {
    address: "address",
    base_uri: "",
    chain: "rinkeby",
    creation_date: "2022-01-01",
    max_supply: 100,
    merkle_proofs: {},
    metadata_frozen: false,
    mint_price: 0.001,
    name: "Name",
    owner_address: "owner_address",
    prereveal_token_uri: "prereveal_token_uri",
    presale_merkle_root: "presale_merkle_root",
    presale_whitelisted_addresses: [],
    presale_mint_start: "2022-01-01",
    public_mint_start: "2022-01-01",
    royalties_address: "royalties_address",
    royalties_share: 1000,
    symbol: "symbol",
    tokens_per_mint: 5,
    transaction_hash: "transaction_hash",
    treasury_address: "treasury_address",
    ...overrides,
  };
}
