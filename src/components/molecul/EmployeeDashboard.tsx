import { useEffect, useMemo } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableColumn from "@/atom/dnd/DroppableColumn.tsx";
import DraggableItem from "@/atom/dnd/DraggableItem.tsx";
import ProductItem from "@/atom/ProductItem.tsx";
import Button from "@/atom/Button.tsx";
import { ESize } from "@/types/global.ts";
import useDrag from "@/hooks/useDrag.ts";
import useBuyProducts from "@/api/buyProducts.ts";
import useFetchProducts, { type IProductsResponse } from "@/api/fetchProducts.ts";

interface IDndColumns {
  products: {
    id: string;
    list: IProductsResponse[]
  },
  toBuy: {
    id: "toBuy",
    list: IProductsResponse[],
  },
}

const EmployeeDashboard = () => {
  const { data, isLoading, executeFn: fetchProductsQuery } = useFetchProducts();
  const { executeFn: buyProductsMutation } = useBuyProducts();

  const { onDragEnd, setColumns, columns } = useDrag<IDndColumns>({
    products: {
      id: "products",
      list: [],
    },
    toBuy: {
      id: "toBuy",
      list: [],
    },
  });

  const onProductBuyHandler = () => {
    buyProductsMutation({
      productIds: columns.toBuy.list.map(buy => buy._id),
    });
    setColumns(prev => ({
      ...prev,
      toBuy: {
        ...prev.toBuy,
        list: [],
      },
    }));
  };

  const totalPrice = useMemo(() => {
    return columns.toBuy.list.reduce((aggr, val) => {
      aggr += val.price;

      return aggr;
    }, 0);
  }, [JSON.stringify(columns.toBuy.list)]);

  useEffect(() => {
    fetchProductsQuery();
  }, []);

  useEffect(() => {
    if (!isLoading && data?.result) {
      setColumns(prev => ({
        ...prev,
        products: {
          ...prev.products,
          list: data.result,
        },
      }));
    }
  }, [data]);

  return (
    <section className="flex justify-between space-x-52 w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="shadow-1xl px-12 py-8 border border-black">
          <DroppableColumn droppableId={columns.products.id}>
            <div className="flex flex-col space-y-4 h-[480px] pr-2 overflow-y-auto min-w-[300px]">
              {!isLoading ? columns.products.list?.map(({ _id, name, price }, index) => (
                <DraggableItem key={_id} draggableId={_id} draggableIndex={index}>
                  <ProductItem name={name} price={price} />
                </DraggableItem>
              )) : (
                <>
                  <div className="w-[300px] h-[50px] bg-gray-400 animate-pulse duration-200" />
                  <div className="w-[300px] h-[50px] bg-gray-400 animate-pulse duration-200" />
                  <div className="w-[300px] h-[50px] bg-gray-400 animate-pulse duration-200" />
                  <div className="w-[300px] h-[50px] bg-gray-400 animate-pulse duration-200" />
                </>
              )}
            </div>
          </DroppableColumn>
        </div>
        <div className="shadow-1xl px-12 py-8 border border-black">
          <DroppableColumn droppableId={columns.toBuy.id}>
            <div className="flex flex-col space-y-4 h-[480px] pr-2 overflow-y-auto min-w-[300px]">
              {!isLoading ? columns.toBuy.list?.map(({ _id, name, price }, index) => (
                <DraggableItem key={_id} draggableId={_id} draggableIndex={index}>
                  <ProductItem key={_id} name={name} price={price} />
                </DraggableItem>
              )) : (
                <>
                  <div className="w-[300px] h-[50px] bg-gray-400 animate-pulse duration-200" />
                  <div className="w-[300px] h-[50px] bg-gray-400 animate-pulse duration-200" />
                  <div className="w-[300px] h-[50px] bg-gray-400 animate-pulse duration-200" />
                  <div className="w-[300px] h-[50px] bg-gray-400 animate-pulse duration-200" />
                </>
              )}
            </div>
          </DroppableColumn>
          <div className="flex justify-between space-x-4">
            <ProductItem name={"Total"} price={totalPrice} className="flex-1" />
            <Button size={ESize.Medium} disabled={isLoading} onClick={onProductBuyHandler}>
              Buy
            </Button>
          </div>
        </div>
      </DragDropContext>
    </section>
  );
};

export default EmployeeDashboard;