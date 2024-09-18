import Cookies from "js-cookie";


export const setAuthData = (token: string, userId: string): void => {
  Cookies.set("accessToken", token, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
  });
  Cookies.set("userId", userId, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
  });
};


export const getAuthData = (): { token?: string; userId?: string } => {
  return {
    token: Cookies.get("accessToken"),
    userId: Cookies.get("userId"),
  };
};


export const removeAuthData = (): void => {
  Cookies.remove("accessToken");
  Cookies.remove("userId");
};
