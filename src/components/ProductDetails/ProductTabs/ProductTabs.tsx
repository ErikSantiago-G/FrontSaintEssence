import type { ProductDetailsProps } from "../interfaces/ProductDetailsProps";
import './ProductTabs.scss';

const ProductTabs: React.FC<ProductDetailsProps> = ({ product }) => {

  return (
    <section className="product-tabs">
      <h3 className="product-tabs__tab">Description</h3>

      <article className="product-tabs__content">
        <>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
{/* 
          <h3>Más detalles</h3>
          <ul>
            {product.details?.map((data, index) => (
              <li key={index}>
                <ChevronsRight /> {data}
              </li>
            ))}
          </ul> */}
        </>
      </article>
    </section>
  );
};

export default ProductTabs;
