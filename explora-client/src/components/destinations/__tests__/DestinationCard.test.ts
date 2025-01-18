import { type Destination } from '@/types/destination'
import '@testing-library/jest-dom'

describe('DestinationCard', () => {
  const mockDestination: Destination = {
      id: '1',
      nombre: 'Salar de Uyuni',
      descripcion: 'El salar más grande del mundo',
      departamento: 'Potosí',
      calificacion: 5,
      puntoSalida: "",
      costoAprox: "",
      createdAt: "",
      updatedAt: '',
      ubicacion: {
          id: '',
          nombreUbicacion: '',
          latitud: 0,
          longitud: 0,
          tipo: ''
      },
      imagenes: [],
      imagenesUrls: [],
      resenas: []
  }
  it('deberia contener un cuerpo de solicitud valido', () => {
  
    expect(mockDestination.calificacion).toBe(5);
  });

})
