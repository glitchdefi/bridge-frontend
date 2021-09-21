import React from "react";
import styled from "styled-components";
import breakPoints from "../../../../utils/breakPoints";

// Components
import { Balance } from "./Balance";
import { ConnectWithMetamask } from "./ConnectWithMetamask";
import { WalletAddress } from "./WalletAddress";

export function NavMenu({
  isConnectWallet,
  glitchBalance,
  walletAddress,
  currentNetWorkId,
  onShowWalletInfo,
  onShowInstallMetamaskModal,
}) {
  return (
    <StyledMenu
      className="collapse navbar-collapse"
      id="navbarSupportedContent"
    >
      <StyledUl>
        {!isConnectWallet ? (
          <MenuItem>
            <ConnectWithMetamask
              onShowInstallMetamaskModal={onShowInstallMetamaskModal}
            />
          </MenuItem>
        ) : (
          <>
            <MenuItem>
              <Balance value={glitchBalance} />
            </MenuItem>
            <MenuItem>
              <WalletAddress
                address={walletAddress}
                currentNetWorkId={currentNetWorkId}
                onShowWalletInfo={onShowWalletInfo}
              />
            </MenuItem>
          </>
        )}
      </StyledUl>
    </StyledMenu>
  );
}

const StyledMenu = styled.div`
  flex-basis: 100%;
  flex-grow: 1;
  align-items: center;

  @media ${breakPoints.device.lg} {
    display: flex !important;
    flex-basis: auto;
    justify-content: flex-end;
  }
`;

const StyledUl = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;

  @media ${breakPoints.device.lg} {
    display: flex;
    align-items: center;
  }
`;

const MenuItem = styled.li`
  width: 100%;
  margin-top: 12px;

  @media ${breakPoints.device.lg} {
    margin-top: 0px;
    margin-right: 12px;
    width: auto;
  }
`;
