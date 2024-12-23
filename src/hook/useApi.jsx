import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../redux/slices/state.reducer";

const useApi = () => {
    const dispatch = useDispatch();

    const apiAction = async ({
        baseURL = import.meta.env.VITE_SERVER_URL,
        method = "get",
        data = null,
        url,
        isFormData = false,
        message = null,
        isLoading = false,
    }) => {
        
        if (isLoading) {
            dispatch(setIsLoading(true));
        }

        const instance = axios.create({
            baseURL,
            withCredentials: true,
        });

        const config = {
            url,
            method,
            data,
            headers: {
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            },
        };

        try {
            const response = await instance.request(config);
            dispatch(setIsLoading(false));

            if (response?.status === 200) {
                if (message) toast.success(message);
                return response?.data;
            } else {
                toast.error(response?.data?.error || response?.data?.message || "Unexpected error occurred.");
            }
        } catch (err) {
            dispatch(setIsLoading(false));

            const errorMessage =
                err?.response?.status === 401
                    ? "Session expired. Please login again."
                    : err?.response?.data?.message || err?.message || "Something went wrong. Please try again later.";

            toast.error(errorMessage);
            throw new Error(errorMessage);
        }
    };
    return { apiAction };
};

export default useApi;
