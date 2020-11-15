import apiCalls from "../../api/apiCalls";
import { getFromStorage } from "./storage";

function Verify() {
  const obj = getFromStorage("sessionToken");
  let status = false;
  if (obj && obj.token) {
    const { token } = obj;
    status = apiCalls.verify({ token: token }).then(res => {
      return res.data.success;
    });
  }
  return status;
}

export default Verify;
