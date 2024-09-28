<template>
    <div>
      <div class="text-2xl font-bold text-center text-white bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-lg shadow-xl mb-6"> Bienvenidos!!!          
      </div>
  
      <h2 class="text-xl font-semibold text-gray-700 mb-4 border-2 border-blue-500 rounded-lg p-4 shadow-lg"> Filtrar por Programas y Periodos
      </h2>
  
      <div class="flex space-x-4 my-4">
        <div>
          <label for="programa" class="block mb-2 text-sm font-medium text-gray-700">Programa</label>
          <select v-model="filtroPrograma" id="programa" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg">
            <option value="">Todos</option>
            <option v-for="programa in programas" :key="programa" :value="programa">{{ programa }}</option>
          </select>
        </div>
  
        <div>
          <label for="periodo" class="block mb-2 text-sm font-medium text-gray-700">Periodo</label>
          <select v-model="filtroPeriodo" id="periodo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg">
            <option value="">Todos</option>
            <option v-for="periodo in periodos" :key="periodo" :value="periodo">{{ periodo }}</option>
          </select>
        </div>
  
        <div class="flex items-end">
          <button @click="aplicarFiltro" class="bg-blue-500 text-white px-4 py-2 rounded-md">Filtrar</button>
        </div>
      </div>
  
      <div class="flex space-x-4">
        <div :class="filtroAplicado ? 'w-1/2' : 'w-full'" class="relative overflow-x-auto my-6 text-gray-700">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">Periodo</th>
                <th scope="col" class="px-6 py-3">Facultad</th>
                <th scope="col" class="px-6 py-3">Programa</th>
                <th scope="col" class="px-6 py-3">Total matrícula</th>
                <th scope="col" class="px-6 py-3">Masculino</th>
                <th scope="col" class="px-6 py-3">Femenino</th>
                <th v-if="!filtroAplicado" scope="col" class="px-6 py-3">Estrato 1</th>
                <th v-if="!filtroAplicado" scope="col" class="px-6 py-3">Estrato 2</th>
                <th v-if="!filtroAplicado" scope="col" class="px-6 py-3">Estrato 3</th>
                <th v-if="!filtroAplicado" scope="col" class="px-6 py-3">Estrato 4</th>
                <th v-if="!filtroAplicado" scope="col" class="px-6 py-3">Estrato 5</th>
                <th v-if="!filtroAplicado" scope="col" class="px-6 py-3">Estrato 6</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="fila in datosFiltrados" :key="fila.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ fila.periodo || 0 }}</th>
                <td class="px-6 py-4">{{ fila.facultad || 0 }}</td>
                <td class="px-6 py-4">{{ fila.programa || 0 }}</td>
                <td class="px-6 py-4">{{ fila.total_matricula || 0 }}</td>
                <td class="px-6 py-4">{{ fila.sexo_masc || 0 }}</td>
                <td class="px-6 py-4">{{ fila.sexo_feme || 0 }}</td>
                <td v-if="!filtroAplicado" class="px-6 py-4">{{ fila.estrato_1 || 0 }}</td>
                <td v-if="!filtroAplicado" class="px-6 py-4">{{ fila.estrato_2 || 0 }}</td>
                <td v-if="!filtroAplicado" class="px-6 py-4">{{ fila.estrato_3 || 0 }}</td>
                <td v-if="!filtroAplicado" class="px-6 py-4">{{ fila.estrato_4 || 0 }}</td>
                <td v-if="!filtroAplicado" class="px-6 py-4">{{ fila.estrato_5 || 0 }}</td>
                <td v-if="!filtroAplicado" class="px-6 py-4">{{ fila.estrato_6 || 0 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Gráfica de Estratos -->
        <div v-if="filtroAplicado" class="w-1/2">
          <GraficaEstratos :datosFiltrados="datosFiltrados" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import GraficaEstratos from '@/components/GraficaEstratos.vue';
  import { cargarDatos } from '@/servicios/cargarDatos'; 
  import { filtrarDatos } from '@/servicios/filtrarDatos'; 
  
  const datos = ref([]);
  const datosFiltrados = ref([]);
  const filtroPrograma = ref('');
  const filtroPeriodo = ref('');
  const filtroAplicado = ref(false);
  const programas = ref([]);
  const periodos = ref([]);
  
  onMounted(async () => {
    datos.value = await cargarDatos(); 
    programas.value = [...new Set(datos.value.map(fila => fila.programa))];
    periodos.value = [...new Set(datos.value.map(fila => fila.periodo))];
    datosFiltrados.value = datos.value;
  });
  
  function aplicarFiltro() {
    filtroAplicado.value = true;
    nextTick(() => {
      datosFiltrados.value = filtrarDatos(datos.value, filtroPrograma.value, filtroPeriodo.value);
    });
  }
  </script>
  