import React, { useEffect, useContext } from "react";
import { Context as ArtistContext } from "../../context/ArtistContext";
import "./Artists.css";
import Header from "../header/Header";

const Artists = () => {
  const { state, getArtists } = useContext(ArtistContext);

  useEffect(() => {
    const fetchArtists = async () => {
      await getArtists();
    };

    fetchArtists();
  }, []);

  const renderedResults = state.map((result) => {
    let imageSrc = "";
    if (!result.artist_image.url) {
      imageSrc = `${process.env.PUBLIC_URL}/logo.jpg`;
    } else {
      imageSrc = result.artist_image.url;
    }

    return (
      <div className="card" key={result.id}>
        <div className="artists">
          <div className="image">
            <img src={imageSrc} />
          </div>
          <div className="content">
            {result.firstName} {result.lastName}
          </div>
          <div className="info">
            <div className="artist-info">{result.additionalInfo}</div>
          </div>
        </div>
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

export default Artists;
