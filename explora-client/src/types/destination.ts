export interface Ubicacion {
  id: string;
  nombreUbicacion: string;
  latitud: number;
  longitud: number;
  tipo: string;
}

export interface Imagen {
  id: string;
  url: string;
}

export interface Review {
  id: string;
  calificacion: number;
  comentario: string;
  nombrePersona: string;
  createdAt: string;
  updatedAt: string;
}

export interface Destination {
  id: string;
  nombre: string;
  descripcion: string;
  departamento: string;
  puntoSalida: string;
  costoAprox: string;
  calificacion: number;
  createdAt: string;
  updatedAt: string;
  ubicacion: Ubicacion;
  imagenes: Imagen[];
  imagenesUrls: string[];
  resenas: Review[];
}
