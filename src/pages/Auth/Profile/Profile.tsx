import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { AuthService } from "../../../api/authService";
import { OrderService } from "../../../api/orderService";
import { User } from "../../../api/types/auth";
import { Order } from "../../../api/types/order";
import ProfileHeader from "../../../components/Profile/ProfileHeader/ProfileHeader";
import ProfileInfo from "../../../components/Profile/ProfileInfo/ProfileInfo";
import ProfileOrders from "../../../components/Profile/ProfileOrders/ProfileOrders";
import ProfileOrderModal from "../../../components/Profile/ProfileOrderModal/ProfileOrderModal";
import FullScreenSpinner from "../../../components/FullScreenSpinner/FullScreenSpinner";
import "./Profile.scss";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [userRes, ordersRes] = await Promise.all([
          AuthService.me(),
          OrderService.getOrders(),
        ]);
        setUser(userRes.data);
        setOrders(ordersRes.data);
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <FullScreenSpinner />;

  if (!user) {
    return (
      <section className="profile-error">
        <p>Error loading profile</p>
        <button onClick={logout} className="btn-logout">
          Back to Login
        </button>
      </section>
    );
  }

  return (
    <main className="profile-page">
      <ProfileHeader user={user} onLogout={logout} />

      <section className="profile-content">
        <ProfileInfo user={user} />
        <ProfileOrders orders={orders} onSelectOrder={setSelectedOrder} />
      </section>

      {selectedOrder && (
        <ProfileOrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </main>
  );
}
