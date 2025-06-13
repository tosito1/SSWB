import React from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Contenido: React.FC = () => {
  const { data, error, isLoading } = useSWR('http://localhost:3000/api/obras', fetcher);

  if (isLoading) return <div className="text-center p-8">Cargando...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error al cargar los datos</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Obras Destacadas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((obra: any) => (
          <div key={obra.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={obra.imagen} 
              alt={obra.titulo} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{obra.titulo}</h3>
              <p className="text-gray-600 mb-2">{obra.artista}</p>
              <p className="text-sm text-gray-500">{obra.anio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contenido; 