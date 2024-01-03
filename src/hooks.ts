import { useMutation, useQuery } from "react-query";
import { IStatus } from "./type";
import { Api } from "./Api";
import { time } from "./miscellenious";

export const useGetStatusUpdate = (params: IStatus) => {
	return useQuery(["status_update", params], () => Api.GetStatus(params), {
		enabled: params.emails.length > 0 && params.filename.length > 0,
		refetchIntervalInBackground: true,
		refetchInterval: time.second * 3,
	});
};

export const useUploadFile = () => {
	return useMutation(["upload"], Api.UploadFile);
};
