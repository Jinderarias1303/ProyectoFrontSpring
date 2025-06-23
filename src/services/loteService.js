import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/api/lote';


// traer todos los lotes
export const getLotes = async (filtros) => {
  try {
    const response = await axios.get(API_BASE_URL, { params: filtros });
    return response.data;
  } catch (error) {
    console.error('Error al obtener lotes:', error);
    throw error;
  }
}

// crear Lote
export const crearLote = async (nuevoLote) => {
  try {
    const response = await axios.post(API_BASE_URL, nuevoLote);
    return response.data;
  } catch (error) {
    console.error('Error al crear lote:', error);
    throw error;
  }
}

// eliminar Lote
export const eliminarLote = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar lote:', error);
    throw error;
  }
}