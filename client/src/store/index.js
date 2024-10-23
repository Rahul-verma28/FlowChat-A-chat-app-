import { create } from "zustand";
import { createAuthSlice } from "./slices/Auth-slice.js";
import { createChatSlice } from "./slices/Chat-slice.js";

export const useAppStore = create()((...a) => ({
    ...createAuthSlice(...a),
    ...createChatSlice(...a),
}));