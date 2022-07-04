import create from "zustand";
import { persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { getProductsPaginated } from "../api/products.api";

export const useProductStore = create(
  persist((set) => ({
    products: [],
    pagination: {},
    fetchProducts: (page = 1, name = "") => {
      if (name !== "") {
        page = 1;
      }
      getProductsPaginated(page, name).then(({ data }) => {
        set({ products: data.products });
        set({
          pagination: {
            total: data.total,
            last: data.totalPag,
            current: data.curentPag,
            size:5
          },
        });
      });
    },
  }))
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useProductStore);
}
