export function formatearFechaActual(fechaString) {
    const timestamp = parseInt(fechaString, 10); // Assuming fechaString is a Unix timestamp
    const fecha = isNaN(timestamp) ? new Date(fechaString) : new Date(timestamp);
  
    const opcionesDeFormato = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour:"numeric",
    };
  
    const fechaFormateada = fecha.toLocaleDateString("es-ES", opcionesDeFormato);
  
    return fechaFormateada;
  }