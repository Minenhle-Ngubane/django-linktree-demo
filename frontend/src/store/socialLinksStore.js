import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';


export const useSocialLinkStore = create(
    persist(
        (set) => ({
            socialLinks: [],
            isLoading: false,
            error: null,
            linkStateIsLoading: false,
            linkStateError: null,
        
            getSocialLinks: async () => {
                try {
                    // Make API request to get user links
                    const token = Cookies.get("access_token");
        
                    set(() => ({
                        isLoading: true,
                        error: null,
                    })); 
        
                    const response = await axios.get("/settings/api/social-links", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
        
                    set(() => ({ 
                        socialLinks: response.data,
                        isLoading: false, 
                    }));
                
                } catch (error) {
                    set(() => ({ 
                        error: error.message,
                        isLoading: false, 
                    }));
                }
            },
              
        
            createSocialLink: async (link) => {
                try {
                    // Make API request to create a new link
                    const token = Cookies.get("access_token");
        
                    set(() => ({
                        linkStateIsLoading: true,
                        linkStateError: null,
                    }));
        
                    const response = await axios.post("/settings/api/social-links/", link, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
        
                    set((state) => ({ 
                        socialLinks: [...state.socialLinks, response.data],
                        linkStateIsLoading: false, 
                    }));
        
                    return { data: response.data, linkStateError: null };
                } catch (error) {
                    const errorMessage = error.response || "Something went wrong";
                    return { data: null, error: errorMessage };
                }
            },
        
            updateSocialLink: async (linkId, updatedLink) => {
                try {
                    // Make API request to update the link
                    const token = Cookies.get("access_token");
        
                    set(() => ({ 
                        linkStateIsLoading: true, 
                        linkStateError: null,
                    }));
        
                    const response = await axios.put(`/settings/api/social-links/${linkId}/`, updatedLink, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
        
                    set((state) => ({
                        socialLinks: state.socialLinks.map((link) => (link.id === linkId ? response.data : link)),
                        linkStateIsLoading: false,
                    }));
                    
                } catch (error) {
        
                    set(() => ({ 
                        linkStateError: error.message,
                        linkStateIsLoading: false, 
                    }));
                }
            },
        
            deleteSocialLink: async (linkId) => {
                try {
                    // Make API request to delete the link
                    const token = Cookies.get("access_token");
        
                    set(() => ({ 
                        linkStateIsLoading: true,
                        linkStateError: null,
                    }));
        
                    await axios.delete(`/settings/api/social-links/${linkId}/`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
        
                    set((state) => ({ 
                        socialLinks: state.socialLinks.filter((link) => link.id !== linkId),
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
            name: "social-icons-store", // name of the item in the storage (must be unique)
        }
    )
);
