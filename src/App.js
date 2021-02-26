import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import Customers from "./components/customers/Customers";
import Customer from "./components/customers/Customer";
import Artists from "./components/artists/Artists";
import GeneralInformation from "./components/generalInformation/GeneralInformation";
import { Provider as AuthProvider } from "./context/AuthContext";
import { Provider as CustomerProvider } from "./context/CustomerContext";
import { Provider as ArtistProvider } from "./context/ArtistContext";
import { Provider as GeneralInformationProvider } from "./context/GeneralInformationContext";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

export default () => {
  return (
    <div>
      <AuthProvider>
        <CustomerProvider>
          <ArtistProvider>
            <GeneralInformationProvider>
              <BrowserRouter>
                <Route path="/" exact component={Login} />
                <PrivateRoute path="/customers" exact component={Customers} />
                <PrivateRoute path="/artists" exact component={Artists} />
                <PrivateRoute
                  path="/general-information"
                  exact
                  component={GeneralInformation}
                />
                <PrivateRoute path="/customer/:id" component={Customer} />
              </BrowserRouter>
            </GeneralInformationProvider>
          </ArtistProvider>
        </CustomerProvider>
      </AuthProvider>
    </div>
  );
};
