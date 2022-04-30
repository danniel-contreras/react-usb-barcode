import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddProduct } from "../pages/AddProduct";
import { Auth } from "../pages/Auth";
import { Home } from "../pages/Home";
import { Products } from "../pages/Products";
import { SalesHistory } from "../pages/SalesHistory";

export default function ReactRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/auth" element={<Auth />} exact />
        <Route path="/products" element={<Products />} exact />
        <Route path="/add-product" element={<AddProduct />} exact />
        <Route path="/sales-history" element={<SalesHistory />} exact />
      </Routes>
    </Router>
  );
}
