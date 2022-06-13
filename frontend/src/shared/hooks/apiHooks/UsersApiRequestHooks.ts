import {useQuery} from "react-query";
import {AllUserResponseType,} from "../../interfaces/moduleTypes";
import axios from "axios";

export const USERS_ROUTE = "/users";

export const useGetAllUsersRequest = (onSuccess?: (data: AllUserResponseType) => void) => {
  return useQuery(USERS_ROUTE,  () => {
    return axios.get(USERS_ROUTE).then((resp) => resp.data);
  }, { onSuccess });
}
