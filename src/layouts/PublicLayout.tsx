import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import ScrollToTop from "../components/Shared/ScrollToTop/ScrollToTop";

export default function PublicLayout() {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
