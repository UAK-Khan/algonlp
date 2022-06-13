import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {AllServiceResponseType, ServiceRequestBodyType, ServiceResponseBodyType} from "../../interfaces/moduleTypes";
import {DefaultResponseType} from "../../interfaces/ajaxTypes";

export const SERVICES_ROUTE = "/services";

// see dev note "## Invalidate only single query" for why we've to do this
const GET_ALL_TYPE = "GET_ALL";

export const useGetServicesRequest = (onSuccess?: (data: AllServiceResponseType) => void) => {
  return useQuery<AllServiceResponseType, DefaultResponseType>([SERVICES_ROUTE, {type: GET_ALL_TYPE}], () => {
    return axios.get(SERVICES_ROUTE).then((resp) => resp.data);
  }, {onSuccess});
}

export const useGetServiceRequest = (onSuccess: (data: ServiceResponseBodyType) => void, editRowId?: string) => {
  return useQuery<ServiceResponseBodyType, DefaultResponseType>([SERVICES_ROUTE, editRowId],
    () => axios.get(`${SERVICES_ROUTE}/${editRowId}`).then((d) => d.data), {
      enabled: !!editRowId,
      onSuccess
    });
}

export const useAddServiceRequest = (onSuccess: (
  data: DefaultResponseType<ServiceResponseBodyType["data"]>
) => void) => {
  const queryClient = useQueryClient();
  return useMutation((data:ServiceRequestBodyType) => axios.post(SERVICES_ROUTE, data)
    .then((data) => data.data), {
    onSuccess: (data) => {
      onSuccess(data);
      queryClient.invalidateQueries(SERVICES_ROUTE);
    }
  });
}

export const useUpdateServiceRequest = (onSuccess: (data: DefaultResponseType) => void, id?: string) => {
  const routeWithId = `${SERVICES_ROUTE}/${id}`;
  const queryClient = useQueryClient();
  return useMutation((data:ServiceRequestBodyType) => axios.put<DefaultResponseType>(routeWithId, data)
    .then((data) => data.data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries([SERVICES_ROUTE, {type: GET_ALL_TYPE}]);
      onSuccess(data);
    }
  });
}

export const useDeleteServiceRequest = () => {
  const queryClient = useQueryClient();
  return useMutation((rowId: string) => axios.delete(`${SERVICES_ROUTE}/${rowId}`), {
    onSuccess: () => queryClient.invalidateQueries(SERVICES_ROUTE),
  })
}
