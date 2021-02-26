import createDataContext from "./createDataContext";
import spireApi from "../api/spire";

const generalInformationReducer = (state, action) => {
  switch (action.type) {
    case "get_general_informations":
      return action.payload;
    default:
      return state;
  }
};

const getGeneralInformations = (dispatch) => async () => {
  try {
    const response = await spireApi.get("/api/general_informations");

    dispatch({ type: "get_general_informations", payload: response.data });
  } catch (err) {
    console.log(`Error fetching general info: ${err}`);
  }
};

export const { Provider, Context } = createDataContext(
  generalInformationReducer,
  { getGeneralInformations },
  []
);
