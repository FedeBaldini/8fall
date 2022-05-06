export interface IContractDetails {
  address: string;
  base_uri: string;
  chain: "rinkeby";
  creation_date: string;
  max_supply: number;
  merkle_proofs: Record<string, string[]>;
  metadata_frozen: boolean;
  mint_price: number;
  name: string;
  owner_address: string;
  prereveal_token_uri: string;
  presale_merkle_root: string;
  presale_mint_start: string;
  presale_whitelisted_addresses: string[];
  public_mint_start: string;
  royalties_address: string;
  royalties_share: number;
  symbol: string;
  tokens_per_mint: number;
  transaction_hash: string;
  treasury_address: string;
}
