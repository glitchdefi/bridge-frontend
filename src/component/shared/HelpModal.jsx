import React from 'react';
const HelpModal = (props) => {
    return (
        <>
            <div className="modal fade in" id="helpModal" tabIndex="-1" aria-labelledby="helpModalLabel" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modal-content text-white modal-help" style={{ backgroundColor: '#1a1a1a' }}>
                        <div className="modal-header">
                            {/* <h6 className="modal-title text-white d-flex align-items-center" id="helpModalLabel">
                                How to use Trust Wallet for bscpad.com
                            </h6> */}
                            <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close" style={{ filter: 'invert(1)' }}></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex mb-3">
                                <a className="btn btn-info me-2 w-100 text-white text-center" href="https://link.trustwallet.com/open_url?coin_id=56&url=https://bscpad.com/">
                                    Open with <img src="/images/trust_platform.png" width="30px" className="me-2" />
                                </a>
                                {/* <a className="btn btn-warning w-100 text-white text-center" href="https://metamask.app.link/dapp/bscpad.com/">
                                    Open with <img src="/images/metamask.svg" width="30px" className="me-2" />
                                </a> */}
                            </div>

                            <h2 className="text-warning">How to Set Up and Use Trust Wallet for BSCPAD.COM</h2>
                            <h5 className="mt-3">Setting up your wallet for Binance Smart Chain</h5>
                            <ul className="ps-0" style={{ listStyle: 'none' }}>
                                <li>1). Download Trust Wallet. If you already have Trust Wallet, make sure your app is up to date.</li>
                                <li>2). Complete <a href="https://community.trustwallet.com/t/how-to-create-a-multi-coin-wallet/41" target="_blank">basic setup of a multi-coin wallet</a>. Remember to save your backup phrases.</li>
                                <li>3). Go to your Smart Chain wallet and press receive to find your address</li>
                                <li>4). That’s it! You’re ready to start using Binance Smart Chain</li>
                            </ul>
                            <h5 className="mt-4">Using BSCPAD.COM in Trust Wallet</h5>
                            <ul className="ps-0" style={{ listStyle: 'none' }}>
                                <li>5). For this part, iOS users will need the Dapp browser. Android users have the Dapp browser by default.</li>
                                <li>6). Once you’ve topped up your wallet, open the Dapp browser by pressing on the four squares at the bottom of the app.</li>
                            </ul>
                            <p className="text-center">
                                <img style={{ maxWidth: '97%' }} className="mx-auto" src='/images/help-1.png' alt="" />
                            </p>
                            <ul className="ps-0" style={{ listStyle: 'none' }}>
                                <li>7). Input <b>bscpad.com</b></li>
                                <li>8). Change network to Binance smart chain</li>
                                <li>9). Use the Dapp and have fun!</li>
                            </ul>
                            <h5 className="mt-5">Enable DApp Browser on Trust Wallet (iOS version)</h5>
                            <ul className="ps-0" style={{ listStyle: 'none' }}>
                                <li>
                                    <p>1). Open <b>Safari Browser</b> and then type in the URL: <b>trust://browser_enable</b>, then tap on <b>Go</b></p>
                                    <p><img style={{ maxWidth: '97%' }} className="mx-auto" src="/images/help-2.png" alt="" /></p>
                                </li>
                                <li>
                                    <p>2). A prompt will appear that will ask if you want to <b>Open this page in “Trust”?</b>, tap on <b>Open</b></p>
                                    <p><img style={{ maxWidth: '97%' }} className="mx-auto" src="/images/help-3.png" alt="" /></p>
                                    <p>The <b>Trust Wallet</b> app will launch and the <b>DApp browser</b> will be enabled</p>
                                    <p><img style={{ maxWidth: '97%' }} className="mx-auto" src="/images/help-4.png" alt="" /></p>
                                </li>
                            </ul>
                            {/* <h5 className="mt-5 mb-3">Video</h5> */}
                            {/* <iframe className="w-100" width="375" height="180" src="https://www.youtube.com/embed/SGDBFsb47Uk" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}


                            <div className="d-flex mt-4">
                                <a className="btn btn-info me-2 w-100 text-white text-center" href="https://link.trustwallet.com/open_url?coin_id=56&url=https://bscpad.com/">
                                    Open with <img src="/images/trust_platform.png" width="30px" className="me-2" />
                                </a>
                                {/* <a className="btn btn-warning w-100 text-white text-center" href="https://metamask.app.link/dapp/bscpad.com/">
                                    Open with <img src="/images/metamask.svg" width="30px" className="me-2" />
                                </a> */}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}

export default HelpModal;


