import { useEffect, useState } from "react";
import { sanityClient } from "./client";
import { pageBySlugQuery } from "./page-queries";

export function useSanityPage(slug) {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchPage = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await sanityClient.fetch(pageBySlugQuery, { slug });
        if (isMounted) {
          setPage(data);
          setError(false);
        }
      } catch (err) {
        console.error("Error fetching Sanity page:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchPage();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { page, loading, error };
}
