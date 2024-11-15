import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppProvider } from "./context/AppProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/Root.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { ProjectPage } from "./pages/ProjectPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:projectName",
        element: <ProjectPage />
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
    <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
