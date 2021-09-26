import { useCallback, useMemo } from "react";

export const USER_LOGOUT_KEY = "USER_LOGOUT";

export const useLogout = () => {
  const isUserLogout = useMemo(() => {
    return window.localStorage.getItem(USER_LOGOUT_KEY, false);
  }, []);

  const onLogout = useCallback(() => {
    window.localStorage.setItem(USER_LOGOUT_KEY, true);
  }, []);

  return { isUserLogout, onLogout };
};
