import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { OrderService } from "../../../api/orderService";
import { Order, OrderStatus } from "../../../api/types/order";
import { Spinner } from "../../../components/Shared/Spinner/Spinner";
import { STATUS_LABELS_ES } from "../../../components/Profile/ProfileOrders/interfaces/ProfileOrdersProps";
import { AdminHeader } from "../../../components/Admin/AdminHeader/AdminHeader";
import { SearchBar } from "../../../components/Admin/SearchBar/SearchBar";
import { useOrderStore } from "../../../store/useOrderStore";
import '../AdminStyles.scss';

export default function AdminOrders() {
  const { orders, fetchOrdersAdmin, loading: ordersLoading} = useOrderStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "ALL">("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrdersAdmin();
  }, [filterStatus]);

  const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await OrderService.updateOrderStatus(orderId, status);
      await fetchOrdersAdmin();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status });
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };


  const handleViewOrder = async (orderId: string) => {
    try {
      const { data } = await OrderService.getAdminOrderById(orderId);
      setSelectedOrder(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      PENDING: "pending",
      PAID: "paid",
      PROCESSING: "processing",
      SHIPPED: "shipped",
      DELIVERED: "delivered",
      CANCELLED: "cancelled",
    };
    return colors[status];
  };

  if (ordersLoading) return <Spinner />;

  return (
    <section className="admin-section">
      <AdminHeader title="Gestión de Ordenes"/>

      <section className="filters-bar">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Buscar por correo o ID de orden..." />
        <select
          className="status-filter"
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value as OrderStatus | "ALL")
          }
        >
          <option value="ALL">Todos los estados</option>
          <option value="PENDING">Pendiente</option>
          <option value="PAID">Pagado</option>
          <option value="PROCESSING">En proceso</option>
          <option value="SHIPPED">Enviado</option>
          <option value="DELIVERED">Entregado</option>
          <option value="CANCELLED">Cancelado</option>
        </select>
      </section>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Orden ID</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td><code>{order.id.slice(0, 8)}</code></td>
                <td>{order.user?.email}</td>
                <td><strong>${order.totalAmount?.toFixed(2)}</strong></td>
                <td>
                  <span className={`badge ${getStatusColor(order.status)}`}>
                    {STATUS_LABELS_ES[order.status]}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-view"
                      onClick={() => handleViewOrder(order.id)}
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <h2>Order Details</h2>

            <div className="order-details">
              <div className="detail-group">
                <label>Order ID:</label>
                <span><code>{selectedOrder.id}</code></span>
              </div>
              <div className="detail-group">
                <label>Customer:</label>
                <span>
                  {selectedOrder.user?.firstName} {selectedOrder.user?.lastName} (
                  {selectedOrder.user?.email})
                </span>
              </div>
              <div className="detail-group">
                <label>Shipping Address:</label>
                <span>{selectedOrder.shippingAddress}</span>
              </div>
              <div className="detail-group">
                <label>Total:</label>
                <span><strong>${selectedOrder.totalAmount?.toFixed(2)}</strong></span>
              </div>
              <div className="detail-group">
                <label>Date:</label>
                <span>{new Date(selectedOrder.createdAt).toLocaleString()}</span>
              </div>
              <div className="detail-group">
                <label>Status:</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    handleUpdateStatus(
                      selectedOrder.id,
                      e.target.value as OrderStatus
                    )
                  }
                  className="status-select"
                >
                  <option value="PENDING">Pending</option>
                  <option value="PAID">Paid</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            <h3>Order Items</h3>
            <div className="order-items">
              {selectedOrder.items!.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.product.images[0]} alt={item.product.name} />
                  <div className="item-info">
                    <h4>{item.product.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price?.toFixed(2)}</p>
                    <p><strong>Subtotal: ${(item.price * item.quantity)?.toFixed(2)}</strong></p>
                  </div>
                </div>
              ))}
            </div>

            <section className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Cerrar
              </button>
            </section>
          </div>
        </div>
      )}
    </section>
  );
}
