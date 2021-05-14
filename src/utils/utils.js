import window from 'global'
import { BigNumber } from "bignumber.js";

export function isMetamaskAvailable() {
  return !!(window.ethereum && window.ethereum.isMetaMask)
}

export function isBinanceExtensionAvailable() {
  return !!window.BinanceChain
}

export function isTrustWalletAvailable() {
  return !!(window.ethereum && window.ethereum.isTrust)
}

export function retryWithTimeout(
  callback,
  callbackReject = function() {},
  retryTime = 5,
  timeout = 1000
) {
  return setTimeout(async () => {
    try {
      await callback()
    } catch (e) {
      // console.log(e.message)
      if (retryTime === 0) {
        console.error(e.message)
        await callbackReject()
      } else {
        return retryWithTimeout(callback, retryTime - 1, timeout)
      }
    }
  }, timeout)
}
export function calculateBalanceSend(balance){
  return BigNumber(balance)
      .multipliedBy(10 ** 18)
      .integerValue()
}