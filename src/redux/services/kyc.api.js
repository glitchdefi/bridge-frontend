import axios from "axios";
import { KYC_URL, BACK_END_URL } from "../../_configs";

export const getKYC = async(address, type) => {
    // address = '0xB4baa008B051960E6D13DA39C22af60404197938'
    try {
        const result = await axios.get(
            `${KYC_URL}/api/kycs?address=${address}&type=${type}`
        );
        console.log(result);
        if (result.status == 200) {
            return result.data;
        }

        return null;
    } catch (error) {
        const response = error.response;

        console.log(response);
        //    return response

        return null;
    }
};

//        console.log(response);
//     //    return response

//         return null
//     }
// }
export const getStatusSwap = async(network, txid) => {
    try {
        debugger
        const result = await axios.get(
            `${BACK_END_URL}/api/bridge?network=${network}&txid=${txid}`
        );
        console.log(result);
        if (result.status == 200) {
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