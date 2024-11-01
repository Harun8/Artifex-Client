import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Inspiration from "./pages/Inspiration";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/inspiration" element={<Inspiration></Inspiration>}></Route>

      {/*


       */}
    </Route>
  )
);

function App() {
  return (
    <>
      <div className="App"></div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
