import axios from "axios";
import { BACK_END_URL } from "../../_configs";

export const getStatusSwap = async (network, txid) => {
  try {

    const result = await axios.get(
      `${BACK_END_URL}/api/bridge?network=${network}&txid=${txid}`
    );
    // console.log(result);
    if (result.status === 200) {
      return result.data.data;
    }

    return null;
  } catch (error) {
    const response = error.response;

    console.log(response);
    //    return response

    return null;
  }
};

