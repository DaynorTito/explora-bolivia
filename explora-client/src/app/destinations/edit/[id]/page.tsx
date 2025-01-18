"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, XCircle, Upload, MapPin, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import dynamic from "next/dynamic";
import { Imagen, Review } from "@/types/destination";
import Image from "next/image";

const MapModal = dynamic(
  () => import("../../../../components/destinations/MapModal"),
  { ssr: false }
);

const departamentos = [
  "La Paz",
  "Cochabamba",
  "Beni",
  "Pando",
  "Santa Cruz",
  "Tarija",
  "Chuquisaca",
  "Oruro",
  "Potosí",
];

interface Destination {
  id: string;
  nombre: string;
  descripcion: string;
  departamento: string;
  puntoSalida: string;
  imagenesUrls: Imagen[];
  calificacion: number;
  costoAprox: number;
  createdAt: string;
  updatedAt: string;
  imagenes: Imagen[];
  resenas: Review[];
  ubicacion: {
    nombreUbicacion: string;
    latitud: number;
    longitud: number;
    tipo: string;
  };
}

export default function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [currentImages, setCurrentImages] = useState<Imagen[]>([]);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<Destination | null>(null);
  const [originalData, setOriginalData] = useState<Destination | null>(null);
  const { id } = use(params);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;      
        const response = await fetch(
          `${baseUrl}/destino-turistico/${id}`
        );
        if (!response.ok) throw new Error("Error al cargar el destino");
        const data = await response.json();
        setFormData(data);
        setOriginalData(data);
        setCurrentImages(data.imagenes);
      } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar los datos del destino");
        router.push("/destinations");
      }
    };

    fetchDestination();
  }, [id, router]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeCurrentImage = (index: number) => {
    setCurrentImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    if (!formData) return;

    setFormData({
      ...formData,
      ubicacion: {
        ...formData.ubicacion,
        latitud: lat,
        longitud: lng,
      },
    });
    setIsMapOpen(false);
  };

  const uploadNewImages = async () => {
    if (!selectedFiles.length) return [];

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("imagenes", file);
    });
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/imagen`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al subir imágenes");

      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Error al subir las imágenes");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsLoading(true);

    try {
      const newImageUrls = await uploadNewImages();
      const allImageUrls = [
        ...currentImages.map((image) => image.url),
        ...newImageUrls,
      ];

      const { id, createdAt, updatedAt, imagenes, ubicacion, resenas, ...rest } =
        formData;

      const dataUpdated = {
        ...rest,
        ubicacion: {
          ...ubicacion,
          id: undefined,
        },
        imagenesUrls: allImageUrls,
        costoAprox:
          typeof rest.costoAprox === "string"
            ? parseFloat(rest.costoAprox)
            : rest.costoAprox,
      };

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/destino-turistico/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUpdated),
      });
      if (!response.ok) throw new Error("Error al actualizar destino");

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar el destino");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    setFormData(originalData);
    setSelectedFiles([]);
    setCurrentImages(originalData?.imagenesUrls || []);
  };

  if (!formData) return <div>Cargando...</div>;

  return (
    <>
      <Header />
      <div className="w-full max-w-[1920px] mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Editar Destino</h1>
            <Button
              variant="outline"
              onClick={() => router.push(`/destinations/${id}`)}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Volver
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Nombre</Label>
                <Input
                  required
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  placeholder="Nombre del destino"
                />
              </div>

              <div className="space-y-2">
                <Label>Departamento</Label>
                <Select
                  value={formData.departamento}
                  onValueChange={(value) =>
                    setFormData({ ...formData, departamento: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departamentos.map((dep) => (
                      <SelectItem key={dep} value={dep}>
                        {dep}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea
                required
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                placeholder="Descripción del destino"
                className="h-32"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Punto de Salida</Label>
                <Input
                  required
                  value={formData.puntoSalida}
                  onChange={(e) =>
                    setFormData({ ...formData, puntoSalida: e.target.value })
                  }
                  placeholder="Punto de salida"
                />
              </div>

              <div className="space-y-2">
                <Label>Costo Aproximado (Bs.)</Label>
                <Input
                  required
                  type="number"
                  step="0.01"
                  value={formData.costoAprox}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      costoAprox: parseFloat(e.target.value),
                    })
                  }
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label>Calificación</Label>
                <Input
                  required
                  type="number"
                  step="1"
                  min={0}
                  max={5}
                  value={formData.calificacion}
                  onChange={(e) => {
                    const value = Math.max(
                      0,
                      Math.min(5, Number(e.target.value))
                    );
                    setFormData({ ...formData, calificacion: value });
                  }}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                Información de Ubicación
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Nombre de Ubicación</Label>
                  <Input
                    required
                    value={formData.ubicacion.nombreUbicacion}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ubicacion: {
                          ...formData.ubicacion,
                          nombreUbicacion: e.target.value,
                        },
                      })
                    }
                    placeholder="Nombre de la ubicación"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Ubicación</Label>
                  <Input
                    required
                    value={formData.ubicacion.tipo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ubicacion: {
                          ...formData.ubicacion,
                          tipo: e.target.value,
                        },
                      })
                    }
                    placeholder="Tipo de ubicación"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <MapPin size={20} />
                      Seleccionar Ubicación en Mapa
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl h-[600px]">
                    <DialogHeader>
                      <DialogTitle>Seleccionar Ubicación</DialogTitle>
                    </DialogHeader>
                    <MapModal onLocationSelect={handleLocationSelect} />
                  </DialogContent>
                </Dialog>
                {formData.ubicacion.latitud !== 0 && (
                  <span className="text-sm text-gray-600">
                    Ubicación seleccionada:{" "}
                    {formData.ubicacion.latitud.toFixed(6)},{" "}
                    {formData.ubicacion.longitud.toFixed(6)}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Imágenes Actuales</h2>
              <div className="flex flex-wrap gap-4">
                {currentImages.map((url, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={url.url}
                      alt={`Imagen ${index + 1}`}
                      width="600"
                      height="100"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeCurrentImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Agregar Nuevas Imágenes</h2>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() =>
                    document
                      .querySelector<HTMLInputElement>('input[type="file"]')
                      ?.click()
                  }
                >
                  <Upload size={20} />
                  Subir
                </Button>
              </div>

              {selectedFiles.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        width="600"
                        height="100"
                        className="w-24 h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleDiscard}
                className="flex items-center gap-2"
              >
                <XCircle size={20} />
                Descartar Cambios
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#618725] hover:bg-[#4a681c] flex items-center gap-2"
              >
                <Save size={20} />
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <AlertDialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¡Cambios Guardados!</AlertDialogTitle>
            <AlertDialogDescription>
              Los cambios se han guardado exitosamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowSuccessModal(false);
                router.push(`/destinations/${id}`);
              }}
            >
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </>
  );
}
