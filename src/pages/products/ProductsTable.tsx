import { useNavigate } from 'react-router-dom';
import { useProductsList } from './useProductsList';

export const ProductsTable = () => {
  const { products, pagination, setPagination } = useProductsList();
  const { pageIndex, pageSize } = pagination;
  const navigate = useNavigate();

  const selectPageHandler = (selectedPage: any) => {
    if (selectedPage >= 1 && selectedPage <= Math.ceil(products.length / pageSize) && selectedPage !== pageIndex) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: selectedPage,
      }));
    }
  };
  console.log(products);

  return (
    <>
      {products.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 p-5 lg:p-7">
          {products.slice((pageIndex - 1) * pageSize, pageIndex * pageSize).map(({ id, thumbnail, title, brand }: any) => (
            <div
              key={id}
              className="card bg-base-100 shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/products/${id}`)}
            >
              <figure>
                <img
                  className="h-52 w-52 lg:h-72 lg:w-72 rounded-lg object-cover"
                  src={thumbnail}
                  alt={title}
                />
              </figure>
              <div className="card-body items-center text-center">
                <h3>Title: {title}</h3>
                <h3>Brand: {brand}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="flex justify-center items-center space-x-2 mt-4">
          <span
            onClick={() => selectPageHandler(pageIndex - 1)}
            className={`btn btn-circle ${pageIndex > 1 ? '' : 'hidden'}`}
          >
            +
          </span>
          {[...Array(Math.ceil(products.length / pageSize))].map((_, i) => (
            <span
              onClick={() => selectPageHandler(i + 1)}
              key={i}
              className={`btn ${pageIndex === i + 1 ? 'btn-primary' : 'btn-secondary'} p-2`}
            >
              {i + 1}
            </span>
          ))}
          <span
            onClick={() => selectPageHandler(pageIndex + 1)}
            className={`btn btn-circle ${pageIndex < products.length / pageSize ? '' : 'hidden'}`}
          >
            -
          </span>
        </div>
      )}
    </>

  );
};
