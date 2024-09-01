import Cookies from "js-cookie";

// Token'ı cookie'ye yazma
export const setToken = (token: string): void => {
  Cookies.set("accessToken", token, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
  });
};

// Cookie'den token okuma
export const getToken = (): string | undefined => {
  return Cookies.get("accessToken");
};

// Cookie'den token silme
export const removeToken = (): void => {
  Cookies.remove("accessToken");
};
