import {useGetAllMetaDataRequest} from "./apiHooks/MetaDataApiRequestHooks";
import {TMetaKeys} from "../interfaces/otherTypes";

const useMetaDataHook = () => {
  const {isLoading, data} = useGetAllMetaDataRequest(() => {
  }, {staleTime: Infinity});

  const getMetValueByKey = (key: TMetaKeys, defaultValue = ""): string => {
    const dataList = data?.list || [];
    if (dataList.length) {
      return dataList.find((item) => item.key === key)?.value || defaultValue;
    }
    return defaultValue;
  }

  return {
    metaLoading: isLoading,
    getMetValueByKey
  }
}

export default useMetaDataHook;
