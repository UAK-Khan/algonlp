import {useMutation, useQuery, useQueryClient} from "react-query";
import {AboutDetailsResponseType, AboutRequestBodyType,} from "../../interfaces/moduleTypes";
import {DefaultResponseType} from "../../interfaces/ajaxTypes";
import axios from "axios";

export const PACKAGES_ROUTE = "/about";

export const useGetAboutRequest = (onSuccess?: (data: AboutDetailsResponseType) => void) => {
  return useQuery<AboutDetailsResponseType, DefaultResponseType>(PACKAGES_ROUTE, () => {
    return axios.get(PACKAGES_ROUTE).then((resp) => resp.data);
  }, {onSuccess});
}

export const useUpdateAboutRequest = (onSuccess: (data: DefaultResponseType) => void) => {
  const queryClient = useQueryClient();
  return useMutation((data:AboutRequestBodyType) => axios.put<DefaultResponseType>(PACKAGES_ROUTE, data)
    .then((data) => data.data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(PACKAGES_ROUTE);
      onSuccess(data);
    }
  });
}
