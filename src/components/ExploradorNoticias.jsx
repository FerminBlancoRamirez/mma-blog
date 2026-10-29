import { useState } from 'react';

export default function ExploradorNoticias({ noticias = [] }) {
  const [busqueda, setBusqueda] = useState('');

  // 1. Filtrar noticias según el texto introducido (busca en título, descripción y tags)
  const noticiasFiltradas = noticias.filter((noticia) => {
    const query = busqueda.toLowerCase().trim();
    if (!query) return true;

    const coincideTitulo = noticia.data.titulo?.toLowerCase().includes(query);
    const coincideDescripcion = noticia.data.descripcion?.toLowerCase().includes(query);
    const coincideTag = noticia.data.tag?.some((t) => t.toLowerCase().includes(query));

    return coincideTitulo || coincideDescripcion || coincideTag;
  });

  // 2. Agrupar las noticias por sus etiquetas (tags)
  // Cada noticia aparecerá en la sección correspondiente a su tag principal o de evento
  const noticiasAgrupadas = noticiasFiltradas.reduce((acc, noticia) => {
    const tags = Array.isArray(noticia.data.tag) ? noticia.data.tag : [noticia.data.tag || 'General'];
    
    // Asignamos la noticia a su primer tag (ej: "UFC333", "Lesiones", "Peso Ligero")
    const categoriaPrincipal = tags[0] || 'General';

    if (!acc[categoriaPrincipal]) {
      acc[categoriaPrincipal] = [];
    }
    acc[categoriaPrincipal].push(noticia);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {/* Input de Búsqueda Limpio (Sin nube de botones) */}
      <div className="bg-neutral-800 p-4 rounded-xl border border-neutral-700">
        <input
          type="text"
          placeholder="Buscar por evento (ej: UFC333), tematica (ej: Lesiones), luchador (ej: Alexander Volkanovski) o peso (ej: Peso Pluma)  "
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition"
        />
      </div>

      {/* Secciones agrupadas por Tag / Evento */}
      {Object.keys(noticiasAgrupadas).length > 0 ? (
        Object.entries(noticiasAgrupadas).map(([categoria, listaNoticias]) => (
          <section key={categoria} className="space-y-4">
            {/* Cabecera de la sección (ej: "🔴 UFC333" o "🔴 LESIONES") */}
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
              <span className="w-3 h-3 bg-red-600 rounded-full inline-block animate-pulse"></span>
              <h2 className="text-2xl font-black uppercase text-white tracking-wider">
                {categoria}
              </h2>
              <span className="text-xs text-neutral-500 font-bold bg-neutral-800 px-2 py-0.5 rounded">
                {listaNoticias.length} {listaNoticias.length === 1 ? 'noticia' : 'noticias'}
              </span>
            </div>

            {/* Grid de noticias para esta categoría */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listaNoticias.map((noticia) => (
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
              ))}
            </div>
          </section>
        ))
      ) : (
        <p className="text-center text-neutral-500 py-12">
          No se encontraron noticias con la etiqueta o término buscado.
        </p>
      )}
    </div>
  );
}