import { useOrdersPage } from "~/Orders/containers";
import { Spinner } from "~/shared/components";

const OrdersPage = () => {
  const { data, error, isLoading } = useOrdersPage();

  if (isLoading) {
    return <Spinner message="Loading..." />;
  }
  return (
    <div>
      <ul>
        {(data as any)?.map((item: any) => {
          return (
            <li key={item._id}>
              {item.products.map((i: any) => i.product.productName)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrdersPage;
