import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {AllSkillsResponseType, SkillsRequestBodyType} from "../../interfaces/moduleTypes";
import {DefaultResponseType} from "../../interfaces/ajaxTypes";

export const SKILLS_ROUTE = "/skills";

export const useGetSkillsRequest = (onSuccess?: (data: AllSkillsResponseType) => void) => {
  return useQuery<AllSkillsResponseType, DefaultResponseType>(SKILLS_ROUTE, () => {
    return axios.get(SKILLS_ROUTE).then((resp) => resp.data);
  }, {onSuccess});
}

export const useUpdateSkillsRequest = (onSuccess: (data: DefaultResponseType) => void) => {
  const queryClient = useQueryClient();
  return useMutation((data:SkillsRequestBodyType[]) => axios.put<DefaultResponseType>(SKILLS_ROUTE, data)
    .then((data) => data.data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(SKILLS_ROUTE);
      onSuccess(data);
    }
  });
}
