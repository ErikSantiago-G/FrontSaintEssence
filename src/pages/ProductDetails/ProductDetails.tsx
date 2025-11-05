import { useParams } from "react-router-dom";
import { useProductStore } from "../../store/useProductStore";
import { useEffect, useState } from "react";
import { Product } from "../../api/types/product";
import ProductGallery from "../../components/ProductDetails/ProductGallery/ProductGallery";
import ProductInfo from "../../components/ProductDetails/ProductInfo/ProductInfo";
import ProductTabs from "../../components/ProductDetails/ProductTabs/ProductTabs";
import FullScreenSpinner from "../../components/FullScreenSpinner/FullScreenSpinner";
import "./ProductDetails.scss";
import ProductNotFound from "../../components/ProductDetails/ProductNotFound/ProductNotFound";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [productFinal, setProductFinal] = useState<Product>();
  const { product: productResponse, loading, fetchProductById } = useProductStore();

  useEffect(() => {
    fetchProductById(id!);
  }, [id, fetchProductById]);

  useEffect(() => {
    if (productResponse) {
      setProductFinal(productResponse);
    }
  }, [productResponse]);

  if (loading) return <FullScreenSpinner />;
  if (!productFinal) return <ProductNotFound />

  return (
    <main className="product-details">
      <section className="product-details__container">
        <article className="product-details__main">
          <ProductGallery images={productFinal.images} />
          <ProductInfo product={productFinal} />
        </article>
        <ProductTabs product={productFinal} />
      </section>
    </main>
  );
};

export default ProductDetails;
