"use client";

import { useEffect, useState } from 'react';

export default function GalleryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('gallery') || '[]');
    setItems(data);
  }, []);

  function remove(id) {
    const filtered = items.filter((i) => i.id !== id);
    setItems(filtered);
    localStorage.setItem('gallery', JSON.stringify(filtered));
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold">Gallery</h1>
      <p className="text-white/70 mt-2">Your saved generations are stored in your browser only.</p>

      {items.length === 0 ? (
        <div className="mt-10 text-white/60">No saved images yet. Generate something and save it here!</div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.id} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
              <img src={it.data} alt={it.style} className="w-full h-auto" />
              <div className="p-3 flex items-center justify-between text-sm text-white/70">
                <span className="capitalize">{it.style}</span>
                <button onClick={() => remove(it.id)} className="hover:text-white">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
