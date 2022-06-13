import {useMutation, useQueries, useQuery, useQueryClient} from "react-query";
import {AllPackagesResponseType, PackageRequestBodyType, PackageResponseType} from "../../interfaces/moduleTypes";
import {DefaultResponseType} from "../../interfaces/ajaxTypes";
import axios from "axios";

export const PACKAGES_ROUTE = "/packages";

export const useGetPackagesRequest = () => {
  return useQuery<AllPackagesResponseType, DefaultResponseType>(PACKAGES_ROUTE, () => {
    return axios.get(PACKAGES_ROUTE).then((resp) => resp.data);
  });
}

export const useGetPackageRequest = (onSuccess: (data: PackageResponseType) => void, editRowId?: string) => {
  return useQuery<PackageResponseType, DefaultResponseType>([PACKAGES_ROUTE, editRowId],
    () => axios.get(`${PACKAGES_ROUTE}/${editRowId}`).then((resp) => resp.data), {
      enabled: !!editRowId,
      onSuccess
    });
}

export const useGetPackageRequestByIds = (onSuccess: (data: PackageResponseType[]) => void, packageIds?: string[]) => {
  return useQueries((packageIds || []).map((pId) => {
    return {
      queryKey: ['package', pId],
      queryFn: () => axios.get(`${PACKAGES_ROUTE}/${pId}`),
      enabled: !!packageIds?.length,
      onSuccess
    }
  }));
}

export const useAddPackageRequest = (onSuccess: (data: DefaultResponseType) => void) => {
  const queryClient = useQueryClient();
  return useMutation((data: PackageRequestBodyType) => axios.post<DefaultResponseType>(PACKAGES_ROUTE, data)
    .then((data) => data.data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(PACKAGES_ROUTE);
      onSuccess(data);
    }
  });
}

export const useUpdatePackageRequest = (onSuccess: (data: DefaultResponseType) => void, id?: string) => {
  const routeWithId = `${PACKAGES_ROUTE}/${id}`;
  const queryClient = useQueryClient();
  return useMutation((data:PackageRequestBodyType) => axios.put<DefaultResponseType>(routeWithId, data)
      .then((data) => data.data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(PACKAGES_ROUTE);
      onSuccess(data);
    }
  });
}

export const useDeletePackageApi = () => {
  const queryClient = useQueryClient();
  return useMutation((rowId: string) => axios.delete(`${PACKAGES_ROUTE}/${rowId}`), {
    onSuccess: () => queryClient.invalidateQueries(PACKAGES_ROUTE),
  })
}
