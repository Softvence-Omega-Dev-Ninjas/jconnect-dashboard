import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./routes/Routes.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
      <Toaster position="top-right" />
    </Provider>
  </StrictMode>
);
