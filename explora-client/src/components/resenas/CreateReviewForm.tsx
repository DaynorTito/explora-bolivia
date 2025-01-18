import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

interface CreateReviewFormProps {
  destinationId: string;
  onReviewCreated: () => void;
}

export function CreateReviewForm({
  destinationId,
  onReviewCreated,
}: CreateReviewFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    nombrePersona: "",
    comentario: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(
        `${baseUrl}/resena/${destinationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            calificacion: rating,
            comentario: formData.comentario,
            nombrePersona: formData.nombrePersona || "Anónimo",
          }),
        }
      );

      if (!response.ok) throw new Error("Error al crear reseña");

      setFormData({ nombrePersona: "", comentario: "" });
      setRating(5);
      onReviewCreated();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al publicar la reseña");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ nombrePersona: "", comentario: "" });
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold mb-4">Crear Reseña</h3>

      <div className="space-y-4">
        <div>
          <Input
            placeholder="Tu nombre (opcional)"
            value={formData.nombrePersona}
            onChange={(e) =>
              setFormData({ ...formData, nombrePersona: e.target.value })
            }
          />
        </div>

        <div>
          <Textarea
            required
            placeholder="Tu comentario"
            value={formData.comentario}
            onChange={(e) =>
              setFormData({ ...formData, comentario: e.target.value })
            }
            className="h-24"
          />
        </div>

        <div>
          <p className="mb-2 font-medium">Calificación</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                className="focus:outline-none"
              >
                <Star
                  size={24}
                  className={`${
                    i < rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#618725] hover:bg-[#4a681c]"
          >
            {isLoading ? "Publicando..." : "Publicar"}
          </Button>
        </div>
      </div>
    </form>
  );
}
