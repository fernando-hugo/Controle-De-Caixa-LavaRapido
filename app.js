// Arrays principais
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let servicos = JSON.parse(localStorage.getItem('servicos')) || [];
let lavagens = JSON.parse(localStorage.getItem('lavagens')) || [];
let pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
let gastos = JSON.parse(localStorage.getItem('gastos')) || [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  feather.replace();
  atualizarDashboard();
  popularServicosDropdown();
  popularClientesDropdown();
  bindFormEvents();
});

// ------------------ MODAIS ------------------
function openModal(type) {
  const modal = document.getElementById(`modal-${type}`);
  if (modal) modal.classList.remove('hidden');
}

function closeModal(type) {
  const modal = document.getElementById(`modal-${type}`);
  if (modal) modal.classList.add('hidden');
}

// ------------------ CLIENTES ------------------
function addCliente(nome, telefone, veiculo, placa, cor) {
  if (!nome) return alert('Digite o nome do cliente');
  clientes.push({ nome, telefone, veiculo, placa, cor });
  salvarClientes();
  popularClientesDropdown();
  atualizarDashboard();
}

function popularClientesDropdown() {
  const select = document.getElementById('washCliente');
  if (!select) return;
  select.innerHTML = '<option value="">-- Selecionar Cliente --</option>';
  clientes.forEach(c => {
    const option = document.createElement('option');
    option.value = c.nome;
    option.textContent = c.nome;
    select.appendChild(option);
  });
}

// ------------------ SERVIÇOS ------------------
function addServico(nome, preco) {
  if (!nome || preco === '' || isNaN(preco)) return alert('Digite nome e preço válido');
  servicos.push({ nome, preco: parseFloat(preco) });
  salvarServicos();
  renderServicosList();
  popularServicosDropdown();
}

function removeServico(index) {
  if (!confirm('Deseja realmente excluir este serviço?')) return;
  servicos.splice(index, 1);
  salvarServicos();
  renderServicosList();
  popularServicosDropdown();
  renderLavagens();
}

function renderServicosList() {
  const container = document.getElementById('popularServices');
  if (!container) return;
  container.innerHTML = '';
  servicos.forEach((s, i) => {
    const div = document.createElement('div');
    div.classList.add('flex', 'justify-between', 'items-center');
    div.innerHTML = `<span>${s.nome} - R$ ${s.preco.toFixed(2)}</span>
                     <button onclick="removeServico(${i})" class="text-red-600 text-xs">Excluir</button>`;
    container.appendChild(div);
  });
}

function popularServicosDropdown() {
  const select = document.getElementById('washServico');
  if (!select) return;
  select.innerHTML = '<option value="">-- Selecionar Serviço --</option>';
  servicos.forEach((s, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${s.nome} - R$ ${s.preco.toFixed(2)}`;
    select.appendChild(option);
  });
}

// ------------------ GASTOS ------------------
function addGasto(tipo, valor) {
  gastos.push({ tipo, valor: parseFloat(valor), data: new Date() });
  salvarGastos();
  atualizarDashboard();
}

function renderGastos() {
  return gastos.map(g => g.valor).reduce((acc, v) => acc + v, 0);
}

function salvarGastos() {
  localStorage.setItem('gastos', JSON.stringify(gastos));
}

// ------------------ LAVAGENS ------------------
function bindFormEvents() {
  // Form Lavagem
  const washForm = document.getElementById('washForm');
  if (washForm) {
    washForm.addEventListener('submit', e => {
      e.preventDefault();
      const cliente = document.getElementById('washCliente').value || 'Sem cliente';
      const servicoIndex = document.getElementById('washServico').value;
      const veiculo = document.getElementById('washVeiculo').value;
      const placa = document.getElementById('washPlaca').value;
      const cor = document.getElementById('washCor').value;

      if (servicoIndex === '') return alert('Selecione um serviço');
      const servico = servicos[servicoIndex];

      const lavagem = {
        cliente,
        servico: servico.nome,
        preco: servico.preco,
        veiculo,
        placa,
        cor,
        status: 'Em andamento',
        pago: false,
        data: new Date()
      };

      lavagens.push(lavagem);
      salvarLavagens();
      closeModal('wash');
      washForm.reset();
      renderLavagens();
      atualizarDashboard();
    });
  }

  // Form Cliente
  const clientForm = document.getElementById('clientForm');
  if (clientForm) {
    clientForm.addEventListener('submit', e => {
      e.preventDefault();
      const nome = document.getElementById('clientNome').value;
      const telefone = document.getElementById('clientTelefone').value;
      const veiculo = document.getElementById('clientVeiculo').value;
      const placa = document.getElementById('clientPlaca').value;
      const cor = document.getElementById('clientCor').value;

      addCliente(nome, telefone, veiculo, placa, cor);
      closeModal('client');
      clientForm.reset();
    });
  }

  // Form Serviço
  const serviceForm = document.getElementById('serviceForm');
  if (serviceForm) {
    serviceForm.addEventListener('submit', e => {
      e.preventDefault();
      const nome = document.getElementById('serviceNome').value;
      const preco = document.getElementById('servicePreco').value;
      addServico(nome, preco);
      closeModal('service');
      serviceForm.reset();
    });
  }

  // Form Gasto
  const expenseForm = document.getElementById('expenseForm');
  if (expenseForm) {
    expenseForm.addEventListener('submit', e => {
      e.preventDefault();
      const tipo = document.getElementById('expenseTipo').value;
      const valor = parseFloat(document.getElementById('expenseValor').value);

      if (!tipo || isNaN(valor)) return alert('Digite tipo e valor válidos');

      addGasto(tipo, valor);
      closeModal('expense');
      expenseForm.reset();
      renderReport('monthly'); // Atualiza o relatório já considerando o gasto
      atualizarDashboard();    // Atualiza dashboard
    });
  }
}

function renderLavagens() {
  const tbody = document.getElementById('washTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  lavagens.forEach((l, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-6 py-4">${l.cliente}</td>
      <td class="px-6 py-4">${l.servico} - R$ ${l.preco.toFixed(2)}</td>
      <td class="px-6 py-4">${l.veiculo} - ${l.placa} - ${l.cor}</td>
      <td class="px-6 py-4">${l.status}</td>
      <td class="px-6 py-4">${l.pago ? 'Sim' : 'Não'}</td>
      <td class="px-6 py-4 space-x-2">
        <button onclick="finalizarLavagem(${i})" class="text-green-600 text-sm">Finalizar</button>
        <button onclick="pagarLavagem(${i})" class="text-blue-600 text-sm">Pagar</button>
        <button onclick="editarLavagem(${i})" class="text-yellow-600 text-sm">Editar</button>
        <button onclick="removerLavagem(${i})" class="text-red-600 text-sm">Excluir</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

// Finalizar lavagem
function finalizarLavagem(index) {
  lavagens[index].status = 'Finalizada';
  salvarLavagens();
  renderLavagens();
  atualizarDashboard();
}

// Pagar lavagem
function pagarLavagem(index) {
  if (!lavagens[index].pago) pagamentos.push(lavagens[index]);
  lavagens[index].pago = true;
  salvarPagamentos();
  renderLavagens();
  atualizarDashboard();
}

// Remover lavagem
function removerLavagem(index) {
  if (!confirm('Deseja realmente excluir esta lavagem?')) return;
  lavagens.splice(index, 1);
  salvarLavagens();
  renderLavagens();
  atualizarDashboard();
}

// Editar lavagem
function editarLavagem(index) {
  const l = lavagens[index];
  document.getElementById('washCliente').value = l.cliente === 'Sem cliente' ? '' : l.cliente;
  const servIndex = servicos.findIndex(s => s.nome === l.servico);
  document.getElementById('washServico').value = servIndex;
  document.getElementById('washVeiculo').value = l.veiculo;
  document.getElementById('washPlaca').value = l.placa;
  document.getElementById('washCor').value = l.cor;

  closeModal('wash');
  openModal('wash');

  const washForm = document.getElementById('washForm');
  washForm.onsubmit = e => {
    e.preventDefault();
    const cliente = document.getElementById('washCliente').value || 'Sem cliente';
    const servicoIndex = document.getElementById('washServico').value;
    const veiculo = document.getElementById('washVeiculo').value;
    const placa = document.getElementById('washPlaca').value;
    const cor = document.getElementById('washCor').value;

    if (servicoIndex === '') return alert('Selecione um serviço');
    const servico = servicos[servicoIndex];

    lavagens[index] = {
      ...lavagens[index],
      cliente,
      servico: servico.nome,
      preco: servico.preco,
      veiculo,
      placa,
      cor
    };

    salvarLavagens();
    washForm.reset();
    closeModal('wash');
    renderLavagens();
    atualizarDashboard();
    bindFormEvents();
  };
}

// ------------------ RELATÓRIOS ------------------
function renderReport(tipo) {
  const now = new Date();
  let total = 0;
  let html = '';

  pagamentos.forEach(l => {
    const diffDays = (now - new Date(l.data)) / (1000 * 60 * 60 * 24);
    if ((tipo === 'daily' && diffDays <= 1) ||
        (tipo === 'weekly' && diffDays <= 7) ||
        (tipo === 'monthly' && diffDays <= 30)) {
      total += l.preco;
      html += `<div>${l.cliente} - ${l.servico} - R$ ${l.preco.toFixed(2)} - ${new Date(l.data).toLocaleString()}</div>`;
    }
  });

  const totalGastos = gastos.reduce((acc, g) => {
    const diffDays = (now - new Date(g.data)) / (1000 * 60 * 60 * 24);
    if ((tipo === 'daily' && diffDays <= 1) ||
        (tipo === 'weekly' && diffDays <= 7) ||
        (tipo === 'monthly' && diffDays <= 30)) {
      return acc + g.valor;
    }
    return acc;
  }, 0);

  const totalTaxa = total * 0.03;
  const totalLiquido = total - totalGastos - totalTaxa;

  html += `<div class="mt-2 font-bold">Total Bruto: R$ ${total.toFixed(2)}</div>`;
  html += `<div class="font-bold">Total Gastos: R$ ${totalGastos.toFixed(2)}</div>`;
  html += `<div class="font-bold">Taxa Máquina (3%): R$ ${totalTaxa.toFixed(2)}</div>`;
  html += `<div class="font-bold">Total Líquido: R$ ${totalLiquido.toFixed(2)}</div>`;

  document.getElementById('reportResult').innerHTML = html;
}

// ------------------ DASHBOARD ------------------
function atualizarDashboard() {
  const hoje = new Date();
  let lavagensHoje = 0;
  let faturamento = 0;
  let clientesNovos = clientes.length;
  let totalCarros = lavagens.length;
  let totalValor = 0;

  lavagens.forEach(l => {
    totalValor += l.preco;
    if (new Date(l.data).toDateString() === hoje.toDateString()) lavagensHoje++;
    if (l.pago) faturamento += l.preco;
  });

  document.getElementById('lavagensHoje').textContent = lavagensHoje;
  document.getElementById('faturamento').textContent = `R$ ${faturamento.toFixed(2)}`;
  document.getElementById('clientesNovos').textContent = clientesNovos;
  document.getElementById('mediaCarro').textContent = totalCarros ? `R$ ${(totalValor / totalCarros).toFixed(2)}` : 'R$ 0,00';

  renderLavagens();
  renderServicosList();
}

// ------------------ UTIL ------------------
function clearMonthlyData() {
  if (!confirm('Deseja realmente zerar os dados do mês?')) return;

  lavagens = [];
  pagamentos = [];
  gastos = [];

  salvarLavagens();
  salvarPagamentos();
  salvarGastos();

  renderLavagens();
  atualizarDashboard();
  renderReport('monthly');
}

// ------------------ EXPORTAR PDF ------------------
function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'pt');

  doc.setFontSize(14);
  doc.text('Relatório de Lavagens', 300, 30, { align: 'center' });

  const headers = ["Cliente", "Serviço", "Preço", "Veículo", "Placa", "Cor", "Status", "Pago", "Data"];
  const data = lavagens.map(l => [
    l.cliente,
    l.servico,
    `R$ ${l.preco.toFixed(2)}`,
    l.veiculo,
    l.placa,
    l.cor,
    l.status,
    l.pago ? 'Sim' : 'Não',
    new Date(l.data).toLocaleString()
  ]);

  // Chamada correta do autoTable
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 50,
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] }
  });

  const totalBruto = pagamentos.reduce((acc, l) => acc + l.preco, 0);
  const totalGastos = gastos.reduce((acc, g) => acc + g.valor, 0);
  const taxaMaquina = totalBruto * 0.03;
  const totalLiquido = totalBruto - totalGastos - taxaMaquina;

  let y = doc.lastAutoTable.finalY + 20;
  doc.setFontSize(12);
  doc.text(`Total Bruto: R$ ${totalBruto.toFixed(2)}`, 40, y);
  y += 20;
  doc.text(`Total Gastos: R$ ${totalGastos.toFixed(2)}`, 40, y);
  y += 20;
  doc.text(`Taxa Máquina (3%): R$ ${taxaMaquina.toFixed(2)}`, 40, y);
  y += 20;
  doc.text(`Total Líquido: R$ ${totalLiquido.toFixed(2)}`, 40, y);

  doc.save('relatorio_lavagens.pdf');
}



// ------------------ LOCALSTORAGE ------------------
function salvarClientes() {
  localStorage.setItem('clientes', JSON.stringify(clientes));
}

function salvarServicos() {
  localStorage.setItem('servicos', JSON.stringify(servicos));
}

function salvarLavagens() {
  localStorage.setItem('lavagens', JSON.stringify(lavagens));
}

function salvarPagamentos() {
  localStorage.setItem('pagamentos', JSON.stringify(pagamentos));
}

