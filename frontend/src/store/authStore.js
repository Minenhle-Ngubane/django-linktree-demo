import axios from 'axios';
import { create } from 'zustand';
import Cookies from 'js-cookie';
import useLinkStore from './linkStore';
import { useSocialLinkStore } from './socialLinksStore';


const useAuthStore = create((set) => ({
    token: Cookies.get("token") || null,
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    refreshToken: Cookies.get("refresh_token") || null,
    isAuthenticated: !!Cookies.get("access_token"),
    isLoading: false,

    setToken: (token, refreshToken) => {
        if (token) {
            Cookies.set("access_token", token);
            Cookies.set("refresh_token", refreshToken);
            set({ token, refreshToken });
        } else {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            set({ token: null, refreshToken: null });
        }
    },

    setUser: async () => {
        try {
            const token = Cookies.get("access_token");
            const response = await axios.get("/user/api/user/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const user = response.data
            Cookies.set("user", JSON.stringify(user));
            set({ user });
        } catch (error) {
            set({ error: error.message });
        }
    },

    updateUser: async (updatedData) => {
        try {
            const token = Cookies.get("access_token");

            const { data } = await axios.put("/user/api/user/", updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            set((state) => {
                const updatedUser = {
                    ...state.user,
                    user: {
                        ...state.user.user,
                        ...data.user,
                    },
                    profile: {
                        ...state.user.profile,
                        ...data.profile,
                    },
                };
          
                Cookies.set("user", JSON.stringify(updatedUser));
          
                return {
                    ...state,
                    user: updatedUser,
                };
            });
            
            return { data: data, error: null };
        } catch (error) {
            const errorMessage = error.response || "Something went wrong";
            return { data: null, error: errorMessage };
        }
    },


    login: async (username, password) => {
        set({ isLoading: true })
        try {
            const { data, status } = await axios.post("auth/api/token/", {
                username,
                password,
            });

            if (status === 200) {
                const { access, refresh } = data;
                useAuthStore.getState().setToken(access, refresh);
                await useAuthStore.getState().setUser();
                await useLinkStore.getState().getLinks();
                await useSocialLinkStore.getState().getSocialLinks();
            }
            set({ isAuthenticated: true, isLoading: false })
            return { data, error: null };
        } catch (error) {
            set({ isAuthenticated: false, isLoading: false })
            const errorMessage = error.response.data.detail || "Something went wrong";
            return {
                data: null,
                error: errorMessage,
            };
        }
    },


    register: async (username, email, password) => {
        try {
            const { data, status } = await axios.post("auth/api/register/", {
                username,
                email,
                password,
            });

            if (status === 201) {
                const { access, refresh } = data;
                useAuthStore.getState().setToken(access, refresh);
                await useAuthStore.getState().login(username, password);
                return { data, error: null };
            }
        } catch (error) {
            console.error("Registration error:", error);
            return {
                data: null,
                error: error.response.data || "Something went wrong",
            };
        }
    },

    logout: () => {
        window.location.href = "/signin";
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("user");
        useAuthStore.getState().setToken(null, null);
        useLinkStore.persist.clearStorage();
        useSocialLinkStore.persist.clearStorage();
        set({ token: "", user: null });
    },
    
    initialize: () => {
        const initialToken = Cookies.get("token");
        const initialUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
        set({ token: initialToken || "", user: initialUser });
    },
    
}));

// Initialize the store on application load
useAuthStore.getState().initialize();


export default useAuthStore;