import React, { useEffect, useContext } from "react";
import { Context as GeneralInformationContext } from "../../context/GeneralInformationContext";
import "./GeneralInformation.css";
import Header from "../header/Header";

const GeneralInformation = () => {
  const { state, getGeneralInformations } = useContext(
    GeneralInformationContext
  );

  useEffect(() => {
    const fetchGeneralInformation = async () => {
      await getGeneralInformations();
    };

    fetchGeneralInformation();
  }, []);

  const renderedResults = state.map((result) => {
    return (
      <div className="card" key={result.id}>
        {result.information_label}
      </div>
    );
  });

  return (
    <div className="container">
      <Header />
      <div className="grid">{renderedResults}</div>
    </div>
  );
};

export default GeneralInformation;
