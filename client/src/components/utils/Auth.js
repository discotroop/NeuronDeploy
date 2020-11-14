import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext
} from "react";
import Verify from "./Verify";

const AuthDataContext = createContext({});

const initialAuthData = {};

const AuthDataProvider = props => {
  const [authData, setAuthData] = useState(initialAuthData);

  /* The first time the component is rendered, it tries to
   * fetch the auth data from a source, like a cookie or
   * the localStorage.
   */
  useEffect(() => {
    const currentAuthData = Verify();
    if (currentAuthData) {
      setAuthData(currentAuthData);
    }
  }, []);

  const onLogout = () => setAuthData(initialAuthData);

  const onLogin = newAuthData => setAuthData(newAuthData);

  const authDataValue = useMemo({ ...authData, onLogin, onLogout }, [authData]);

  return <AuthDataContext.Provider value={authDataValue} {...props} />;
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;
