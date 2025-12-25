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
      {/* <Toaster position="top-right" /> */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: "my-custom-toast",
          style: { border: "1px solid #BD001F", background: "white" },
          actionButtonStyle: { background: "#BD001F", color: "white" },
        }}
      />
    </Provider>
  </StrictMode>
);
