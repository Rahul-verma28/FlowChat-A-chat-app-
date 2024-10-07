import { create } from "zustand";
import { createAuthSlice } from "./slices/Auth-slice.js";

export const useAppStore = create()((...a) => ({
    ...createAuthSlice(...a),
}));