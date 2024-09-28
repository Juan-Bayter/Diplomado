import axios from 'axios';

export const cargarDatos = async () => {
  try {
    const response = await axios.get('https://www.datos.gov.co/resource/r86y-229a.json');
    return response.data.map(fila => ({
      periodo: fila.periodo || 0,
      facultad: fila.facultad || 0,
      programa: fila.programa || 0,
      total_matricula: fila.total_matricula || 0,
      sexo_masc: fila.sexo_masc || 0,
      sexo_feme: fila.sexo_feme || 0,
      estrato_1: fila.estrato_1 || 0,
      estrato_2: fila.estrato_2 || 0,
      estrato_3: fila.estrato_3 || 0,
      estrato_4: fila.estrato_4 || 0,
      estrato_5: fila.estrato_5 || 0,
      estrato_6: fila.estrato_6 || 0,
    }));
  } catch (error) {
    console.log('Error al cargar los datos:', error);
    return [];
  }
};
