'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

function StudioLoading() {
  return (
    <div className="studio-loading">
      <div className="studio-loading__content">
        <div className="studio-loading__badge">Craivings Studio</div>
        <h1 className="studio-loading__title">Opening the editor…</h1>
        <p className="studio-loading__copy">
          If this takes more than a few seconds, refresh the page.
        </p>
      </div>
    </div>
  );
}

export default function StudioToolPage() {
  const [Studio, setStudio] = useState(null);
  const [loadError, setLoadError] = useState('');
  const router = useRouter();
  const params = useParams();

  const fallback = useMemo(() => <StudioLoading />, []);

  useEffect(() => {
    let cancelled = false;

    if (!params?.tool?.length) {
      router.replace('/studio/desk');
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      try {
        const [{ Studio }, configModule] = await Promise.all([
          import('sanity'),
          import('../../../sanity.config')
        ]);
        if (cancelled) return;
        const config = configModule.default ?? configModule;
        setStudio(() => () => <Studio config={config} />);
      } catch (error) {
        if (cancelled) return;
        const message =
          error instanceof Error ? error.message : 'Failed to load the studio.';
        setLoadError(message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loadError) {
    return (
      <div className="studio-loading studio-loading--error">
        <div className="studio-loading__content">
          <div className="studio-loading__badge">Craivings Studio</div>
          <h1 className="studio-loading__title">Studio failed to load</h1>
          <p className="studio-loading__copy">{loadError}</p>
          <p className="studio-loading__copy">
            Check your Sanity project ID and dataset in <code>.env.local</code>.
          </p>
        </div>
      </div>
    );
  }

  if (!Studio) {
    return fallback;
  }

  return <Studio />;
}
