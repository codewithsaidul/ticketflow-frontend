import { useLogoutMutation } from "@/redux/api/authApi/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { logoutService } from "@/service/auth/logOutService";
import { useRouter } from "next/navigation";

export const useLogOut = () => {
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = () => logoutService(logoutMutation, dispatch, router);

  return { logout };
};