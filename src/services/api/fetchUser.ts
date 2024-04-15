import useAsync from "@/api/base.api.ts";
import { APIPaths } from "@/types/api.ts";
import type { IResponse } from "@/types/api.ts";
import { axiosInstanceAuth } from "@/services/axios.ts";
import showNotifications, { ToastVersions } from "@/services/toast/showNotifications.tsx";
import type { EUserType } from "@/types/user.ts";

export interface IUserResponse {
  _id: string;
  token: string;
  username: string;
  refreshToken: string;
  type: EUserType;
}

const fetchUser = async () => {
  const { data } = await axiosInstanceAuth.get(APIPaths.FetchUser);

  return data;
};

const useFetchUser = () => {
  const { isLoading, error, data, executeFn } = useAsync<IResponse<IUserResponse>>(fetchUser);

  if (error) {
    showNotifications({ type: ToastVersions.error, title: "Fetch User: ", description: error });
  }

  return {
    executeFn,
    isLoading,
    data,
    error,
  };
};

export default useFetchUser;