import { FC, createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  userId: string | null;
  username: string | null;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  isAuthenticated: false,
  userId: null,
  username: null,
  logout: () => {},
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(() => {
    const _token = localStorage.getItem("accessToken");
    if (!_token) {
      return null;
    }
    const decoded = jwtDecode(_token);
    return decoded?.sub || null;
  });
  const [token, setToken] = useState<string | null>(() => {
      const _token = localStorage.getItem("accessToken");
      return _token ? JSON.parse(_token) : null;
    });

  const isAuthenticated = !!token;

  const logout = () => {
    setToken(null);
  };

  useEffect(() => {
    const handleToken = () => {
      if (token) {
        try {
          const decoded = jwtDecode<{
            exp: number;
            sub: string;
            _doc: { username: string };
          }>(token);
          const isExpired = decoded.exp * 1000 < Date.now();

          if (isExpired) {
            logout();
          } else {
            const _username = decoded?._doc?.username ?? null;
            setUsername(_username);
            setUserId(jwtDecode(token)?.sub || null);
          }

        } catch (error) {
          console.error("Invalid token", error);
          logout();
        }
      } else {
        localStorage.removeItem("accessToken");
        setUsername(null);
        setUserId(null);
      }
    };

    handleToken();

    if (token) {
      localStorage.setItem("accessToken", JSON.stringify(token));
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, isAuthenticated, userId, username, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
