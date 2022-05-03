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

describe("components / ConnectWallet", () => {
  afterEach(jest.clearAllMocks);
  afterAll(jest.resetAllMocks);

  it("renders with a button to connect when there's no wallet connected", () => {
    render(<ConnectWallet />);
    expect(screen.getByText(/connect/)).toBeInTheDocument();
    expect(screen.queryByText(/disconnect/)).not.toBeInTheDocument();
  });

  it("renders with a button to disconnect when there's a wallet connected", () => {
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

  it("connects a wallet", async () => {
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
