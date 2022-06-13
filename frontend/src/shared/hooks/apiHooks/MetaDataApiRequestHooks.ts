import {useMutation, useQuery, useQueryClient} from "react-query";
import {AllMetaDataResponseType, MetaDataRequestBodyType} from "../../interfaces/moduleTypes";
import {DefaultResponseType} from "../../interfaces/ajaxTypes";
import axios from "axios";

export const METADATA_ROUTE = "/metadata";

export const useGetAllMetaDataRequest = (onSuccess: (data: AllMetaDataResponseType) => void, options?: { staleTime?: number | undefined }) => {
  return useQuery(METADATA_ROUTE, () => {
    return axios.get(METADATA_ROUTE).then((resp) => resp.data);
  }, {onSuccess, staleTime: options?.staleTime});
}

export const useUpdateMetaDataRequest = (onSuccess: (data: DefaultResponseType) => void) => {
  const queryClient = useQueryClient();
  return useMutation((data:MetaDataRequestBodyType[]) => axios.put<DefaultResponseType>(METADATA_ROUTE, data)
      .then((data) => data.data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(METADATA_ROUTE);
      onSuccess(data);
    }
  });
}
