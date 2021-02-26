import createDataContext from "./createDataContext";
import spireApi from "../api/spire";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return {
        errorMessage: "",
        accessToken: action.payload.headers["access-token"],
        client: action.payload.headers.client,
        uid: action.payload.headers.uid,
        expiry: action.payload.headers.expiry,
        tokenType: action.payload.headers["token-type"],
        userFirstName: action.payload.data.data["first_name"],
        userLastName: action.payload.data.data["last_name"],
        userEmail: action.payload.data.data.email,
      };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await spireApi.post("/api/auth/sign_in", {
      email,
      password,
    });
    let headers = response.headers;
    let data = response.data;

    dispatch({ type: "signin", payload: response });
    localStorage.setItem(
      "auth",
      JSON.stringify({
        headers: {
          "access-token": headers["access-token"],
          client: headers.client,
          uid: headers.uid,
          expiry: headers.expiry,
          "token-type": headers["token-type"],
        },
        data: {
          data: {
            first_name: data.data["first_name"],
            last_name: data.data["last_name"],
            email: data.data.email,
          },
        },
      })
    );
    return true;
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    });
    return false;
  }
};

const signout = (dispatch) => {
  return () => {
    // somehow signout
  };
};

const tryLocalSignin = (dispatch) => async () => {
  const auth = await JSON.parse(localStorage.getItem("auth"));

  if (auth) {
    dispatch({ type: "signin", payload: auth });

    // navigate to homepage
    return true;
  } else {
    // navigate to login
    return false;
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, tryLocalSignin },
  {
    "access-token": null,
    client: null,
    uid: null,
    expiry: null,
    "token-type": null,
    errorMessage: "",
    userFirstName: "",
    userLastName: "",
    userEmail: "",
  }
);
