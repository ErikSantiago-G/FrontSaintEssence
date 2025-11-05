import { useNavigate } from "react-router-dom"

const ProductNotFound = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <section className="product-details__notfound">
            <p>Producto no encontrado</p>

            <button onClick={handleBack} className="btn btn-primary">Volver</button>
        </section>
    )
}

export default ProductNotFound