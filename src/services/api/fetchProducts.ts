import useAsync from "@/api/base.api.ts";
import { APIPaths } from "@/types/api.ts";
import type { IResponse } from "@/types/api.ts";
import { axiosInstance } from "@/services/axios.ts";
import showNotifications, { ToastVersions } from "@/services/toast/showNotifications.tsx";

export interface IProductsResponse  {
  _id: string;
  name: string;
  price: number;
}

const fetchProducts = async () => {
  const { data } = await axiosInstance.get(APIPaths.FetchProducts);

  return data;
};

const useFetchProducts = () => {
  const { isLoading, error, data, executeFn } = useAsync<IResponse<IProductsResponse[]>>(fetchProducts);

  if (error) {
    showNotifications({ type: ToastVersions.error, title: "Fetch Products: ", description: error });
  }

  return {
    executeFn,
    isLoading,
    data,
    error,
  };
};

export default useFetchProducts;