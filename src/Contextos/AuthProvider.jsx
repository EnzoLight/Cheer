import { useCallback, useEffect, useMemo, useState } from "react";
import AuthContext from "./auth-context";
import { AUTH_ENDPOINTS, getAuthConfig, getProfile, resolveApiUrl } from "../Servicos/cheerApi";

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
    profile: null,
    profileStatus: "idle",
    profileError: null,
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

      if (!config.authenticated) {
        setSession({
          status: "anonymous",
          config,
          profile: null,
          profileStatus: "idle",
          profileError: null,
          error: null,
        });

        return config;
      }

      setSession({
        status: "authenticated",
        config,
        profile: null,
        profileStatus: "loading",
        profileError: null,
        error: null,
      });

      try {
        const profileResponse = await getProfile();
        const profile = profileResponse.data || null;

        setSession({
          status: "authenticated",
          config,
          profile,
          profileStatus: "loaded",
          profileError: null,
          error: null,
        });
      } catch (profileError) {
        setSession({
          status: "authenticated",
          config,
          profile: null,
          profileStatus: "error",
          profileError,
          error: null,
        });
      }

      return config;
    } catch (error) {
      setSession({
        status: "error",
        config: fallbackConfig,
        profile: null,
        profileStatus: "idle",
        profileError: null,
        error,
      });

      return null;
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!session.config.authenticated) {
      return null;
    }

    setSession((currentSession) => ({
      ...currentSession,
      profileStatus: "loading",
      profileError: null,
    }));

    try {
      const profileResponse = await getProfile();
      const profile = profileResponse.data || null;

      setSession((currentSession) => ({
        ...currentSession,
        profile,
        profileStatus: "loaded",
        profileError: null,
      }));

      return profile;
    } catch (profileError) {
      setSession((currentSession) => ({
        ...currentSession,
        profile: null,
        profileStatus: "error",
        profileError,
      }));

      return null;
    }
  }, [session.config.authenticated]);

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

  const accountType = session.profile?.tipo || null;
  const isVoluntario = accountType === "voluntario";
  const isInstituicao = accountType === "instituicao";

  const value = useMemo(() => ({
    authenticated: session.config.authenticated,
    status: session.status,
    error: session.error,
    profile: session.profile,
    profileStatus: session.profileStatus,
    profileError: session.profileError,
    accountType,
    isVoluntario,
    isInstituicao,
    login,
    logout,
    refreshSession,
    refreshProfile,
  }), [accountType, isInstituicao, isVoluntario, login, logout, refreshProfile, refreshSession, session]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
