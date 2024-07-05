import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const createRoom = async (accessToken) => {
    try {
        const response = await axios.post(
            `${API_URL}/createroom`,
            {},
            {
                headers: {
                    accesstoken: `${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 422) {
            const errors = error.response.data.message
                .map((error) => error.msg)
                .join(" ");
            throw new Error(errors);
        } else {
            throw new Error(
                error.response.data.message || "Unknown error occurred."
            );
        }
    }
};
