import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/slices/ordersSlice";
// Import each component individually to avoid bundling issues
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, status } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <CircularProgress />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <Alert severity="error" sx={{ margin: "1rem" }}>
        Error fetching orders.
      </Alert>
    );
  }

  const getStatusColor = (orderStatus) => {
    // Add null check and default value
    if (!orderStatus) return "default";
    
    switch (orderStatus.toLowerCase()) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order?.id || 'unknown'} hover>
                <TableCell>{order?.id || 'N/A'}</TableCell>
                <TableCell>
                  {order?.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell>{order?.customerName || 'N/A'}</TableCell>
                <TableCell>
                  <Chip
                    label={order?.status || 'Unknown'}
                    color={getStatusColor(order?.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  ${order?.totalAmount?.toFixed(2) || '0.00'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
