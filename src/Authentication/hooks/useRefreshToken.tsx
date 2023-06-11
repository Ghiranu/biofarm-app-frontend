import { useContext } from "react";
import { AuthContext } from "../contexts";
import { AuthenticationService } from "../services";

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);

  const refresh = async () => {
    const response = await AuthenticationService.refresh("refresh");
    setAuth(response);
    return response.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
