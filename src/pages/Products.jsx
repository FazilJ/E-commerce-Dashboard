import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productsSlice";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const Products = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") return (
    <div className="d-flex justify-content-center p-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (status === "failed") return (
    <div className="alert alert-danger m-4" role="alert">
      Error fetching products.
    </div>
  );

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>
        <button className="btn btn-primary">
          <FaPlus className="me-2" /> Add Product
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="position-relative">
                <img 
                  src={product.image} 
                  className="card-img-top p-3" 
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'contain' }}
                />
                <span className="position-absolute top-0 end-0 badge bg-primary m-2">
                  ${product.price}
                </span>
              </div>
              <div className="card-body">
                <h5 className="card-title text-truncate" title={product.title}>
                  {product.title}
                </h5>
                <p className="card-text text-muted small" style={{ height: '3em', overflow: 'hidden' }}>
                  {product.description}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-secondary">
                    {product.category}
                  </span>
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-primary">
                      <FaEdit /> Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-white">
                <small className="text-muted">
                  Rating: {product.rating?.rate} ({product.rating?.count} reviews)
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
