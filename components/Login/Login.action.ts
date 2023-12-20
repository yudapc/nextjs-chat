import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { v4 as uuidv4 } from "uuid";

export const useLoginAction = () => {
  const router = useRouter();
  const expirationDays = 365; // 365 days
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);

  const handleLogin = () => {
    const userId = uuidv4();
    setCookie("userId", userId, {
      expires: expirationDate,
    });
    router.push("/chat/123");
  };

  return {
    handleLogin,
  };
};
