import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context as CustomerContext } from "../../context/CustomerContext";
import "./Customers.css";
import Header from "../header/Header";

const Customers = () => {
  const { state, getCustomers } = useContext(CustomerContext);

  useEffect(() => {
    const fetchCustomers = async () => {
      await getCustomers();
    };

    fetchCustomers();
  }, []);

  const renderedResults = state.map((result) => {
    let location = "";
    let collectionCount = `${result.collections.length} Collections`;
    let imageSrc = "";

    if (!result.city && !result.state) {
      location = "No location";
    } else if (!result.city) {
      location = result.state;
    } else if (!result.state) {
      location = result.city;
    } else {
      location = `${result.city}, ${result.state}`;
    }

    if (result.collections.length === 1) {
      collectionCount = `${result.collections.length} Collection`;
    }

    if (result.customer_photos.length == 0) {
      imageSrc = `${process.env.PUBLIC_URL}/logo.jpg`;
    } else {
      imageSrc = result.customer_photos[0].url;
    }

    return (
      <Link to={`customer/${result.id}`} className="card-link" key={result.id}>
        <div className="card">
          <div className="image">
            <img src={imageSrc} />
          </div>
          <div className="content">
            <div className="name">
              {result.firstName} {result.lastName}
            </div>
            <div className="info">
              <div className="location">{location}</div>
              <div className="collectionCount">{collectionCount}</div>
            </div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="container">
      <Header />
      <div className="grid">{renderedResults}</div>
    </div>
  );
};

export default Customers;
