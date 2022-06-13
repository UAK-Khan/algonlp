import {useQuery} from "react-query";
import {AllMessageResponseType} from "../../interfaces/moduleTypes";
import axios from "axios";

export const USER_MESSAGES_ROUTE = "/user-messages";

export const useGetAllUserMessagesRequest = (onSuccess?: (data: AllMessageResponseType) => void) => {
  return useQuery(USER_MESSAGES_ROUTE,  () => {
    return axios.get(USER_MESSAGES_ROUTE).then((resp) => resp.data);
  }, { onSuccess });
}
