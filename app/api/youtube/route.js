import { NextResponse } from "next/server";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

const formatDuration = (iso) => {
  if (!iso) return "0:00";
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = parseInt(match?.[1] || "0", 10);
  const minutes = parseInt(match?.[2] || "0", 10);
  const seconds = parseInt(match?.[3] || "0", 10);
  const totalMinutes = hours * 60 + minutes;
  return `${totalMinutes}:${seconds.toString().padStart(2, "0")}`;
};

const toNumberString = (value) => {
  if (!value) return "0";
  return Number(value).toLocaleString();
};

export async function GET(request) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return NextResponse.json({
      videos: [],
      stats: { subscriberCount: "0", videoCount: "0", viewCount: "0" },
      error: "Missing YouTube API configuration"
    }, { status: 200 });
  }

  const { searchParams } = new URL(request.url);
  const maxResults = Math.min(
    Math.max(parseInt(searchParams.get("maxResults") || "12", 10), 1),
    50
  );

  try {
    const searchUrl = `${YOUTUBE_API_BASE}/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`;
    const searchRes = await fetch(searchUrl, { next: { revalidate: 300 } });
    const searchData = await searchRes.json();
    const items = searchData.items || [];

    const videoIds = items.map((item) => item.id?.videoId).filter(Boolean).join(",");
    const detailsMap = new Map();

    if (videoIds) {
      const detailsUrl = `${YOUTUBE_API_BASE}/videos?part=contentDetails,statistics&id=${videoIds}&key=${apiKey}`;
      const detailsRes = await fetch(detailsUrl, { next: { revalidate: 300 } });
      const detailsData = await detailsRes.json();
      (detailsData.items || []).forEach((item) => {
        detailsMap.set(item.id, item);
      });
    }

    const videos = items.map((item, idx) => {
      const videoId = item.id?.videoId;
      const details = detailsMap.get(videoId);
      return {
        id: videoId || idx + 1,
        title: item.snippet?.title || "Video",
        thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url,
        duration: formatDuration(details?.contentDetails?.duration),
        views: details?.statistics?.viewCount ? Number(details.statistics.viewCount).toLocaleString() : "0",
        url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : "https://www.youtube.com/@Craivings"
      };
    });

    const statsUrl = `${YOUTUBE_API_BASE}/channels?part=statistics&id=${channelId}&key=${apiKey}`;
    const statsRes = await fetch(statsUrl, { next: { revalidate: 300 } });
    const statsData = await statsRes.json();
    const stats = statsData.items?.[0]?.statistics || {};

    return NextResponse.json({
      videos,
      stats: {
        subscriberCount: toNumberString(stats.subscriberCount),
        videoCount: toNumberString(stats.videoCount),
        viewCount: toNumberString(stats.viewCount)
      }
    });
  } catch (error) {
    console.error("YouTube API error:", error);
    return NextResponse.json({
      videos: [],
      stats: { subscriberCount: "0", videoCount: "0", viewCount: "0" },
      error: "Failed to fetch YouTube data"
    }, { status: 200 });
  }
}
