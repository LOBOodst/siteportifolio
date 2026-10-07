// Resolves a public/ asset path against Vite's base URL ("/siteportifolio/").
export const getAssetUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

const YOUTUBE_RE = /youtube(-nocookie)?\.com|youtu\.be/;

export const getYouTubeId = (url) => {
  if (!url || !YOUTUBE_RE.test(url)) return null;
  const match =
    url.match(/\/embed\/([\w-]+)/) ||
    url.match(/youtu\.be\/([\w-]+)/) ||
    url.match(/[?&]v=([\w-]+)/);
  return match ? match[1] : null;
};

// Flattens a project's videos and images into one ordered media list,
// videos first: they show the game moving, which is what reviewers look for.
export const getProjectMedia = (project) => {
  const videos = (project.videos || []).map((src) => {
    const youtubeId = getYouTubeId(src);
    return youtubeId
      ? {
          kind: "youtube",
          src: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
          thumb: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
        }
      : { kind: "video", src: getAssetUrl(src), thumb: null };
  });
  const images = (project.images || []).map((src) => ({
    kind: "image",
    src: getAssetUrl(src),
    thumb: getAssetUrl(src),
  }));
  return [...videos, ...images];
};
