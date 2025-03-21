import { store } from "../store";

const { TOGGLE_SIDEBAR } = require("../reducers/system.reducer");

export function toggleSidebar() {
    store.dispatch({ type: TOGGLE_SIDEBAR })
}