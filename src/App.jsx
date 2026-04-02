import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./components/context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Breadcrumbs from "./components/common/Breadcrumbs";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";

function App() {
  return (
    <HelmetProvider>
      {/* BrowserRouter is removed from here - it's now only in main.jsx */}
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Breadcrumbs />
          <main className="flex-grow pt-16"> {/* Add padding-top for fixed navbar */}
            <AppRoutes />
          </main>
          <Footer />
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;