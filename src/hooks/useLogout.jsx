import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "reactfire";
import { clearCart } from "../redux/states";

const useLogout = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth);
    dispatch(clearCart());
    navigate("/home");
  };

  return logOut;
};

export default useLogout;
