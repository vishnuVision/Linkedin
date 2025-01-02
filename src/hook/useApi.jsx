import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../redux/slices/state.reducer";
import { assignUser } from "../redux/slices/authReducer";
import { useAuth } from "@clerk/clerk-react";

const useApi = () => {
    const dispatch = useDispatch();
    const { signOut } = useAuth();

    const apiAction = async ({
        baseURL = import.meta.env.VITE_SERVER_URL,
        method = "get",
        data = null,
        url,
        header,
        isFormData = false,
        message = null,
        isLoading = false,
        toastId
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
            headers: header ? header : {
                "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            },
        };

        try {
            const response = await instance.request(config);
            dispatch(setIsLoading(false));

            if (response?.status === 200) {
                if (message) toast.success(message,{ id: toastId });
                return response?.data;
            } else {
                toast.error(response?.data?.error || response?.data?.message || "Unexpected error occurred.",{ id: toastId });
            }
        } catch (err) {
            dispatch(setIsLoading(false));

            if (err?.response?.status === 401) {
                dispatch(assignUser(false));
                await signOut();
            }

            const errorMessage =
                err?.response?.status === 401
                    ? "Session expired. Please login again."
                    : err?.response?.data?.message || err?.message || "Something went wrong. Please try again later.";

            toast.error(errorMessage,{ id: toastId });
            return { success: false, message: errorMessage };
        }
    };
    return { apiAction };
};

export default useApi;
