import React from 'react';
import Header from './shared/layout/Header';
import Footer from './shared/layout/Footer';

export const PrivateLayout = ({ children, ...rest }) => {


    return (
        <>

            <Header />

            {children}
            <Footer />

        </>
    );
};