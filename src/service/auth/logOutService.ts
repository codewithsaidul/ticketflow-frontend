import { AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { clearUser } from "@/redux/slice/auth.slice";
import { authApi } from "@/redux/api/authApi/authApi";
import { IApiErrorResponse } from "@/types";
import { deleteCookie } from "./deleteCookie";

type RouterType = ReturnType<typeof useRouter>;


export const logoutService = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logoutMutation: any,
  dispatch: AppDispatch,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  router: RouterType,
) => {
  const toastId = toast.loading("Logging out...");

  try {
    const res = await logoutMutation(undefined).unwrap();

    if (res.success) {
      dispatch(clearUser());
      dispatch(authApi.util.resetApiState());

      toast.success(res.message, { id: toastId });

      await deleteCookie()


      return true;
    }
  } catch (error) {
    const err = error as IApiErrorResponse;

    toast.error(err?.data?.message || "Logout failed", {
      id: toastId,
    });

    return false;
  }
};