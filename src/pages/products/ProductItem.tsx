import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { ProductsApi } from "../../api/domains/products.api";

export const ProductItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: product, isLoading, isError, error, } = useQuery({
    queryKey: ["products", id],
    queryFn: () => ProductsApi.getProduct(id),
  });

  if (isLoading) return <div className="text-center">loading...</div>;
  if (isError) return <div className="text-center text-red-500">Error: {error.message}</div>;
  console.log(product);

  return (
    <div className="flex flex-col items-center p-4">
      {/* Back Button */}
      <Button
        className="btn mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => navigate(-1)}
      >
        Back to List Posts
      </Button>

      {/* Product Card */}
      <div className="w-full md:w-1/2 bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Product Image */}
        <div className="w-full aspect-w-16 aspect-h-9 overflow-hidden flex justify-center">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-[50%] object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Title and Description */}
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded">
              {product.category}
            </span>
            {product.tags.map((tag: any) => (
              <span key={tag} className="inline-block bg-blue-500 text-white px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>

          {/* Price and Discount */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Price: ${product.price.toFixed(2)}</h2>
            <p className="text-sm text-gray-500">{product.discountPercentage}% off</p>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <div className="flex items-center">
              <div className="text-yellow-400 mr-2">
                {'★'.repeat(Math.round(product.rating))}{' '}
                {'☆'.repeat(5 - Math.round(product.rating))}
              </div>
              <p className="text-sm text-gray-500">({product.rating.toFixed(2)} out of 5)</p>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            <p className="text-sm">
              <strong>Stock Status:</strong> {product.availabilityStatus}
            </p>
            <p className="text-sm">
              <strong>Stock:</strong> {product.stock}
            </p>
          </div>

          {/* Shipping and Warranty */}
          <div className="mb-4">
            <h3 className="font-semibold">Shipping & Warranty:</h3>
            <p className="text-sm">{product.shippingInformation}</p>
            <p className="text-sm">{product.warrantyInformation}</p>
          </div>

          {/* Reviews */}
          <div className="mb-4">
            <h3 className="font-semibold">Reviews:</h3>
            {product.reviews.map((review: any, index: number) => (
              <div key={index} className="border-b border-gray-300 py-2">
                <p className="text-sm font-semibold">{review.reviewerName}</p>
                <div className="text-yellow-400 mb-1">
                  {'★'.repeat(review.rating)}{' '}
                  {'☆'.repeat(5 - review.rating)}
                </div>
                <p className="text-sm italic">"{review.comment}"</p>
              </div>
            ))}
          </div>

          {/* Return Policy */}
          <div className="mb-4">
            <h3 className="font-semibold">Return Policy:</h3>
            <p className="text-sm">{product.returnPolicy}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
