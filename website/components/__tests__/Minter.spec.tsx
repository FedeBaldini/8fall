import { ethers } from "ethers";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { createContractDetails } from "../../test-utils";
import { Minter } from "../Minter";
import { ErrorCode } from "../../utils/types";

const mockedContract = {
  mint: jest.fn(),
  presaleMint: jest.fn(),
} as unknown as ethers.Contract;

describe("components / Minter", () => {
  afterEach(jest.clearAllMocks);
  afterAll(jest.resetAllMocks);

  it("shows the total amount", async () => {
    render(
      <Minter
        contract={mockedContract}
        contractDetails={createContractDetails()}
        merkleProof={[]}
        isPresaleMintActive={false}
        isPublicMintActive
      />
    );

    fireEvent.click(screen.getByTestId("Increment"));
    expect(await screen.findByText("0.002 ETH")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("Decrement"));
    expect(await screen.findByText("0.001 ETH")).toBeInTheDocument();
  });

  describe("when pre-sale", () => {
    it("renders an error when minting fails for insufficient funds", async () => {
      mockedContract.presaleMint.mockRejectedValue({
        error: { code: ErrorCode.InsufficientFunds },
      });
      render(
        <Minter
          contract={mockedContract}
          contractDetails={createContractDetails()}
          merkleProof={[]}
          isPublicMintActive={false}
          isPresaleMintActive
        />
      );

      fireEvent.click(screen.getByText(/mint.title/));

      await waitFor(() =>
        expect(screen.getByText(/mint.insufficientFunds/)).toBeInTheDocument()
      );
    });

    it("renders an error when minting fails", async () => {
      mockedContract.presaleMint.mockRejectedValue(new Error());
      render(
        <Minter
          contract={mockedContract}
          contractDetails={createContractDetails()}
          merkleProof={[]}
          isPublicMintActive={false}
          isPresaleMintActive
        />
      );

      fireEvent.click(screen.getByText(/mint.title/));

      await waitFor(() =>
        expect(screen.getByText(/mint.transactionFailed/)).toBeInTheDocument()
      );
    });

    it("renders an error when mint responds without info", async () => {
      mockedContract.presaleMint.mockResolvedValue(null);
      render(
        <Minter
          contract={mockedContract}
          contractDetails={createContractDetails()}
          merkleProof={[]}
          isPublicMintActive={false}
          isPresaleMintActive
        />
      );

      fireEvent.click(screen.getByText(/mint.title/));

      await waitFor(() =>
        expect(screen.getByText(/mint.transactionFailed/)).toBeInTheDocument()
      );
    });

    it("renders a success message when minted successfully", async () => {
      mockedContract.presaleMint.mockResolvedValue({ hash: "transactionHash" });
      render(
        <Minter
          contract={mockedContract}
          contractDetails={createContractDetails()}
          merkleProof={[]}
          isPublicMintActive={false}
          isPresaleMintActive
        />
      );

      fireEvent.click(screen.getByText(/mint.title/));

      await waitFor(() =>
        expect(screen.getByText(/mint.transactionSuccess/)).toBeInTheDocument()
      );
      expect(screen.getByText(/mint.checkTransaction/)).toHaveAttribute(
        "href",
        "https://rinkeby.etherscan.io/tx/transactionHash"
      );
    });
  });

  describe("when public sale", () => {
    it("renders an error when minting fails", async () => {
      mockedContract.mint.mockRejectedValue(new Error());
      render(
        <Minter
          contract={mockedContract}
          contractDetails={createContractDetails()}
          merkleProof={[]}
          isPresaleMintActive={false}
          isPublicMintActive
        />
      );

      fireEvent.click(screen.getByText(/mint.title/));

      await waitFor(() =>
        expect(screen.getByText(/mint.transactionFailed/)).toBeInTheDocument()
      );
    });

    it("renders an error when minting fails for insufficient funds", async () => {
      mockedContract.mint.mockRejectedValue({
        error: { code: ErrorCode.InsufficientFunds },
      });
      render(
        <Minter
          contract={mockedContract}
          contractDetails={createContractDetails()}
          merkleProof={[]}
          isPresaleMintActive={false}
          isPublicMintActive
        />
      );

      fireEvent.click(screen.getByText(/mint.title/));

      await waitFor(() =>
        expect(screen.getByText(/mint.insufficientFunds/)).toBeInTheDocument()
      );
    });

    it("renders an error when mint responds without info", async () => {
      mockedContract.mint.mockResolvedValue(null);
      render(
        <Minter
          contract={mockedContract}
          contractDetails={createContractDetails()}
          merkleProof={[]}
          isPresaleMintActive={false}
          isPublicMintActive
        />
      );

      fireEvent.click(screen.getByText(/mint.title/));

      await waitFor(() =>
        expect(screen.getByText(/mint.transactionFailed/)).toBeInTheDocument()
      );
    });

    it("renders a success message when minted successfully", async () => {
      mockedContract.mint.mockResolvedValue({ hash: "transactionHash" });
      render(
        <Minter
          contract={mockedContract}
          contractDetails={createContractDetails()}
          merkleProof={[]}
          isPresaleMintActive={false}
          isPublicMintActive
        />
      );

      fireEvent.click(screen.getByText(/mint.title/));

      await waitFor(() =>
        expect(screen.getByText(/mint.transactionSuccess/)).toBeInTheDocument()
      );
      expect(screen.getByText(/mint.checkTransaction/)).toHaveAttribute(
        "href",
        "https://rinkeby.etherscan.io/tx/transactionHash"
      );
    });
  });
});
