import React, { useContext, useState } from 'react';

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setUser] = useState(JSON.parse(localStorage.getItem('restaurappUser')))

  const setAuthUser = (user) => {
    if (currentUser === null)
    localStorage.setItem('restaurappUser', JSON.stringify(user));
    setUser(user)
  }

  return (
    <AuthContext.Provider value={{ currentUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext)

export default AuthContext;
