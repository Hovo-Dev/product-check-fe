import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "@/atom/Input.tsx";
import Button from "@/atom/Button.tsx";
import formatDate from "@/util/date.ts";
import { ESize } from "@/types/global.ts";
import { EInputType } from "@/types/input.ts";
import countDuplicates from "@/util/product.ts";
import useAddProduct from "@/api/addProduct.ts";
import UserLayout from "@/layout/UserLayout.tsx";
import useFetchProducts from "@/api/fetchProducts.ts";
import type { IAddProductPayload } from "@/api/addProduct.ts";
import fetchEmployeeHistory from "@/api/fetchEmployeeHistory.ts";

const AdminPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddProductPayload>({
    mode: "onSubmit",
  });
  const { data: productsHistoryData, executeFn: fetchHistoryQuery} = fetchEmployeeHistory();
  const { data: productsData, executeFn: fetchProductsQuery } = useFetchProducts();
  const { executeFn: addProductMutation, isLoading } = useAddProduct();

  useEffect(() => {
    fetchHistoryQuery();
    fetchProductsQuery();
  }, []);

  const onAddProductSubmitHandler = useCallback(async (data: IAddProductPayload) => {
    await addProductMutation(data);
    await fetchProductsQuery();
    reset()
  }, []);

  return (
    <UserLayout>
      <h1 className='text-xl'>Admin Page</h1>
      <section className='w-full'>
        <h2 className="text-xl mb-4">Buyers History</h2>
        <table className="relative border-separate overflow-x-auto w-full text-left">
          <thead className="text-xs uppercase bg-gray300 text-white">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap text-white">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Products
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Total amount $
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
          </thead>
          <tbody>
          {productsHistoryData?.result.map((item, index) => (
            <tr key={item._id} className="border-b bg-gray200 text-white border-gray200">
              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">{index + 1}</th>
              <th className="px-6 py-4">{item.username}</th>
              <th className="px-6 py-4">
                {countDuplicates(item.products).map(({ name, count }) => (
                  <p key={count + index}>
                    {count > 1 ? `(${count})` : null}
                    {name},
                  </p>
                ))}
              </th>
              <th className="px-6 py-4">{item.total}$</th>
              <th className="px-6 py-4">{formatDate(item.date)}</th>
            </tr>
          ))}
          </tbody>
        </table>
      </section>
      <section className="w-full">
        <h2 className="text-xl mb-4">Products</h2>
        <table className="border-separate relative overflow-x-auto w-full text-left">
          <thead className="text-xs uppercase bg-gray300 text-white">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium whitespace-nowrap text-white">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Product price
            </th>
          </tr>
          </thead>
          <tbody>
          {productsData?.result.map((item, index) => (
            <tr key={item._id} className="border-b bg-gray200 text-white border-gray200">
              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">{index + 1}</th>
              <th className="px-6 py-4">{item.name}</th>
              <th className="px-6 py-4">{item.price}$</th>
            </tr>
          ))}
          </tbody>
        </table>
        <form onSubmit={handleSubmit(onAddProductSubmitHandler)} className="flex items-center space-x-5 mt-11">
          <Input
            register={register}
            rules={{ required: "Name Required" }}
            maxLength={25}
            size={ESize.Small}
            placeholder="Name"
            name="name"
            error={errors.name?.message}
          />
          <Input
            name="price"
            placeholder="Price"
            register={register}
            size={ESize.Small}
            type={EInputType.Text}
            error={errors.price?.message}
            rules={{ required: "Price Required" }}
          />
          <Button type="submit" disabled={isLoading} size={ESize.Small}>
            Add new product
          </Button>
        </form>
      </section>
    </UserLayout>
  );
};

export default AdminPage;