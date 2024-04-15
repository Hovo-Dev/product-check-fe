import classNames from "classnames";

interface Props {
  name: string;
  price: number;
  className?: string;
}

const ProductItem = ({ price, name, className, ...props }: Props) => {
  return (
    <div className={classNames("p-2.5 border border-black shadow-1xl flex justify-between items-center", className)} {...props}>
      <p className="text-xl">{name}</p>
      <p className="text-xl">{price}$</p>
    </div>
  );
};

export default ProductItem;
