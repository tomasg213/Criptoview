# DOCUMENTATION.md

## Descripción General
Esta aplicación es un Dashboard de criptomonedas en tiempo real construido con React. Utiliza la API pública de CoinGecko para obtener precios en vivo y datos históricos de los últimos 7 días.

## Arquitectura de Componentes

### 1. App.jsx (Contenedor Principal)
Gestiona el estado global de la aplicación, incluyendo:
- listaCriptos: Almacena el top 10 de monedas desde la API.
- busqueda: Controla el filtrado dinámico mediante el input.
- seleccionada: Objeto que contiene la cripto activa para mostrar en el Modal.
- historico: Array de datos procesados para el gráfico de precios.

### 2. CryptoCard.jsx (Componente de Presentación)
Recibe props y renderiza la información básica.
- Lógica visual: Implementa un cambio de color condicional (precio > 1000) para resaltar activos de alto valor.

## Integraciones y APIs

### Datos en Tiempo Real
Se utiliza el endpoint /markets de CoinGecko:
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd...

### Datos Históricos
Para el gráfico del Modal, se consulta el historial de 7 días:
https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7

## Estilo y UI
El proyecto sigue un enfoque Minimalista Moderno:
- Tipografía: Sans-serif nativa del sistema para mayor rendimiento.
- Paleta: Fondos neutros (#f4f7f6) con acentos en Índigo (#6366f1) y Amarillo Binance (#F3BA2F).
- Gráficos: Implementados con Recharts utilizando ResponsiveContainer para asegurar que el modal sea responsivo.

## Instalación y Uso

1. Clonar el repositorio.
2. Instalar dependencias:
   npm install recharts
3. Ejecutar en desarrollo:
   npm run dev