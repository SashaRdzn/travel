import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "../Router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Authorization from "../Authoruzation/Authorization";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Authorization>
        <RouterProvider router={router} />
      </Authorization>
    </QueryClientProvider>

  );
}

export default App;
