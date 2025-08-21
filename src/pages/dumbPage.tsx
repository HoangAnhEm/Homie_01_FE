import React, { useEffect, useState } from 'react';
import { fetchPhotos } from '../services/photoService';
import PhotoCard from '../components/PhotoCard';
import type { Photo } from '~/types/photo';

export default function DemoPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos(10)
      .then(data => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading)
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gray-100 min-h-screen">
      {photos.map(photo => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
