import createDataContext from "./createDataContext";
import spireApi from "../api/spire";

const artistReducer = (state, action) => {
  switch (action.type) {
    case "get_artists":
      return action.payload;
    default:
      return state;
  }
};

const getArtists = (dispatch) => async () => {
  try {
    const response = await spireApi.get("/api/artist");

    dispatch({ type: "get_artists", payload: response.data });
  } catch (err) {
    console.log(`Error fetching artists: ${err}`);
  }
};

export const { Provider, Context } = createDataContext(
  artistReducer,
  { getArtists },
  []
);
