import type { Photo } from "~/types/Photo";

export async function fetchPhotos(limit: number = 10): Promise<Photo[]> {
  const res = await fetch(`https://picsum.photos/v2/list?limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch photos');
  return res.json();
}
