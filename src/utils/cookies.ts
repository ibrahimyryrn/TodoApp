import Cookies from "js-cookie";

// Token ve kullanıcı ID'sini cookie'ye yazma
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

// Cookie'den token ve kullanıcı ID'sini okuma
export const getAuthData = (): { token?: string; userId?: string } => {
  return {
    token: Cookies.get("accessToken"),
    userId: Cookies.get("userId"),
  };
};

// Cookie'den token ve kullanıcı ID'sini silme
export const removeAuthData = (): void => {
  Cookies.remove("accessToken");
  Cookies.remove("userId");
};
