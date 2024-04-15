import useAsync from "@/api/base.api.ts";
import type { IResponse } from "@/types/api.ts";
import { APIPaths } from "@/types/api.ts";
import { axiosInstanceAuth } from "@/services/axios.ts";
import showNotifications, { ToastVersions } from "@/services/toast/showNotifications.tsx";

export interface IAddProductPayload {
  name: string;
  price: number
}

export interface IBuyProductsResponse {
  _id: string;
  token: string;
  username: string;
  refreshToken: string;
}

const addProduct = async (addProduct: IAddProductPayload) => {
  const { data } = await axiosInstanceAuth.post(APIPaths.AddProduct, addProduct);

  return data;
};

const useAddProduct = () => {
  const { isLoading, error, data, executeFn } = useAsync<IResponse<IBuyProductsResponse>, IAddProductPayload>(addProduct);

  if (error) {
    showNotifications({ type: ToastVersions.error, title: "Adding Product: ", description: error });
  }

  if (!isLoading && data?.result) {
    showNotifications({ type: ToastVersions.success, title: "Adding Product: ", description: data.message });
  }


  return {
    executeFn,
    isLoading,
    error,
  };
};

export default useAddProduct;