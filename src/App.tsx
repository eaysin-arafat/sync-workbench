import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { fetchRefreshToken } from "./redux/reducers/user-slicer";
import { AppDispatch, RootState } from "./redux/store";
import router from "./routes";

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
