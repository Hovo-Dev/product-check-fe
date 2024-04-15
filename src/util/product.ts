import type { IProductDetail } from "@/api/fetchEmployeeHistory.ts";

type IProductCountReturnType = IProductDetail &  { count: number }

const countDuplicates = (products: IProductDetail[]): IProductCountReturnType[] => {
  const result = products.reduce((aggr, val) => {
    if (aggr[val.name]) {
      aggr[val.name] = aggr[val.name] + 1;
      return aggr;
    }

    aggr[val.name] = 1;
    return aggr;
  }, {});

  return Object.entries(result).map(product => ({ name: product[0], count: product[1] }));
};

export default countDuplicates;