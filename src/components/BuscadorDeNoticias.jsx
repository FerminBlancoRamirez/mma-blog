import { useState } from 'react';

export default function BuscadorDeNoticias({ noticias = [] }) {
  const [busqueda, setBusqueda] = useState('');

  const noticiasFiltradas = noticias.filter((item) => {
    // Usamos ?. para evitar caídas si algún campo falta, y usamos los nombres correctos en español
    const coincideTexto = 
      (item.data.titulo && item.data.titulo.toLowerCase().includes(busqueda.toLowerCase())) ||
      (item.data.descripcion && item.data.descripcion.toLowerCase().includes(busqueda.toLowerCase()));
    
    return coincideTexto;
  });

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-neutral-800 p-4 rounded-xl border border-neutral-700">
        <input
          type="text"
          placeholder="Buscar noticia (ej: Volkanovski, UFC...)"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full md:w-1/2 bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition"
        />
      </div>

      {/* Grid de Noticias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {noticiasFiltradas.length > 0 ? (
          noticiasFiltradas.map((noticia) => (
            <a 
              key={noticia.id} 
              href={`/noticias/${noticia.id}`} 
              className="bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700/60 hover:border-red-600/50 transition group flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={noticia.data.image} 
                  alt={noticia.data.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                />
              </div>
              <div className="p-5 flex flex-col grow justify-between">
                <div>
                  <h3 className="text-lg font-bold group-hover:text-red-500 transition line-clamp-2">
                    {noticia.data.titulo}
                  </h3>
                  <p className="text-neutral-400 text-sm mt-2 line-clamp-2">
                    {noticia.data.descripcion}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-700/50 flex justify-between items-center text-xs text-neutral-500">
                  <span>{noticia.data.author}</span>
                  <span>{new Date(noticia.data.publiDate).toLocaleDateString()}</span>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p className="col-span-full text-center text-neutral-500 py-10">
            No se encontraron noticias que coincidan con la búsqueda.
          </p>
        )}
      </div>
    </div>
  );
}