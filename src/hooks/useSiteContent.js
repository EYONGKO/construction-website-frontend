import { useEffect, useState } from 'react';
import { fallbackSiteContent, normalizeSiteContent } from '../data/siteContent';
import { siteContentAPI } from '../services/api';

const useSiteContent = () => {
  const [siteContent, setSiteContent] = useState(fallbackSiteContent);

  useEffect(() => {
    let isMounted = true;

    const loadSiteContent = async () => {
      try {
        const response = await siteContentAPI.get();
        if (isMounted) {
          setSiteContent(normalizeSiteContent(response.data));
        }
      } catch (error) {
        console.error('Error loading site content:', error);
        if (isMounted) {
          setSiteContent(fallbackSiteContent);
        }
      }
    };

    loadSiteContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return siteContent;
};

export default useSiteContent;
