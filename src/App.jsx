// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import AppRoutes from "./Routes.jsx";

export default function App() {
  return (
    <BrowserRouter >
      <Suspense fallback={<p>Loading...</p>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
