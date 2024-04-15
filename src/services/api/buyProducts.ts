import useAsync from "@/api/base.api.ts";
import type { IResponse } from "@/types/api.ts";
import { APIPaths } from "@/types/api.ts";
import { axiosInstanceAuth } from "@/services/axios.ts";
import showNotifications, { ToastVersions } from "@/services/toast/showNotifications.tsx";

export interface IBuyProductsPayload {
  productIds: string[]
}

export interface IBuyProductsResponse {
  _id: string;
  token: string;
  username: string;
  refreshToken: string;
}

const buyProducts = async (buyProducts: IBuyProductsPayload) => {
  const { data } = await axiosInstanceAuth.post(APIPaths.BuyProducts, buyProducts);

  return data;
};

const useBuyProducts = () => {
  const { isLoading, error, data, executeFn } = useAsync<IResponse<IBuyProductsResponse>, IBuyProductsPayload>(buyProducts);

  if (error) {
    showNotifications({ type: ToastVersions.error, title: "Product Purchase: ", description: error });
  }

  if (!isLoading && data?.result) {
    showNotifications({ type: ToastVersions.success, title: "Product Purchase: ", description: data.message });
  }


  return {
    executeFn,
    isLoading,
    error,
  };
};

export default useBuyProducts;