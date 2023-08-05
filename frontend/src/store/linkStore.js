import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';


const useLinkStore = create(
    persist(
        (set) => ({
            links: [],
            isLoading: false,
            error: null,
            linkStateIsLoading: false,
            linkStateError: null,
        
            getLinks: async () => {
                try {
                    // Make API request to get user links
                    const token = Cookies.get("access_token");
        
                    set(() => ({
                        isLoading: true,
                        error: null,
                    })); 
        
                    const response = await axios.get("/link/api/links", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
        
                    set(() => ({ 
                        links: response.data,
                        isLoading: false, 
                    }));
                
                } catch (error) {
                    set(() => ({ 
                        error: error.message,
                        isLoading: false, 
                    }));
                }
            },
              
        
            createLink: async (link) => {
                try {
                    // Make API request to create a new link
                    const token = Cookies.get("access_token");
        
                    set(() => ({
                        linkStateIsLoading: true,
                        linkStateError: null,
                    }));
        
                    const response = await axios.post("/link/api/links/", link, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
        
                    set((state) => ({ 
                        links: [response.data, ...state.links],
                        linkStateIsLoading: false, 
                    }));
        
                    return { data: response.data, linkStateError: null };
                } catch (error) {
                    const errorMessage = error.response || "Something went wrong";
                    return { data: null, error: errorMessage };
                }
            },
        
            updateLink: async (linkId, updatedLink) => {
                try {
                    // Make API request to update the link
                    const token = Cookies.get("access_token");
        
                    set(() => ({ 
                        linkStateIsLoading: true, 
                        linkStateError: null,
                    }));
        
                    const response = await axios.put(`/link/api/links/${linkId}/`, updatedLink, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
        
                    set((state) => ({
                        links: state.links.map((link) => (link.id === linkId ? response.data : link)),
                        linkStateIsLoading: false,
                    }));
                    
                } catch (error) {
        
                    set(() => ({ 
                        linkStateError: error.message,
                        linkStateIsLoading: false, 
                    }));
                }
            },
        
            deleteLink: async (linkId) => {
                try {
                    // Make API request to delete the link
                    const token = Cookies.get("access_token");
        
                    set(() => ({ 
                        linkStateIsLoading: true,
                        linkStateError: null,
                    }));
        
                    await axios.delete(`/link/api/links/${linkId}/`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
        
                    set((state) => ({ 
                        links: state.links.filter((link) => link.id !== linkId),
                        linkStateIsLoading: false, 
                    }));
        
                } catch (error) {
        
                    set(() => ({ 
                        linkStateError: error.message,
                        linkStateIsLoading: false, 
                    }));
                }
            },
        }),
        {
            name: "link-store", // name of the item in the storage (must be unique)
        }
    )
);

export default useLinkStore;