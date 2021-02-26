import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import spireApi from "../../api/spire";
import "./Customer.css";
import Header from "../header/Header";

const Customer = (props) => {
  const auth = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const customerId = props.match.params.id;

  useEffect(() => {
    const getCustomer = async () => {
      const res = await spireApi.get(`/api/customer/${customerId}`, {
        headers: {
          "access-token": auth.state.accessToken,
          client: auth.state.client,
          uid: auth.state.uid,
          expiry: auth.state.expiry,
          "token-type": auth.state.tokenType,
        },
      });

      setResults(res.data);
    };
    getCustomer();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="customer">
        Customer - {results.firstName} {results.lastName}
      </div>
    </div>
  );
};

export default Customer;
