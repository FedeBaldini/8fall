export function hasWallet() {
  if (typeof window !== "undefined") return Boolean(window.ethereum);
  return false;
}
