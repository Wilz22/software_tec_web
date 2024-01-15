document.addEventListener('DOMContentLoaded', function () {
    const iframeReporte = document.getElementById('iframeReporte');
    const reporteContainer = document.getElementById('reporteContainer');
    const imprimirReporteBtn = document.getElementById('imprimirReporteBtn');

    document.getElementById('ventasPorCiudadBtn').addEventListener('click', function () {
        generarReporteVentasPorCiudad();
    });

    document.getElementById('reporteCruzadoBtn').addEventListener('click', function () {
        generarReporteClienteArticuloCruzado();
    });

    imprimirReporteBtn.addEventListener('click', function () {
        imprimirReporte();
    });

    function generarReporteVentasPorCiudad() {
        // Lógica para generar el reporte de Ventas por Ciudad
        const contenidoReporte = `<!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Informe de Ventas por Ciudad</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
        
            table {
              border-collapse: collapse;
              width: 50%;
              margin: 20px auto;
              background-color:white;
            }
            h2{
                color: white;
                text-align: center;
            }
        
            table, th, td {
              border: 1px solid black;
            }
        
            th, td {
              padding: 8px;
              text-align: center;
            }
        
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
        
        <h2>Informe de Ventas por Ciudad</h2>
        
        <table>
          <thead>
            <tr>
              <th>Ciudad</th>
              <th>Dólares Vendidos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Quito</td>
              <td>$10,000</td>
            </tr>
            <tr>
              <td>Ambato</td>
              <td>$8,500</td>
            </tr>
            <tr>
              <td>Cuenca</td>
              <td>$7,200</td>
            </tr>
        
          </tbody>
        </table>
        
        </body>
        </html>
        `; 
        iframeReporte.srcdoc = contenidoReporte;
        reporteContainer.style.display = 'block';
    }

    function generarReporteClienteArticuloCruzado() {
        // Lógica para generar el Reporte Cliente y Artículo Cruzado
        const contenidoReporte = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reporte de Ventas</title>
                <style>
                    #reporteContainer {
                        width: 100%; /* Ancho del div al 100% del contenedor padre */
                        height: 500px; /* Altura del div en píxeles o cualquier unidad deseada */
                        overflow: auto; /* Agrega una barra de desplazamiento si el contenido es grande */
                    }
    
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        background-color: #fff;
                    }
                    h2 {
                        text-align: center;
                        padding: 10px; /* Ajusta el espacio interno según tus necesidades */
                        color: white;
                      }
    
                    table, th, td {
                        border: 1px solid black;
                    }
    
                    th, td {
                        padding: 8px;
                        text-align: center;
                    }
    
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h2>Reporte de Ventas Cruzadas por Cliente y Artículo</h2>
                <table>
                    <thead>
                        <tr>
                            <th></th> <!-- Espacio vacío en la esquina superior izquierda -->
                            <th>Cliente 1</th>
                            <th>Cliente 2</th>
                            <th>Cliente 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Artículo 1</td>
                            <td>$100</td>
                            <td>$150</td>
                            <td>$200</td>
                        </tr>
                        <tr>
                            <td>Artículo 2</td>
                            <td>$120</td>
                            <td>$180</td>
                            <td>$220</td>
                        </tr>
                    </tbody>
                </table>
            </body>
            </html>
        `;
    
        iframeReporte.srcdoc = contenidoReporte;
        reporteContainer.style.display = 'block';
    }
    
    

    function imprimirReporte() {
        // Imprimir el contenido del div
        window.print();
    }
});
