import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

const Tutorial = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [red_trace, set_red_trace] = useState([]);
  const [blue_trace, set_blue_trace] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "games", "TIC-TAC-TOE"), (snapshot) => {
      const data = snapshot.data();
      set_red_trace(data?.red_trace || []);
      set_blue_trace(data?.blue_trace || []);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    const xValues = red_trace.map((_, i) => i);

    Chart.defaults.font.family = '"Jersey 15", sans-serif';
    Chart.defaults.color = 'white';

    if (chartInstance.current) {
      chartInstance.current.data.labels = xValues;
      chartInstance.current.data.datasets[0].data = red_trace;
      chartInstance.current.data.datasets[1].data = blue_trace;
      chartInstance.current.update();
      return;
    }

    chartInstance.current = new Chart(canvas, {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [
          {
            fill: true,
            tension: 0,
            pointStyle: 'cross',
            pointRadius: 5,
            pointBorderColor: 'rgba(255, 0, 119, 1)',
            backgroundColor: 'rgba(234, 0, 255, 0.3)',
            borderColor: 'rgba(255, 0, 119, 0.3)',
            borderDash: [5, 5],
            data: red_trace,
          },
          {
            fill: true,
            tension: 0,
            pointStyle: 'crossRot',
            pointRadius: 5,
            pointBorderColor: 'rgb(0, 128, 255)',
            backgroundColor: 'rgba(0, 89, 255, 0.3)',
            borderColor: 'rgba(0, 89, 255, 0.3)',
            borderDash: [5, 5],
            data: blue_trace,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Red V. Blue Trace',
            font: { size: 16, family: '"Jersey 15", sans-serif' },
            color: 'white',
          },
        },
        
        scales: {
          x: {
            grid: {
              display: true,
            }
          },
          y: { 
            grid: {
              display: true,
            }
          }
        }
      },
    });
  }, [red_trace, blue_trace]);

  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <main className="tutorial-main">
      <div className="section-header">
        <h2 className="section-title">Updates</h2>
      </div>

      <canvas
        ref={chartRef}
        className="tutorial-chart"
      />
    </main>
  );
};

export default Tutorial;
