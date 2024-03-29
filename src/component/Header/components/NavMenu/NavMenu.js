import React from "react";
import styled from "styled-components";
import breakPoints from "../../../../utils/breakPoints";
import { Text } from "../../../Text";

// Components
import { Balance } from "./Balance";
import { ConnectWithMetamask } from "./ConnectWithMetamask";
import { WalletAddress } from "./WalletAddress";
import { Button } from "../../../Button";

export function NavMenu({
  isConnectWallet,
  glitchBalance,
  walletAddress,
  currentNetWorkId,
  onShowWalletInfo,
  onShowInstallMetamaskModal,
  onShowVoyagerWidget,
}) {
  return (
    <StyledMenu className="collapse navbar-collapse" id="navbarSupportedContent">
      <StyledUl>
        <MenuItem>
          <div className="voyager-wrapper">
            <Button variant="secondary" onClick={onShowVoyagerWidget}>
              <Text color="#00FFFF" bold>
                CROSS CHAIN SWAP
              </Text>
            </Button>
          </div>
        </MenuItem>
        {!isConnectWallet ? (
          <MenuItem>
            <ConnectWithMetamask onShowInstallMetamaskModal={onShowInstallMetamaskModal} />
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

  .voyager-wrapper {
    .btn-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 33px;
      > img {
        width: 100px;
        height: auto;
        object-fit: contain;
        margin-right: 0px;
      }
    }
  }

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
