import React, { useContext, useState, useCallback, createContext} from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setUser] = useState(
    JSON.parse(localStorage.getItem('restaurappUser'))
  );

  const setAuthUser = useCallback((user) => {
    if (currentUser === null)
      localStorage.setItem('restaurappUser', JSON.stringify(user));
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setAuthUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
