import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import Header from './shared/layout/Header';
import Footer from './shared/layout/Footer';
import { get } from "lodash";
import BlockUi from "react-block-ui"
import "react-block-ui/style.css";
import BannerComponent from './shared/BannerComponent';
export const PrivateLayout = ({ children, ...rest }) => {
    const { alert, utils } = useSelector(state => state);
    const showBlockUI = useSelector((state) =>
        get(state, "utils.blocking", false)
    );
    return (
        <>
            <BlockUi tag="div" blocking={showBlockUI}>
                <Header />
               
                {children}
                <Footer />
            </BlockUi>
        </>
    );
};