import useAsync from "@/api/base.api.ts";
import { APIPaths } from "@/types/api.ts";
import type { IResponse } from "@/types/api.ts";
import { axiosInstanceAuth } from "@/services/axios.ts";
import showNotifications, { ToastVersions } from "@/services/toast/showNotifications.tsx";

export interface IProductDetail {
  id: string,
  name: string
}

export interface IProductHistoryResponse  {
  _id: string;
  username: string;
  total: number;
  date: Date;
  products: IProductDetail[];
}

const fetchHistory = async () => {
  const { data } = await axiosInstanceAuth.get(APIPaths.FetchEmployeeHistoryProducts);

  return data;
};

const useFetchEmployeeHistory = () => {
  const { isLoading, error, data, executeFn } = useAsync<IResponse<IProductHistoryResponse[]>>(fetchHistory);

  if (error) {
    showNotifications({ type: ToastVersions.error, title: "Fetch Employee History Products: ", description: error });
  }

  return {
    executeFn,
    isLoading,
    data,
    error,
  };
};

export default useFetchEmployeeHistory;