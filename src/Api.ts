import { IStatus, IUpload } from "./type";

export const ApiURL =
	process.env.NODE_ENV === "production" ? "http://139.59.226.115:8080" : "http://localhost:8080";

export const Api = {
	GetStatus: async (params: IStatus) => {
		const queryParams = new URLSearchParams({
			emails: params.emails,
			filename: params.filename,
		});

		try {
			const response = await fetch(`${ApiURL}/status_update?${queryParams}`, {
				method: "GET",
				credentials: "include", // 'include' for sending credentials (like cookies) in cross-origin requests
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data); // Logging the data for debugging
				return data.status; // Assuming the server returns an object with a 'status' property
			} else {
				// Handling non-2xx responses
				throw new Error(`Server responded with status: ${response.status}`);
			}
		} catch (error) {
			console.error("Fetch error:", error);
			throw new Error("Network failed when getting status update");
		}
	},
	UploadFile: async (params: IUpload) => {
		const formData = new FormData();
		formData.append("upload[]", params.file); // Assuming 'file' is the key expected by your server and params.file is the File object
		formData.append("emails", params.emails); // Assuming 'file' is the key expected by your server and params.file is the File object

		const response = await fetch(`${ApiURL}/upload`, {
			method: "POST",
			credentials: "include",
			// Do not set 'Content-Type' header when sending FormData,
			// the browser will set it along with the correct boundary
			body: formData,
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw new Error("Network failed when uploading file");
			})
			.then((data) => {
				const result: number = data.status;
				return result;
			});

		return response;
	},
};
