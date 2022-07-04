import { useState, useEffect, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useProductStore } from "../store/productsStore";
import Lottie from "react-lottie";
import Loader from "../animations/loader-for-web.json";
const ProductsTable = lazy(() =>
  import("../components/Products/ProductsTable")
);

export const Products = () => {
  const { products, pagination, fetchProducts } = useProductStore();
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  useEffect(() => {
    return fetchProducts(page, name);
  }, [page, name]);
  return (
    <Layout>
      <p className="text-red-500 md:text-base lg:text-xl">
        LISTA DE PRODUCTOS DISPONIBLES
      </p>
      <div className="flex mt-2">
        <div className="mt-1 flex ">
          <label className="text-gradient whitespace-nowrap mt-2 font-semibold text-xs lg:text-sm">
            Buscar Producto
          </label>
          <input
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Escribe para buscar"
            className="ml-4 border w-80 rounded py-1 px-2 text-xs  lg:text-sm"
          />
        </div>
        <button className="bg-very-blue text-white py-2 rounded-xl text-base font-semibold w-64 ml-10">
          <Link to="/add-product">Agregar Producto</Link>
        </button>
      </div>
      <Suspense
        fallback={
          <Lottie
            options={{ animationData: Loader, loop: true, autoplay: true }}
          />
        }
      >
        <ProductsTable
          setPage={setPage}
          products={products}
          pagination={pagination}
        />
      </Suspense>
    </Layout>
  );
};
