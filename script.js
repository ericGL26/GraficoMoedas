var Indicacao_acao_selecionada = document.getElementById('Indicacao_acao_selecionada');
var Preco_moeda = document.getElementById('Preco_moeda');
var indicadorMinimo = document.getElementById('indicadorMinimo');
var indicadorMaximo = document.getElementById('indicadorMaximo');
var dataAtualizacao = document.getElementById('dataAtualizacao');
var moedaAtual = document.getElementById('moedaAtual');
var input_escolha_moeda = document.getElementById('input_escolha_moeda');
var titulo_primeira_acao_superior = document.getElementById('titulo_primeira_acao_superior');
var preco_primeira_acao_superior = document.getElementById('preco_primeira_acao_superior');
var titulo_segunda_acao_superior = document.getElementById('titulo_segunda_acao_superior');
var preco_segunda_acao_superior = document.getElementById('preco_segunda_acao_superior');
var titulo_terceira_acao_superior = document.getElementById('titulo_terceira_acao_superior');
var preco_terceira_acao_superior = document.getElementById('preco_terceira_acao_superior');
var titulo_quarta_acao_superior = document.getElementById('titulo_quarta_acao_superior');
var preco_quarta_acao_superior = document.getElementById('preco_quarta_acao_superior');
var titulo_quinta_acao_superior = document.getElementById('titulo_quinta_acao_superior');
var preco_quinta_acao_superior = document.getElementById('preco_quinta_acao_superior');
var titulo_sexta_acao_superior = document.getElementById('titulo_sexta_acao_superior');
var preco_sexta_acao_superior = document.getElementById('preco_sexta_acao_superior');
var myChart = null;

// Função para criar o gráfico
function createChart(data) {
  const labels = data.labels;
  const lows = data.lows;

  const chartData = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: lows,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const config = {
    type: 'line',
    data: chartData,
  };

  // Verifica se há um gráfico existente e o destroi
  if (myChart) {
    myChart.destroy();
  }

  // Cria um novo gráfico e armazena-o na variável myChart
  myChart = new Chart(document.getElementById('myChart').getContext('2d'), config);
}

input_escolha_moeda.addEventListener("input", function () {
  var link = `https://brapi.dev/api/v2/currency?currency=${input_escolha_moeda.value}`;

  fetch(link)
    .then((res) => res.json())
    .then(data => {
      Indicacao_acao_selecionada.innerText = data.name;
      var valores = data.currency[0];
      Indicacao_acao_selecionada.innerText = valores.name;
      Preco_moeda.innerText = valores.bidPrice;
      indicadorMinimo.innerText = valores.low;
      indicadorMaximo.innerText = valores.high;
      dataAtualizacao.innerText = valores.updatedAtDate;
      moedaAtual.innerText = valores.fromCurrency;
    })
    .catch(error => {
      console.error("Erro ao buscar os dados:", error);
    });

  fetch(`https://brapi.dev/api/quote/${input_escolha_moeda.value}?range=max&interval=1d&fundamental=true`)
    .then((res) => res.json())
    .then(dados => {
      var dadosExemplo = dados.results[0].historicalDataPrice;
      const labelss = dadosExemplo.map(dado => new Date(dado.date * 1000).toLocaleDateString());
      const lows = dadosExemplo.map(dado => dado.low);

      const labels = labelss;
      const newData = {
        labels: labels,
        lows: lows
      };

      createChart(newData);
    })
    .catch(error => {
      console.error("Erro ao buscar os dados:", error);
      // Caso ocorra algum erro, você pode destruir o gráfico atual aqui, se necessário
      if (myChart) {
        myChart.destroy();
        myChart = null; // Limpar a variável após destruir o gráfico
      }
    });
});

//REQUISICAO DAS INFORMACOES SUPERIORES DO SITE
fetch('https://brapi.dev/api/v2/currency?currency=USD,EUR,CAD,CHF,AED,VEF')
  .then((res) => res.json())
  .then(data => {
    titulo_primeira_acao_superior.innerText = data.currency[0].name;
    preco_primeira_acao_superior.innerText = data.currency[0].bidPrice;

    titulo_segunda_acao_superior.innerText = data.currency[1].name;
    preco_segunda_acao_superior.innerText = data.currency[1].bidPrice;

    titulo_terceira_acao_superior.innerText = data.currency[2].name;
    preco_terceira_acao_superior.innerText = data.currency[2].bidPrice;

    titulo_quarta_acao_superior.innerText = data.currency[3].name;
    preco_quarta_acao_superior.innerText = data.currency[3].bidPrice;

    titulo_quinta_acao_superior.innerText = data.currency[4].name;
    preco_quinta_acao_superior.innerText = data.currency[4].bidPrice;

    titulo_sexta_acao_superior.innerText = data.currency[5].name;
    preco_sexta_acao_superior.innerText = data.currency[5].bidPrice;
  })
  .catch(error => {
    console.error("Erro ao buscar os dados:", error);
  });

// Dados para o gráfico (substitua esses dados pelos seus próprios)
// Nenhuma operação com o gráfico aqui, os dados são obtidos apenas para o exemplo
