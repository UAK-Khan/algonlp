import {useMutation, useQuery} from "react-query";
import {AllContactsResponseType, ContactRequestBodyType,} from "../../interfaces/moduleTypes";
import axios from "axios";
import {DefaultResponseType, ListResponseType} from "../../interfaces/ajaxTypes";

export const CONTACT_US_ROUTE = "/contact-us";

export const useSaveContactRequest = (onSuccess: (data: DefaultResponseType) => void) => {
  return useMutation((data: ContactRequestBodyType) => axios.post<DefaultResponseType>(CONTACT_US_ROUTE, data)
    .then((data) => data.data), {
    onSuccess: (data) => {
      onSuccess(data);
    }
  });
}
export const useGetAllContactsRequest = (onSuccess?: (data: AllContactsResponseType[]) => void) => {
  return useQuery<AllContactsResponseType[]>(CONTACT_US_ROUTE, () => {
    return axios.get<ListResponseType<AllContactsResponseType>>(CONTACT_US_ROUTE).then((resp) => resp.data?.list);
  }, {onSuccess});
}

