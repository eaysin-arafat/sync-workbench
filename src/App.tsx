import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useDispatch } from "react-redux";
import { fetchRefreshToken } from "./redux/reducers/userSlicer";

function App() {
  const { token } = useSelector((state: RootState) => state.userReducer);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(
        fetchRefreshToken({
          token: token || "",
        })
      );
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
