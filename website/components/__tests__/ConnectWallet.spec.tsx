import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { ConnectWallet } from "../ConnectWallet";

const mockWeb3React = jest.fn().mockImplementation(() => ({
  active: false,
  account: null,
  activate: jest.fn(),
  deactivate: jest.fn(),
}));
jest.mock("@web3-react/core", () => ({
  useWeb3React: () => mockWeb3React(),
}));

const mockHasWallet = jest.fn().mockImplementation(() => false);
jest.mock("../../utils", () => ({
  hasWallet: () => mockHasWallet(),
}));

describe("components / ConnectWallet", () => {
  afterEach(jest.clearAllMocks);
  afterAll(jest.resetAllMocks);

  it("doesn't render when no wallet installed", () => {
    const { container } = render(<ConnectWallet />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders with a button to connect when there's no wallet connected", () => {
    mockHasWallet.mockImplementation(() => true);

    render(<ConnectWallet />);

    expect(screen.getByText(/connect/)).toBeInTheDocument();
    expect(screen.queryByText(/disconnect/)).not.toBeInTheDocument();
  });

  it("renders with a button to disconnect when there's a wallet connected", () => {
    mockHasWallet.mockImplementation(() => true);
    mockWeb3React.mockImplementation(() => ({
      active: true,
      account: null,
      activate: jest.fn(),
      deactivate: jest.fn(),
    }));

    render(<ConnectWallet />);
    expect(screen.getByText(/disconnect/)).toBeInTheDocument();
    expect(screen.queryByText("connect")).not.toBeInTheDocument();
  });

  it("renders the account id when there's one", async () => {
    mockHasWallet.mockImplementation(() => true);
    const mockActivate = jest.fn();
    mockWeb3React.mockImplementation(() => ({
      active: true,
      account: "accountId",
      activate: mockActivate,
      deactivate: jest.fn(),
    }));

    render(<ConnectWallet />);

    expect(await screen.findByText("accountId")).toBeInTheDocument();
  });

  it("connects a wallet", async () => {
    mockHasWallet.mockImplementation(() => true);
    const mockActivate = jest.fn();
    mockWeb3React.mockImplementation(() => ({
      active: false,
      account: null,
      activate: mockActivate,
      deactivate: jest.fn(),
    }));

    render(<ConnectWallet />);

    fireEvent.click(screen.getByText(/connect/));

    await waitFor(() => expect(mockActivate).toHaveBeenCalled());
  });

  it("disconnects from a wallet", async () => {
    mockHasWallet.mockImplementation(() => true);
    const mockDeactivate = jest.fn();
    mockWeb3React.mockImplementation(() => ({
      active: true,
      account: null,
      activate: jest.fn(),
      deactivate: mockDeactivate,
    }));

    render(<ConnectWallet />);

    fireEvent.click(screen.getByText(/disconnect/));

    await waitFor(() => expect(mockDeactivate).toHaveBeenCalled());
  });
});
