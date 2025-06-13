import React from "react";
import useSWR from "swr";
import ObraCard from "@/components/ObraCard";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Contenido = () => {
  const { data, error, isLoading, mutate } = useSWR("http://localhost:8000/api/obra?desde=0&hasta=30", fetcher);

  if (isLoading) return <div className="p-8">Cargando obras...</div>;
  if (error) return <div className="p-8 text-red-500">Error al cargar las obras</div>;

  return (
    <main className="p-8 bg-neutral-50 min-h-screen">
      <div className="relative mb-10 rounded-xl overflow-hidden h-56 flex items-center justify-center bg-gradient-to-r from-neutral-200 to-neutral-400">
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-800 drop-shadow-lg text-center">Obras Singulares del Museo</h1>
      </div>
      <div className="flex justify-end mb-4">
        <button onClick={() => mutate()} className="px-4 py-2 rounded bg-neutral-800 text-white hover:bg-neutral-600 transition">Recargar</button>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {data && data.data && data.data.length > 0 ? (
          data.data.map((obra: any) => (
            <div key={obra.id} className="flex-grow-0 flex-shrink-0 basis-80 max-w-xs">
              <ObraCard obra={obra} />
            </div>
          ))
        ) : (
          <div>No hay obras disponibles.</div>
        )}
      </div>
    </main>
  );
};

export default Contenido;
