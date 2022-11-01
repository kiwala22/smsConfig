import React, {
  FC,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useHttpRequest } from "./api";
import { notification } from "antd";

interface State {
  user: string;
  message: string;
  isAuthenticated: boolean;
}

type LoginAction = {
  type: "LOGIN";
  payload: {
    user: string;
    message: string;
  };
};

type LogoutAction = {
  type: "LOGOUT";
};

type Action = LoginAction | LogoutAction;

interface AuthContextValue extends State {
  login: () => void;
  logout: () => void;
}

const initialState: State = {
  user: "",
  message: "",
  isAuthenticated: false,
};

const handlers: Record<string, (state: State, action: Action) => State> = {
  LOGIN: (state: State, action: LoginAction | any): State => {
    return {
      ...state,
      ...action.payload,
      isAuthenticated: true,
    };
  },
  LOGOUT: (state: State): State => ({
    ...state,
    ...initialState,
    isAuthenticated: false,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthorizationContext = createContext<AuthContextValue>({
  ...initialState,
  login: () => {},
  logout: () => {},
});

export const useAuthentication = () => useContext(AuthorizationContext);

export const AuthenticationProvider: FC<{
  children: ReactNode;
}> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const http = useHttpRequest();

  const logout = () => {
    http
      .delete("/users/sign_out")
      .then(() => {
        dispatch({
          type: "LOGOUT",
        });
      })
      .catch((error) => {
        notification.error({ message: error?.message });
      });
  };

  const login = () => {
    http
      .get("/api/v2/check_user")
      .then((response) => {
        dispatch({
          type: response.message === "Unauthorized" ? "LOGOUT" : "LOGIN",
          payload: response,
        });
      })
      .catch(logout);
  };

  useEffect(login, []);

  return (
    <AuthorizationContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthorizationContext.Provider>
  );
};
