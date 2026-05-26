import { useCallback, useEffect, useMemo, useState } from "react";
import AuthContext from "./auth-context";
import { AUTH_ENDPOINTS, getAuthConfig, resolveApiUrl } from "../Servicos/cheerApi";

const fallbackConfig = {
  authenticated: false,
  loginUrl: AUTH_ENDPOINTS.login,
  logoutUrl: AUTH_ENDPOINTS.logout,
  mode: null,
};

function normalizeConfig(response) {
  const config = response || {};
  const data = config.data || {};
  const loginUrl = config.login_url || data.login_url;
  const logoutUrl = config.logout_url || data.logout_url;

  return {
    authenticated: Boolean(config.authenticated ?? data.authenticated),
    loginUrl: loginUrl ? resolveApiUrl(loginUrl) : fallbackConfig.loginUrl,
    logoutUrl: logoutUrl ? resolveApiUrl(logoutUrl) : fallbackConfig.logoutUrl,
    mode: data.mode || config.mode || null,
  };
}

function AuthProvider({ children }) {
  const [session, setSession] = useState({
    status: "loading",
    config: fallbackConfig,
    error: null,
  });

  const refreshSession = useCallback(async () => {
    setSession((currentSession) => ({
      ...currentSession,
      status: "loading",
      error: null,
    }));

    try {
      const config = normalizeConfig(await getAuthConfig());

      setSession({
        status: config.authenticated ? "authenticated" : "anonymous",
        config,
        error: null,
      });

      return config;
    } catch (error) {
      setSession((currentSession) => ({
        ...currentSession,
        status: "error",
        error,
      }));

      return null;
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = useCallback(() => {
    window.location.assign(session.config.loginUrl);
  }, [session.config.loginUrl]);

  const logout = useCallback(() => {
    const form = document.createElement("form");
    form.method = "post";
    form.action = session.config.logoutUrl;
    form.hidden = true;
    document.body.appendChild(form);
    form.submit();
  }, [session.config.logoutUrl]);

  const value = useMemo(() => ({
    authenticated: session.config.authenticated,
    status: session.status,
    error: session.error,
    login,
    logout,
    refreshSession,
  }), [login, logout, refreshSession, session]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
