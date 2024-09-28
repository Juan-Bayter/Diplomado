
export function filtrarDatos(datos, filtroPrograma, filtroPeriodo) {
    return datos.filter(fila => {
      return (
        (filtroPrograma === '' || fila.programa === filtroPrograma) &&
        (filtroPeriodo === '' || fila.periodo === filtroPeriodo)
      );
    });
  }
  