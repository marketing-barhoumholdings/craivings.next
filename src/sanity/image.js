const getImageRef = (source) => {
  if (!source) return null;
  if (typeof source === "string") return source;
  if (source.asset?.ref) return source.asset.ref;
  if (source.asset?._ref) return source.asset._ref;
  return null;
};

const parseAssetRef = (ref) => {
  // Expected: image-<id>-<width>x<height>-<format>
  const match = /^image-([a-zA-Z0-9]+)-(\d+)x(\d+)-([a-z0-9]+)$/.exec(ref || "");
  if (!match) return null;
  return {
    id: match[1],
    width: Number.parseInt(match[2], 10),
    height: Number.parseInt(match[3], 10),
    format: match[4]
  };
};

export const buildImageUrl = (source, options = {}) => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const ref = getImageRef(source);
  if (!projectId || !dataset || !ref) return null;
  const parsed = parseAssetRef(ref);
  if (!parsed) return null;
  const { id, format } = parsed;
  const base = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}.${format}`;
  const params = new URLSearchParams();
  if (options.width) params.set("w", String(options.width));
  if (options.height) params.set("h", String(options.height));
  if (options.fit) params.set("fit", options.fit);
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
};
