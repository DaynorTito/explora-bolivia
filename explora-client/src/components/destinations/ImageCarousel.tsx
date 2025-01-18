'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { type Imagen } from '@/types/destination';

interface ImageCarouselProps {
  images: Imagen[];
  height?: number;
  interval?: number; // Time in milliseconds between slides
}

export default function ImageCarousel({ 
  images, 
  height = 240,
  interval = 5000 // Default 5 seconds
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const previousImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-sliding functionality
  useEffect(() => {
    if (!images.length || images.length === 1 || isPaused) return;

    const slideTimer = setInterval(nextImage, interval);

    return () => clearInterval(slideTimer);
  }, [images.length, interval, isPaused, nextImage]);

  // Reset autoplay when images change
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  // Pause auto-sliding when user hovers over the carousel
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  if (!images.length) {
    return (
      <div 
        className="relative w-full bg-gray-200"
        style={{ height: `${height}px` }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          No hay imágenes disponibles
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full"
      style={{ height: `${height}px` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={images[currentIndex].url}
        alt={`Image ${currentIndex + 1}`}
        fill
        className="object-cover transition-opacity duration-500"
        priority
      />

      {images.length > 1 && (
        <>
          <button
            onClick={previousImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Siguiente imagen"
          >
            <ChevronRight size={24} />
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="absolute left-4 bottom-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label={isPaused ? "Reproducir" : "Pausar"}
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPaused(true);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                } hover:bg-white/90`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>

          {!isPaused && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
              <div 
                className="h-full bg-white/70 transition-all duration-200"
                style={{
                  width: `${((currentIndex + 1) / images.length) * 100}%`
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
