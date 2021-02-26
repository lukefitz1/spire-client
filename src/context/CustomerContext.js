import createDataContext from "./createDataContext";
import spireApi from "../api/spire";

const customerReducer = (state, action) => {
  switch (action.type) {
    case "get_customers":
      return action.payload;
    default:
      return state;
  }
};

const getCustomers = (dispatch) => async () => {
  try {
    const response = await spireApi.get("/api/customer");

    dispatch({ type: "get_customers", payload: response.data });
  } catch (err) {
    console.log(`Error fetching customers: ${err}`);
  }
};

export const { Provider, Context } = createDataContext(
  customerReducer,
  { getCustomers },
  []
);
