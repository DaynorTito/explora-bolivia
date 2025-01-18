import React, { useState, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Sliders, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import debounce from 'lodash.debounce';

const departamentos = [
  "La Paz",
  "Cochabamba",
  "Santa Cruz",
  "Oruro",
  "Potosí",
  "Chuquisaca",
  "Tarija",
  "Beni",
  "Pando"
];

export function SearchAndFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('keyword') || '');
  
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get('costoMin') || '0'),
    parseInt(searchParams.get('costoMax') || '1000')
  ]);

  const [starRange, setStarRange] = useState([
    parseInt(searchParams.get('calificacionMin') || '0'),
    parseInt(searchParams.get('calificacionMax') || '5')
  ]);

  const [selectedDepartamento, setSelectedDepartamento] = useState(
    searchParams.get('departamento') || ''
  );
  
  const [orderBy, setOrderBy] = useState(searchParams.get('orderBy') || '');
  const [orderDirection, setOrderDirection] = useState(
    searchParams.get('orderDirection') || 'ASC'
  );

  const createQueryString = (params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });
    
    return newSearchParams.toString();
  };

  const updateFilters = (updates: Record<string, string | null>) => {
    startTransition(() => {
      router.push(`${pathname}?${createQueryString(updates)}`)
    });
  };

  const debouncedSearch = debounce((term: string) => {
    updateFilters({ keyword: term || null });
  }, 300);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const removeFilter = (type: string) => {
    switch (type) {
      case 'keyword':
        setSearchTerm('');
        updateFilters({ keyword: null });
        break;
      case 'departamento':
        setSelectedDepartamento('');
        updateFilters({ departamento: null });
        break;
      case 'precio':
        setPriceRange([0, 1000]);
        updateFilters({ costoMin: null, costoMax: null });
        break;
      case 'orden':
        setOrderBy('');
        setOrderDirection('ASC');
        updateFilters({ orderBy: null, orderDirection: null });
        break;
      case 'calificacion':
        setStarRange([0, 5]);
        updateFilters({ calificacionMin: null, calificacionMax: null });
        break;
    }
  };

  const applyFilters = () => {
    const updates: Record<string, string> = {};
    
    if (selectedDepartamento) updates.departamento = selectedDepartamento;
    if (priceRange[0] > 0) updates.costoMin = priceRange[0].toString();
    if (priceRange[1] < 1000) updates.costoMax = priceRange[1].toString();
    if (starRange[0] > 0 || starRange[1] < 5) {
      updates.calificacionMin = starRange[0].toString();
      updates.calificacionMax = starRange[1].toString();
    }
    if (orderBy) {
      updates.orderBy = orderBy;
      updates.orderDirection = orderDirection;
    }
    
    updateFilters(updates);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar por nombre o descripción..."
            className="w-full py-2 px-4 pr-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#4a681c] hover:bg-[#3d5618] flex items-center gap-3">
              <Sliders size={20} />
              Filtros
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] top-[25%] bg-white/95">
            <DialogHeader>
              <DialogTitle>Filtros de búsqueda</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-medium">Ubicacion</label>
                  <Select 
                    value={selectedDepartamento} 
                    onValueChange={setSelectedDepartamento}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar departamento" />
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

                <div className="flex flex-col gap-2">
                  <label className="font-medium">Ordenar por</label>
                  <div className="flex gap-2">
                    <Select value={orderBy} onValueChange={setOrderBy}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Seleccionar orden" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nombre">Nombre</SelectItem>
                        <SelectItem value="costoAprox">Precio</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {orderBy && (
                      <Select 
                        value={orderDirection} 
                        onValueChange={setOrderDirection}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Dirección" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ASC">Ascendente</SelectItem>
                          <SelectItem value="DESC">Descendente</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium">Rango de precio (Bs)</label>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2">
                    <span>Bs. {priceRange[0]}</span>
                    <span>Bs. {priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium">Rango de Calificación</label>
                <div className="px-2">
                  <Slider
                    value={starRange}
                    onValueChange={setStarRange}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2">
                    <span>{starRange[0]} Estrellas</span>
                    <span>{starRange[1]} Estrellas</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={applyFilters}
                className="bg-[#618725] hover:bg-[#4a681c] mt-4"
              >
                Aplicar filtros
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-2">
        {searchTerm && (
          <FilterTag 
            label={`Búsqueda: ${searchTerm}`} 
            onRemove={() => removeFilter('keyword')} 
          />
        )}
        {selectedDepartamento && (
          <FilterTag 
            label={`Departamento: ${selectedDepartamento}`} 
            onRemove={() => removeFilter('departamento')} 
          />
        )}
        {(priceRange[0] > 0 || priceRange[1] < 1000) && (
          <FilterTag 
            label={`Precio: ${priceRange[0]} - ${priceRange[1]} Bs`} 
            onRemove={() => removeFilter('precio')} 
          />
        )}
        {orderBy && (
          <FilterTag 
            label={`Orden: ${orderBy} ${orderDirection}`} 
            onRemove={() => removeFilter('orden')} 
          />
        )}
        {(starRange[0] > 0 || starRange[1] < 5) && (
          <FilterTag 
            label={`Calificación: ${starRange[0]} - ${starRange[1]} Estrellas`} 
            onRemove={() => removeFilter('calificacion')} 
          />
        )}
      </div>
    </div>
  );
}

function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-2 bg-[#618725] text-white px-3 py-1 rounded-full">
      <span>{label}</span>
      <button onClick={onRemove} className="hover:text-gray-200">
        <X size={16} />
      </button>
    </div>
  );
}

export default SearchAndFilters;
