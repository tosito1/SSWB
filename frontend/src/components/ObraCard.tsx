import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ObraCardProps {
  obra: any;
}

const ObraCard: React.FC<ObraCardProps> = ({ obra }) => (
  <Card className="transition-transform hover:scale-105 hover:shadow-2xl flex flex-col h-full border-2 border-neutral-200 bg-gradient-to-br from-white via-neutral-50 to-neutral-100">
    <CardHeader>
      <div className="w-full flex justify-center items-center bg-neutral-100 rounded-t shadow-inner" style={{height: '180px', overflow: 'hidden'}}>
        <img
          src={obra.imagen}
          alt={obra.titulo}
          className="object-contain max-h-40 max-w-full drop-shadow-md"
          style={{maxHeight: '160px', width: 'auto', height: 'auto'}}
          onError={e => (e.currentTarget.src = '/img/layout_set_logo.png')}
        />
      </div>
      <CardTitle className="mt-3 text-lg font-bold text-neutral-800 text-center drop-shadow">{obra.titulo}</CardTitle>
      <CardDescription className="text-xs text-neutral-500 text-center">{obra.procedencia}</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col flex-1">
      <p className="mb-4 text-gray-700 flex-1 text-sm text-center">{obra.descripcion || <span className="italic text-gray-400">Sin descripción</span>}</p>
      <div className="flex justify-center">
        <Button variant="outline" className="mt-auto" asChild>
          <a href={`#`}>Ver detalle</a>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default ObraCard;
