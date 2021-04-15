import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { ROUTES, LOCAL_STORAGE } from '../../constants';
import $ from 'jquery';
const Navigation = (props) => {

    const history = useHistory();
    const [showLogout, setShowLogout] = useState(true)

    useEffect(() => {
        const objectKeyStoreStr = localStorage.getItem(LOCAL_STORAGE.ASSET_UNW_WALLET)

        if (!objectKeyStoreStr) {
            setShowLogout(false)
        }
        $(function () {
            $(".nav-link").on('click', function () {
                var t = $(this).attr("href");
                if (t && t != '#') {
                    $('.active').removeClass('active');
                    $("html, body").animate({
                        scrollTop: $(t).offset().top - 50
                    }, {
                        duration: 1e3,
                    });

                    $('body').animate({ target: '#navbar_top', offset: $(t).offset().top });
                    $(this).parent().addClass('active');
                    return false;
                }else{
                    $('body').animate({ target: '#navbar_top', offset: 0 });
                }
            });
        })
    }, []);



    const handleLogout = () => {
        localStorage.clear()
        history.push(ROUTES.HOME)
        window.location.reload()
    }

    return (
        <nav id="navbar_top" className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img className="logo-black" src="/img/logo-white.png" style={{ height: '36px' }} />
                    <img className="logo-white" src="/img/logo-2.png" style={{ height: '36px' }} />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="main_nav">
                    <ul className="navbar-nav ml-auto">
                        {
                            !showLogout &&
                            <li className="nav-item"><a className="nav-link" href="https://accounts.uniworld.io/" target="blank"> Buy UNW </a></li>
                        }
                        {
                            !showLogout &&
                            <li className="nav-item"><a className="nav-link" href="#about"> About </a></li>
                        }
                        {
                            !showLogout &&
                            <li className="nav-item"><a className="nav-link" href="#faq"> FAQs </a></li>
                        }
                        {
                            !showLogout &&
                            <li className="nav-item nav-item-fixed">
                                <a href="#" className="nav-link btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#modalGuide">
                                    New Wallet
                    </a>
                            </li>
                        }
                        {
                            !showLogout &&
                            <li className="nav-item nav-item-fixed">
                                <a href="#" className="nav-link btn btn-danger btn-sm" data-toggle="modal" data-target="#modalAccessWallet">
                                    Access
                    </a>
                            </li>}
                        {
                            showLogout &&
                            <li className="nav-item"><a className="nav-link" href="/"><i className="fa fa-tachometer mr-2"></i>Dashboard </a></li>
                        }
                        {
                            showLogout &&
                            <li className="nav-item"><a className="nav-link" href="#" data-toggle="modal" data-target="#modalSend"><i className="fa fa-paper-plane-o mr-2"></i>Send </a></li>
                        }
                        {
                            showLogout &&
                            <li className="nav-item"><a className="nav-link" href="#" data-toggle="modal" data-target="#modalRequest"><i className="fa fa-random mr-2"></i>Request </a></li>
                        }
                        {
                            showLogout &&
                            <li className="nav-item"><a className="nav-link" href="#" onClick={handleLogout}> Logout </a></li>
                        }
                    </ul>
                </div>
                {/* navbar-collapse.// */}
            </div>
        </nav>
    );
}

export default Navigation;