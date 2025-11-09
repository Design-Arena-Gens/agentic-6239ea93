"use client";

import { useEffect, useRef, useState } from 'react';
import StyleSelector from '../../components/StyleSelector';

function applyStyleToCanvas(ctx, canvas, image, styleId, intensity) {
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(image, 0, 0, w, h);

  // Base adjustments
  if (styleId === 'neon') {
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < intensity; i++) {
      ctx.filter = `blur(${1 + i * 0.6}px) saturate(1.2)`;
      ctx.drawImage(canvas, 0, 0);
    }
    ctx.filter = 'saturate(1.4) contrast(1.1)';
    ctx.globalCompositeOperation = 'source-over';
  }

  if (styleId === 'watercolor') {
    ctx.filter = `blur(${Math.min(4, intensity * 0.6)}px) saturate(1.1)`;
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
    // Paper texture overlay
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, 'rgba(255,255,255,0.05)');
    grad.addColorStop(1, 'rgba(0,0,0,0.05)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  if (styleId === 'sketch') {
    const step = Math.max(1, Math.floor(6 - intensity * 0.4));
    const data = ctx.getImageData(0, 0, w, h);
    const out = ctx.createImageData(w, h);
    // Simple edge-ish effect
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4;
        const r = data.data[i], g = data.data[i+1], b = data.data[i+2];
        const lum = (r + g + b) / 3;
        const shade = lum > 128 ? 255 : 30;
        for (let yy = 0; yy < step; yy++) {
          for (let xx = 0; xx < step; xx++) {
            const ii = ((y+yy) * w + (x+xx)) * 4;
            out.data[ii] = out.data[ii+1] = out.data[ii+2] = shade;
            out.data[ii+3] = 255;
          }
        }
      }
    }
    ctx.putImageData(out, 0, 0);
  }

  if (styleId === 'glitch') {
    const offset = Math.floor(intensity * 2);
    const sliceH = Math.max(2, Math.floor(h / (8 + intensity)));
    const img = ctx.getImageData(0, 0, w, h);
    for (let y = 0; y < h; y += sliceH) {
      const dx = ((y / sliceH) % 2 === 0 ? 1 : -1) * offset;
      ctx.putImageData(img, dx, 0, 0, y, w, sliceH);
    }
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = 'rgba(0, 255, 200, 0.15)';
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'source-over';
  }

  if (styleId === 'pop') {
    ctx.filter = `contrast(${1.3 + intensity * 0.05}) saturate(${1.4 + intensity * 0.1})`;
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
    // Halftone dots
    const dot = Math.max(2, Math.floor(8 - intensity * 0.5));
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    for (let y = 0; y < h; y += dot*2) {
      for (let x = 0; x < w; x += dot*2) {
        ctx.beginPath();
        ctx.arc(x, y, dot/2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

export default function GeneratePage() {
  const [style, setStyle] = useState('neon');
  const [intensity, setIntensity] = useState(6);
  const [imageUrl, setImageUrl] = useState(null);
  const [isWorking, setIsWorking] = useState(false);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imageUrl) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const maxSide = 768;
      const scale = Math.min(maxSide / img.width, maxSide / img.height, 1);
      canvas.width = Math.floor(img.width * scale);
      canvas.height = Math.floor(img.height * scale);
      applyStyleToCanvas(ctx, canvas, img, style, intensity);
      imgRef.current = img;
    };
    img.src = imageUrl;
  }, [imageUrl, style, intensity]);

  function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  }

  function download() {
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `artistly-${style}.png`;
    a.click();
  }

  function saveToGallery() {
    const data = canvasRef.current.toDataURL('image/png');
    const entry = { id: Date.now(), style, createdAt: new Date().toISOString(), data };
    const existing = JSON.parse(localStorage.getItem('gallery') || '[]');
    existing.unshift(entry);
    localStorage.setItem('gallery', JSON.stringify(existing.slice(0, 48)));
  }

  async function demoGenerate() {
    setIsWorking(true);
    // Create a gradient canvas if no image is uploaded
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    const g = ctx.createLinearGradient(0, 0, 800, 600);
    g.addColorStop(0, '#4338ca');
    g.addColorStop(1, '#ec4899');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 800, 600);
    const temp = new Image();
    temp.onload = () => {
      applyStyleToCanvas(ctx, canvas, temp, style, intensity);
      setIsWorking(false);
    };
    temp.src = canvas.toDataURL('image/png');
  }

  return (
    <div className="py-10 grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Generate</h1>
        <p className="text-white/70">Upload an image or try a demo. Choose a style and adjust intensity, then download or save to gallery.</p>
        <div className="flex gap-3">
          <label className="inline-flex items-center px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 cursor-pointer">
            <input type="file" accept="image/*" onChange={onFile} className="hidden" />
            Upload Image
          </label>
          <button onClick={demoGenerate} className="px-4 py-2 rounded-md bg-brand-500 hover:bg-brand-600 disabled:opacity-50" disabled={isWorking}>
            {isWorking ? 'Generating?' : 'Demo Generate'}
          </button>
        </div>
        <StyleSelector value={style} onChange={setStyle} intensity={intensity} onIntensity={setIntensity} />
        <div className="flex gap-3">
          <button onClick={download} className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20">Download PNG</button>
          <button onClick={saveToGallery} className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20">Save to Gallery</button>
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="aspect-[4/3] w-full bg-white/5 rounded-lg flex items-center justify-center overflow-hidden">
          <canvas ref={canvasRef} className="max-w-full h-auto" />
        </div>
        {!imageUrl && (
          <p className="mt-3 text-sm text-white/60">Tip: Upload an image or use Demo Generate.</p>
        )}
      </div>
    </div>
  );
}
