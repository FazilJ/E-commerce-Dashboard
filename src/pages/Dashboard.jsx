import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaUsers, FaBox, FaDollarSign } from 'react-icons/fa';
import { fetchDashboardData } from '../store/slices/dashboardSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, users, orders, status } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error loading dashboard data</div>;

  // Calculate total revenue
  const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0;

  return (
    <div className="container-fluid p-4">
      <div className="row g-4 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card bg-primary text-white h-100">
            <div className="card-body d-flex align-items-center">
              <div className="me-3">
                <FaDollarSign size={30} />
              </div>
              <div>
                <h5 className="card-title mb-0">Total Revenue</h5>
                <h3 className="mb-0">${totalRevenue.toFixed(2)}</h3>
                <small>From {orders?.length || 0} orders</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card bg-success text-white h-100">
            <div className="card-body d-flex align-items-center">
              <div className="me-3">
                <FaShoppingCart size={30} />
              </div>
              <div>
                <h5 className="card-title mb-0">Orders</h5>
                <h3 className="mb-0">{orders?.length || 0}</h3>
                <small>Total Orders</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card bg-warning text-white h-100">
            <div className="card-body d-flex align-items-center">
              <div className="me-3">
                <FaBox size={30} />
              </div>
              <div>
                <h5 className="card-title mb-0">Products</h5>
                <h3 className="mb-0">{products?.length || 0}</h3>
                <small>Total Products</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card bg-info text-white h-100">
            <div className="card-body d-flex align-items-center">
              <div className="me-3">
                <FaUsers size={30} />
              </div>
              <div>
                <h5 className="card-title mb-0">Customers</h5>
                <h3 className="mb-0">{users?.length || 0}</h3>
                <small>Registered Users</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Recent Orders</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Products</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.slice(0, 5).map((order) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.userId}</td>
                        <td>{order.products?.length} items</td>
                        <td>${order.total}</td>
                        <td>
                          <span className={`badge bg-${order.status === 'completed' ? 'success' : 'warning'}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
