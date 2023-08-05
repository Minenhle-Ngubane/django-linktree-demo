import React, { useEffect, useState } from 'react';
import useAuthStore from '../../store/authStore';
import useLinkStore from '../../store/linkStore';
import { useSocialLinkStore } from '../../store/socialLinksStore';
import '../../css/preview.css';


const Preview = () => {
    const user = useAuthStore((state) => state.user);
    const links = useLinkStore((state) => state.links);
    const { socialLinks } = useSocialLinkStore();

    const baseUrl = window.location.origin;
    const userPageUrl = `${baseUrl}/${user?.user.username}`

    const [storeDataKey, setStoreDataKey] = useState(0);

    useEffect(() => {
        setStoreDataKey(prev => prev + 1);
    }, [user, links, socialLinks]);

    return (
        <section className="preview open section__inner preview--redesign">
            <div className="inner inactive-mobile scrolled">
                <div 
                    className="preview-wrap" 
                    style={{transform: "scale(0.5666666) translateX(-50%) translateY(-50%) translate3d(0px, 0px, 0px)"}}
                >
                    <div style={{ height: "100% ", width: "100%" }}>
                        <iframe 
                            title="Page Preview iframe"
                            key={storeDataKey}
                            id="preview-iframe" 
                            height="100%" 
                            width="100%" 
                            src={userPageUrl}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Preview;