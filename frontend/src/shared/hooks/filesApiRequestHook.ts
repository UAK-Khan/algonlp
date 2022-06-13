import axios from "axios";
import {useMutation} from "react-query";
import {DefaultResponseType} from "../interfaces/ajaxTypes";

export const ENTITY_FILES_ROUTE = "/entity-files";

const fileUploadHeaderContentType = {
  'Content-Type': 'multipart/form-data'
};

export const useUploadFilesRequest = (onSuccess?: (data: any) => void) => {
  return useMutation(  (data: { entityId: string, files: FormData }) => {
    return axios.put<unknown, any>(`${ENTITY_FILES_ROUTE}/${data.entityId}`, data.files, {
      headers: fileUploadHeaderContentType
    });
  }, { onSuccess });
}

export const useDeleteFileRequest = (onSuccess?: (data: DefaultResponseType) => void) => {
  return useMutation(  (fileId: string) => {
    return axios.delete(`${ENTITY_FILES_ROUTE}/${fileId}`).then((data) => data.data);
  }, { onSuccess });
}
