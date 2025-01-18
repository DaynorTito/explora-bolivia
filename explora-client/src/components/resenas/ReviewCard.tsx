import { Star, User } from "lucide-react";

interface ReviewCardProps {
  nombrePersona: string;
  comentario: string;
  calificacion: number;
  createdAt: string;
}

export function ReviewCard({ nombrePersona, comentario, calificacion, createdAt }: ReviewCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-gray-100 rounded-full">
          <User className="w-8 h-8 text-gray-500" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{nombrePersona || "Anónimo"}</h3>
            <div className="flex items-center gap-1">
              {Array.from({ length: calificacion }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </div>
          <p className="text-gray-700 mb-2">{comentario}</p>
          <p className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
