import ErrorPage from "./error-page";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateUser />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <Box
      className="App"
      height="100vh"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Box>
  );
}

export default App;
