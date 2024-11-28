// app/redux/provider.js
"use client"; // Помечаем компонент как client-side

import { wrapper } from "../store";

export function Providers({ children }) {
    return wrapper.withRedux(<>{children}</>); // Используем wrapper для подключения Redux
}
