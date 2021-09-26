import React from "react";
import { Header } from "./Header";
import { Page } from "../app/layouts/Page";

export const PrivateLayout = ({ children }) => {
  return (
    <>
      <Page>
        <Header />
        {children}
      </Page>
    </>
  );
};
