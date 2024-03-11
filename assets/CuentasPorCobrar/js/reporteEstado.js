document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    document.getElementById('loggedInUserName').textContent = loggedInUser;
    const iframeReporte = document.getElementById('iframeReporte');
    const reporteContainer = document.getElementById('reporteContainer');
    const imprimirReporteBtn = document.getElementById('imprimirReporteBtn');

    document.getElementById('ventasPorCiudadBtn').addEventListener('click', function () {
        ReporteEstadodeCuentaporFactura();
    });

    document.getElementById('reporteCruzadoBtn').addEventListener('click', function () {
        ReporteValoresRecaudadosporcobrador();
    });

    imprimirReporteBtn.addEventListener('click', function () {
        imprimirReporte();
    });

    function ReporteEstadodeCuentaporFactura() {
        // Lógica para generar el reporte de Ventas por Ciudad
        const contenidoReporte = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>Reporte1</title>
            <link rel="stylesheet" href="/css/style.css" media="all" />
          </head>
          <style>
          .clearfix:after {
            content: "";
            display: table;
            clear: both;
          }
          
          a {
            color: #5D6975;
            text-decoration: underline;
          }
          
          body {
            position: relative;
            width: 21cm;  
            height: auto; 
            margin: 0 auto; 
            color: #001028;
            background: #FFFFFF; 
            font-family: Arial, sans-serif; 
            font-size: 12px; 
            font-family: Arial;
          }
          
          header {
            padding: 10px 0;
            margin-bottom: 10px;
          }
          
          #logo {
            text-align: center;
            margin-bottom: 10px;
          }
          
          #logo img {
            width: 90px;
          }
          
          h1 {
            border-top: 1px solid  #5D6975;
            border-bottom: 1px solid  #5D6975;
            color: #5D6975;
            font-size: 2.4em;
            line-height: 1.4em;
            font-weight: normal;
            text-align: center;
            margin: 0 0 20px 0;
            background: url(dimension.png);
          }
          
          #project {
            float: left;
          }
          
          #project span {
            color: #5D6975;
            text-align: right;
            width: 52px;
            margin-right: 10px;
            display: inline-block;
            font-size: 0.8em;
          }
          
          #company {
            float: right;
            text-align: right;
          }
          
          #project div,
          #company div {
            white-space: nowrap;        
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            margin-bottom: 30px;
          }
          
          table tr:nth-child(2n-1) td {
            background: #F5F5F5;
          }
          
          table th,
          table td {
            text-align: center;
          }
          
          table th {
            padding: 5px 20px;
            color: #5D6975;
            border-bottom: 1px solid #C1CED9;
            white-space: nowrap;        
            font-weight: normal;
          }
          
          table .service,
          table .desc {
            text-align: left;
          }
          
          table td {
            padding: 20px;
            text-align: right;
          }
          
          table td.service,
          table td.desc {
            vertical-align: top;
          }
          
          table td.unit,
          table td.qty,
          table td.total {
            font-size: 1.2em;
          }
          
          table td.grand {
            border-top: 1px solid #5D6975;;
          }
          
          
          footer {
            color: #5D6975;
            width: 100%;
            position: static;
            bottom: 0;
            border-top: 1px solid #C1CED9;
            padding: 8px 0;
            text-align: center;
          }
          </style>
          <body>
            <header class="clearfix">
              <div id="logo">
                <img src="https://i.ibb.co/gZwkfXc/logo.png" alt="logo" style="height: 150px;width: 300px;"></a>
              </div>
              <h1>REPORTE ESTADO DE CUENTA POR FACTURA</h1>
            </header>
            <main>
              <table>
                <thead>
                  <tr>
                    <th class="service">ITEMS</th>
                    <th class="service">NÚMERO FACTURA</th>
                    <th class="service" style="text-align: center;">VALOR FACTURA</th>
                    <th class="service" style="text-align: right;">SALDO POR COBRAR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="service">1</td>
                    <td class="service">001</td>
                    <td class="service" style="text-align: center;">$0.20</td>
                    <td class="total">$85.00</td>
                  </tr>
                  <tr>
                    <td class="service">2</td>
                    <td class="service">002</td>
                    <td class="service" style="text-align: center;">$0.25</td>
                    <td class="total">$523.87</td>
                  </tr>

                  <tr>
                    <td class="service">3</td>
                    <td class="service">003</td>
                    <td class="service" style="text-align: center;">$0.45</td>
                    <td class="total">$10.99</td>
                  </tr>                  

                </tbody>
              </table>
              </main>
            <footer>
              DESIGNED BY GRUPO 11
            </footer>
          </body>
        </html>
        `; 
        iframeReporte.srcdoc = contenidoReporte;
        reporteContainer.style.display = 'block';
    }

    function ReporteValoresRecaudadosporcobrador() {
        // Lógica para generar el Reporte Cliente y Artículo Cruzado
        const contenidoReporte = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <title>Reporte1</title>
            <link rel="stylesheet" href="style.css" media="all" />
          </head>
          <style>
            .clearfix:after {
            content: "";
            display: table;
            clear: both;
            }
        
            a {
            color: #5D6975;
            text-decoration: underline;
            }
        
            body {
            position: relative;
            width: 21cm;  
            height: 13.7cm; 
            margin: 0 auto; 
            color: #001028;
            background: #FFFFFF; 
            font-family: Arial, sans-serif; 
            font-size: 12px; 
            font-family: Arial;
            }
        
            header {
            padding: 10px 0;
            margin-bottom: 30px;
            }
        
            #logo {
            text-align: center;
            margin-bottom: 10px;
            }
        
            #logo img {
            width: 90px;
            }
        
            h1 {
            border-top: 1px solid  #5D6975;
            border-bottom: 1px solid  #5D6975;
            color: #5D6975;
            font-size: 2.4em;
            line-height: 1.4em;
            font-weight: normal;
            text-align: center;
            margin: 0 0 20px 0;
            background: url(dimension.png);
            }
        
            #project {
            float: left;
            }
        
            #project span {
            color: #5D6975;
            text-align: right;
            width: 52px;
            margin-right: 10px;
            display: inline-block;
            font-size: 0.8em;
            }
        
            #company {
            float: right;
            text-align: right;
            }
        
            #project div,
            #company div {
            white-space: nowrap;        
            }
        
            table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            margin-bottom: 20px;
            }
        
            table tr:nth-child(2n-1) td {
            background: #F5F5F5;
            }
        
            table th,
            table td {
            text-align: center;
            }
        
            table th {
            padding: 5px 20px;
            color: #5D6975;
            border-bottom: 1px solid #C1CED9;
            white-space: nowrap;        
            font-weight: normal;
            }
        
            table .service,
            table .desc {
            text-align: left;
            }
        
            table td {
            padding: 20px;
            text-align: right;
            }
        
            table td.service,
            table td.desc {
            vertical-align: top;
            }
        
            table td.unit,
            table td.qty,
            table td.total {
            font-size: 1.2em;
            }
        
            table td.grand {
            border-top: 1px solid #5D6975;;
            }
        
            #notices .notice {
            color: #5D6975;
            font-size: 1.2em;
            }
        
            footer {
            color: #5D6975;
            width: 100%;
            height: 30px;
            position: static;
            bottom: 0;
            border-top: 1px solid #C1CED9;
            padding: 8px 0;
            text-align: center;
            }
          </style>
          <body>
            <header class="clearfix">
              <div id="logo">
              <img src="https://i.ibb.co/gZwkfXc/logo.png" alt="logo" style="height: 150px;width: 300px;"></a>
              </div>
              <h1>REPORTE VALORES RECAUDADOS POR COBRAR</h1>
              <div id="company" class="clearfix">
        
              </div>
              <div id="project">
              </div>
            </header>
            <main>
              <table>
                <thead>
                  <tr>
                    <th class="service">Jhon Bedoya</th>
                    <th class="desc" >Santiago Llumiquinga</th>
                    <th class="desc" style="text-align: right;" >Johanna Moncayo</th>
                  </tr>

                </thead>
                <tbody>
                  <tr>
                    <td class="service">Transferencia</td>
                    <td class="desc">Efectivo</td>
                    <td class="unit">Tajeta</td>
                  </tr>
        
                  <tr>
                    <td class="service">$200.15</td>
                    <td class="desc">$536.02</td>
                    <td class="unit">$125.00</td>
                  </tr>
                </tbody>
              </table>
            </main>
            <footer>
                DESIGNED BY GRUPO 11
            </footer>
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
