<template>
  <div>
    <canvas id="graficaEstratos"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps({
  datosFiltrados: {
    type: Array,
    required: true
  }
});

const estratos = ref([]);
const valores = ref([]);

watch(() => props.datosFiltrados, (nuevoDatos) => {
  estratos.value = ['Estrato 1', 'Estrato 2', 'Estrato 3', 'Estrato 4', 'Estrato 5', 'Estrato 6'];
  valores.value = estratos.value.map(estrato => {
    return nuevoDatos.reduce((acc, fila) => acc + (parseInt(fila[estrato.toLowerCase().replace(' ', '_')]) || 0), 0);
  });
  crearGrafica();
});

function crearGrafica() {
  const ctx = document.getElementById('graficaEstratos').getContext('2d');
  if (window.grafica) {
    window.grafica.destroy(); 
  }
  
  window.grafica = new Chart(ctx, {
    type: 'bar', 
    data: {
      labels: estratos.value,
      datasets: [{
        label: 'Número de Estudiantes por Estrato',
        data: valores.value,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', 
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 2, 
        borderRadius: 5, 
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, 
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Estudiantes',
            font: {
              size: 14,
              weight: 'bold',
            }
          }
        },
        x: {
          title: {
            display: true,
            text: 'Estratos',
            font: {
              size: 14,
              weight: 'bold',
            }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
        },
      }
    }
  });
}
</script>

<style scoped>
canvas {
  max-width: 600px; 
}
</style>
