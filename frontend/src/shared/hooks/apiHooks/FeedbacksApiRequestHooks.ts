import {useMutation, useQuery, useQueryClient} from "react-query";
import {AllFeedbackResponseType, FeedbackRequestBodyType,} from "../../interfaces/moduleTypes";
import axios from "axios";
import {DefaultResponseType} from "../../interfaces/ajaxTypes";

export const USER_FEEDBACKS_ROUTE = "/feedbacks";

export const useAddFeedbackRequest = (onSuccess: (data: DefaultResponseType) => void) => {
  const queryClient = useQueryClient();
  return useMutation((data: FeedbackRequestBodyType) => axios.post<DefaultResponseType>(USER_FEEDBACKS_ROUTE, data)
    .then((data) => data.data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(USER_FEEDBACKS_ROUTE);
      onSuccess(data);
    }
  });
}

export const useGetAllUserFeedbacksRequest = (onSuccess?: (data: AllFeedbackResponseType) => void) => {
  return useQuery(USER_FEEDBACKS_ROUTE, () => {
    return axios.get(USER_FEEDBACKS_ROUTE).then((resp) => resp.data);
  }, {onSuccess});
}
