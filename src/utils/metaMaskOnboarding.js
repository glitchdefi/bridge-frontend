import MetaMaskOnboarding from '@metamask/onboarding'

const onboarding = new MetaMaskOnboarding()
onboarding.startOnboarding()

window.addEventListener('DOMContentLoaded', () => {
  const onboarding = new MetaMaskOnboarding()
  const onboardButton = document.getElementById('onboard')
  let accounts

  const updateButton = () => {
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
      onboardButton.innerText = 'Click here to install MetaMask!'
      onboardButton.onclick = () => {
        onboardButton.innerText = 'Onboarding in progress'
        onboardButton.disabled = true
        onboarding.startOnboarding()
      }
    } else if (accounts && accounts.length > 0) {
      onboardButton.innerText = 'Connected'
      onboardButton.disabled = true
      onboarding.stopOnboarding()
    } else {
      onboardButton.innerText = 'Connect'
      onboardButton.onclick = async () => {
        await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
      }
    }
  }

  updateButton()
  if (MetaMaskOnboarding.isMetaMaskInstalled()) {
    window.ethereum.on('accountsChanged', (newAccounts) => {
      accounts = newAccounts
      updateButton()
    })
  }
})
