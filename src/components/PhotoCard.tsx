import React from 'react';
import type { Photo } from '~/types/Photo';

type PhotoCardProps = {
  photo: Photo;
};

export default function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center">
      <img
        src={`https://picsum.photos/id/${photo.id}/200/200`}
        alt={`By ${photo.author}`}
        className="mb-4 rounded"
      />
      <p className="text-center text-gray-700">{`Photo by ${photo.author}`}</p>
    </div>
  );
}
