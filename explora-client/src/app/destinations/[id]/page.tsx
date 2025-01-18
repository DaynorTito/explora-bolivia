"use client";

import { use } from "react";
import {
  MapPin,
  Star,
  Calendar,
  DollarSign,
  Map,
  Edit,
  ArrowLeft,
  Trash,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import ImageCarousel from "@/components/destinations/ImageCarousel";
import { Destination } from "@/types/destination";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateReviewForm } from "@/components/resenas/CreateReviewForm";
import { ReviewCard } from "@/components/resenas/ReviewCard";
import DestinationMap from "@/components/destinations/DestinationMap";

async function fetchDestination(id: string): Promise<Destination> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/destino-turistico/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch destination");
  }

  return res.json();
}

export default function DestinationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const { id } = use(params);
  useEffect(() => {
    const loadDestination = async () => {
      try {
        const data = await fetchDestination(id);
        setDestination(data);
      } catch (err) {
        console.log(err);
        setError("Destino no encontrado");
      }
    };

    loadDestination();
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/destino-turistico/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el destino");
      }

      setShowDeleteModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error:", error);
      setShowDeleteModal(false);
      setShowErrorModal(true);
    } finally {
      setIsDeleting(false);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!destination) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <Header />
      <div className="w-full">
        <ImageCarousel
          images={destination.imagenes}
          height={480}
          interval={4000}
        />

        <div className="flex justify-end px-4 py-2">
          <Button
            variant="outline"
            onClick={() => router.push("/destinations")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Volver
          </Button>
        </div>

        <div className="w-full max-w-[1920px] mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{destination.nombre}</h1>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <MapPin className="text-[#618725]" size={24} />
                  <div>
                    <p className="font-medium">
                      {destination.ubicacion.nombreUbicacion}
                    </p>
                    <p className="text-gray-600">{destination.departamento}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: destination.calificacion }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      )
                    )}
                  </div>
                  <span className="text-gray-600">
                    ({destination.calificacion})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  className="bg-[#618725] hover:bg-[#4a681c] flex items-center gap-2 text-white px-4 py-2 rounded-lg"
                  onClick={() => router.push(`/destinations/edit/${id}`)}
                >
                  <Edit size={18} />
                  Editar
                </Button>

                <Button
                  className="bg-red-600 hover:bg-red-700 flex items-center gap-2 text-white px-4 py-2 rounded-lg"
                  onClick={() => setShowDeleteModal(true)}
                  disabled={isDeleting}
                >
                  <Trash size={18} />
                  {isDeleting ? "Eliminando..." : "Eliminar"}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
                <p className="text-gray-700 leading-relaxed">
                  {destination.descripcion}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-[#618725E]" size={24} />
                  <div>
                    <p className="font-medium">Punto de Salida</p>
                    <p className="text-gray-600">{destination.puntoSalida}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="text-[#618725]" size={24} />
                  <div>
                    <p className="font-medium">Costo Aproximado</p>
                    <p className="text-gray-600">
                      Bs. {destination.costoAprox}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-0">
              <DestinationMap
                latitude={destination.ubicacion.latitud}
                longitude={destination.ubicacion.longitud}
                title={destination.nombre}
                location={destination.ubicacion.nombreUbicacion}
              />
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Reseñas</h2>

              <div className="space-y-4 mb-8">
                {destination.resenas.map((review) => (
                  <ReviewCard
                    key={review.id}
                    nombrePersona={review.nombrePersona}
                    comentario={review.comentario}
                    calificacion={review.calificacion}
                    createdAt={review.createdAt}
                  />
                ))}
              </div>

              <CreateReviewForm
                destinationId={destination.id}
                onReviewCreated={() => {
                  fetchDestination(id).then(setDestination);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-amber-600">
              <AlertTriangle size={20} />
              ¿Está seguro de eliminar este destino turístico?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará toda la información relacionada a este destino. Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando..." : "Confirmar Eliminación"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 size={20} />
              Destino Eliminado
            </AlertDialogTitle>
            <AlertDialogDescription>
              El destino turístico ha sido eliminado correctamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowSuccessModal(false);
                router.push("/destinations");
              }}
            >
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <XCircle size={20} />
              Error al Eliminar
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ha ocurrido un error al intentar eliminar el destino. Por favor,
              inténtelo nuevamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorModal(false)}>
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </>
  );
}
