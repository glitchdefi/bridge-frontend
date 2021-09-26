import React from 'react';
import ConnectWalletModal from '../ConnectWalletModal';
import WalletModal from '../WalletModal';
import packageJson from '../../../../package.json';


export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>

      <div className="pp-footer">
        <div className="container">

          {/* <div className="text-center">
            <div className="pp-footer-social mb-2">
              <a href="#" target="_blank">
                <svg style={{ height: '16px', width: '16px' }} enableBackground="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m22.085 4.733 1.915-1.832v-.401h-6.634l-4.728 11.768-5.379-11.768h-6.956v.401l2.237 2.693c.218.199.332.49.303.783v10.583c.069.381-.055.773-.323 1.05l-2.52 3.054v.396h7.145v-.401l-2.52-3.049c-.273-.278-.402-.663-.347-1.05v-9.154l6.272 13.659h.729l5.393-13.659v10.881c0 .287 0 .346-.188.534l-1.94 1.877v.402h9.412v-.401l-1.87-1.831c-.164-.124-.249-.332-.214-.534v-13.467c-.035-.203.049-.411.213-.534z" fill="#fff" /></svg>
              </a>
              <a href="#" target="_blank">
                <svg style={{ height: '16px', width: '16px' }} viewBox="0 0 24 24" className="r-k200y r-13gxpu9 r-4qtqp9 r-yyyyoo r-5sfk15 r-dnmrzs r-1mi0q7o r-bnwqim r-1plcrui r-lrvibr"><g><path fill="#00ACF5" d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
              </a>
              <a href="#">
                <svg style={{ height: '16px', width: '16px' }} enableBackground="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" fill="#039be5" r="12" /><path d="m5.491 11.74 11.57-4.461c.537-.194 1.006.131.832.943l.001-.001-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953z" fill="#fff" /></svg>
              </a>
            </div>
            <div className="pp-footer-link mb-2">
              <a href="#">About us</a>
              <a href="#">Support</a>
              <a href="#">Term</a>
              <a href="#">Privacy</a>
            </div> */}
          <div className="d-flex justify-content-between">
            <div className="text-muted">Copyright © {currentYear}. All Rights Reserved by Glitch</div>
            <div className="text-muted"> v{packageJson.version}</div>
            <div className="text-right pp-footer-link">
              <div class="p-footer-social">
                <a href="mailto:support@glitch.finance"><img  src="https://img.icons8.com/fluent/2x/email-sign.png"/></a>
                <a target="_blank" href="https://t.me/glitchbridge"><img src="https://img.icons8.com/color/2x/telegram-app.png"/></a>
              </div>
              {/* <Link className="p-terms me-3" target="_blank" to={ROUTES.PRIVACY_POLICY}>Privacy Policy </Link> */}
              {/* <span className="mx-1">•</span> */}
              {/* <Link className="p-terms" target="_blank" to={ROUTES.TERMS_OF_USE}>Terms of Use </Link> */}
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
      <ConnectWalletModal />

      <WalletModal />

    </>
  );
}