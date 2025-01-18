'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Destination } from '@/types/destination';

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/destinations/${destination.id}`);
  };

  return (
    <Card className="w-full h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image
          src={destination.imagenes[0]?.url || '/placeholder.jpg'}
          alt={destination.nombre}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{destination.nombre}</h3>
        
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MapPin size={18} className="text-[#618725]" />
          <span>{destination.ubicacion.nombreUbicacion}, {destination.departamento}</span>
        </div>
        
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: destination.calificacion }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {destination.descripcion}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg text-[#618725]">
            Bs. {destination.costoAprox}
          </span>
          <Button 
            onClick={handleViewDetails}
            className="bg-[#618725] hover:bg-[#4a681c] flex items-center gap-2"
          >
            Ver detalles
            <ArrowRight size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
