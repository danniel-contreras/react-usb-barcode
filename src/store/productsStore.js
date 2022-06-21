import create from "zustand";
import { persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { getProductsPaginated } from "../api/products.api";

export const useProductStore = create(
  persist((set) => ({
    productos: [],
    pagination: {},
    fetchProducts: (page = 1, name = "") => {
      getProductsPaginated(page, name).then(({ data }) => {
        set({ productos: data.products });
        set({
          pagination: {
            total: data.total,
            last: data.totalPag,
            current: data.curentPag,
          },
        });
      });
    },
  }))
);


if (process.env.NODE_ENV === "development") {
    mountStoreDevtool("Store", useProductStore);
  }
  