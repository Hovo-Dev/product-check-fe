import useAsync from "@/api/base.api.ts";
import type { IResponse } from "@/types/api.ts";
import { APIPaths } from "@/types/api.ts";
import { axiosInstance } from "@/services/axios.ts";
import showNotifications, { ToastVersions } from "@/services/toast/showNotifications.tsx";
import LocalStorageService from "@/services/localStorage.service.ts";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "@/routing/routing.constants.ts";
import { EUserType } from "@/types/user.ts";
import { IUserResponse } from "@/api/fetchUser.ts";

export interface ILoginPayload {
  username: string;
  password: string;
}

const loginUser = async (loginPayload: ILoginPayload) => {
  const { data } = await axiosInstance.post(APIPaths.Login, loginPayload);

  return data;
};

const useLoginUser = () => {
  const navigate = useNavigate();
  const { isLoading, error, data, executeFn } = useAsync<IResponse<IUserResponse>, ILoginPayload>(loginUser);

  if (error) {
    showNotifications({ type: ToastVersions.error, title: "User Login: ", description: error });
  }

  if (!isLoading && data?.result) {
    showNotifications({ type: ToastVersions.success, title: "User Login: ", description: data.message });

    const resultData = data?.result;

    LocalStorageService.setToken(resultData.token);
    LocalStorageService.setRefreshToken(resultData.refreshToken);

    if (resultData?.type === EUserType.Admin) {
      navigate(RoutePaths.Admin);
    } else {
      navigate(RoutePaths.Employee);
    }
  }


  return {
    executeFn,
    isLoading,
    error,
  };
};

export default useLoginUser;