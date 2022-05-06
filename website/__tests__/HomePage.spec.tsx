import { render, screen, waitFor } from "@testing-library/react";
import API from "../api";

import HomePage from "../pages/index";
import { createContractDetails } from "../test-utils";

const mockWeb3React = jest.fn().mockImplementation(() => ({
  active: false,
  account: null,
  activate: jest.fn(),
  deactivate: jest.fn(),
}));
jest.mock("@web3-react/core", () => ({
  useWeb3React: () => mockWeb3React(),
}));

const mockMintingActive = jest.fn().mockImplementation(() => false);
const mockPresaleActive = jest.fn().mockImplementation(() => false);
jest.mock("ethers", () => ({
  ethers: {
    Contract: jest.fn().mockImplementation(() => ({
      mintingActive: mockMintingActive,
      presaleActive: mockPresaleActive,
    })),
    providers: {
      Web3Provider: jest
        .fn()
        .mockImplementation(() => ({ getSigner: jest.fn() })),
    },
  },
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "/",
  }),
}));

describe("pages / HomePage", () => {
  afterEach(jest.clearAllMocks);
  afterAll(jest.resetAllMocks);

  function renderComponent() {
    render(
      <HomePage contractAddress="contractAddress" nftPortKey="nftPortKey" />
    );
  }

  it("doesn't render when there are no wallet connected", async () => {
    jest
      .spyOn(API.contracts, "getDetails")
      .mockResolvedValue(createContractDetails());
    mockWeb3React.mockImplementation(() => ({
      active: false,
      account: null,
      activate: jest.fn(),
      deactivate: jest.fn(),
    }));

    renderComponent();

    await waitFor(() =>
      expect(screen.queryByTestId("Minter")).not.toBeInTheDocument()
    );
  });

  it("renders the minter when there is a wallet connected", async () => {
    jest
      .spyOn(API.contracts, "getDetails")
      .mockResolvedValue(createContractDetails());
    mockWeb3React.mockImplementation(() => ({
      active: true,
      account: "accountId",
      activate: jest.fn(),
      deactivate: jest.fn(),
    }));

    renderComponent();

    await waitFor(() =>
      expect(screen.getByTestId("Minter")).toBeInTheDocument()
    );
  });

  describe("when not pre-sale and not public sale", () => {
    it("renders the minter with the info to get whitelisted an pre sale info", async () => {
      jest
        .spyOn(API.contracts, "getDetails")
        .mockResolvedValue(createContractDetails());
      mockMintingActive.mockImplementation(() => false);
      mockPresaleActive.mockImplementation(() => false);
      mockWeb3React.mockImplementation(() => ({
        active: true,
        account: "accountId",
        activate: jest.fn(),
        deactivate: jest.fn(),
      }));

      renderComponent();

      await waitFor(() =>
        expect(
          screen.getByText(/mint.countdown.preSaleComingSoon/)
        ).toBeInTheDocument()
      );
      expect(screen.getByText(/mint.countdown.get/)).toBeInTheDocument();
      expect(screen.getByText(/mint.getOnWhitelist/)).toBeInTheDocument();
    });
  });

  describe("when pre-sale", () => {
    it("renders the minter with the pre sale info", async () => {
      jest
        .spyOn(API.contracts, "getDetails")
        .mockResolvedValue(createContractDetails());
      mockMintingActive.mockImplementation(() => false);
      mockPresaleActive.mockImplementation(() => true);
      mockWeb3React.mockImplementation(() => ({
        active: true,
        account: "accountId",
        activate: jest.fn(),
        deactivate: jest.fn(),
      }));

      renderComponent();

      await waitFor(() =>
        expect(
          screen.getByText(/mint.countdown.publicComingSoon/)
        ).toBeInTheDocument()
      );
      expect(screen.getByText(/mint.preSale/)).toBeInTheDocument();
    });

    it("renders a message when the current user is not in the whitelist", async () => {
      jest.spyOn(API.contracts, "getDetails").mockResolvedValue(
        createContractDetails({
          presale_whitelisted_addresses: ["whitelistedAccountId"],
        })
      );
      mockMintingActive.mockImplementation(() => false);
      mockPresaleActive.mockImplementation(() => true);
      mockWeb3React.mockImplementation(() => ({
        active: true,
        account: "accountId",
        activate: jest.fn(),
        deactivate: jest.fn(),
      }));

      renderComponent();

      await waitFor(() =>
        expect(screen.getByText(/mint.notWhitelisted/)).toBeInTheDocument()
      );
      expect(screen.getByText(/mint.getOnWhitelist/)).toBeInTheDocument();
      expect(screen.queryByText(/mint.title/)).not.toBeInTheDocument();
    });

    it("renders a message when the current user is in the whitelist", async () => {
      jest.spyOn(API.contracts, "getDetails").mockResolvedValue(
        createContractDetails({
          presale_whitelisted_addresses: ["accountId"],
        })
      );
      mockMintingActive.mockImplementation(() => false);
      mockPresaleActive.mockImplementation(() => true);
      mockWeb3React.mockImplementation(() => ({
        active: true,
        account: "accountId",
        activate: jest.fn(),
        deactivate: jest.fn(),
      }));

      renderComponent();

      await waitFor(() =>
        expect(screen.getByText(/mint.whitelisted/)).toBeInTheDocument()
      );
      expect(screen.getByText(/mint.title/)).toBeInTheDocument();
    });
  });

  describe("when public", () => {
    it("renders the minter with the public info", async () => {
      jest
        .spyOn(API.contracts, "getDetails")
        .mockResolvedValue(createContractDetails());
      mockMintingActive.mockImplementation(() => true);
      mockPresaleActive.mockImplementation(() => false);
      mockWeb3React.mockImplementation(() => ({
        active: true,
        account: "accountId",
        activate: jest.fn(),
        deactivate: jest.fn(),
      }));

      renderComponent();

      await waitFor(() =>
        expect(screen.getByText(/mint.public/)).toBeInTheDocument()
      );
      expect(screen.getByText(/mint.canMint/)).toBeInTheDocument();
      expect(screen.getByText(/mint.title/)).toBeInTheDocument();
    });
  });
});
