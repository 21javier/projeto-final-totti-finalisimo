console.log("Projeto Turma 48");

// Desabilita o botão de envio inicialmente
document.getElementById("enviar").setAttribute("disabled", true);

// Aplica máscara e validação ao CPF
document.getElementById("cpf").addEventListener("input", function (e) {
  const input = e.target.value.replace(/[^\d]/g, "");
  e.target.value = mascaraCPF(e.target);
  ativaDesativaEnviar(validarCPF(input));
});

// Aplica máscara e validação ao telefone
document.getElementById("telefone").addEventListener("input", function (e) {
  const input = e.target.value.replace(/[^\d]/g, "");
  e.target.value = mascaraTelefone(e);
  ativaDesativaEnviar(validarTelefone(input));
});

// Valida as notas e habilita/desabilita o botão de enviar
document.getElementById("prova1").addEventListener("input", function (e) {
  ativaDesativaEnviar(validarNumero(parseFloat(e.target.value)));
});

document.getElementById("prova2").addEventListener("input", function (e) {
  ativaDesativaEnviar(validarNumero(parseFloat(e.target.value)));
});

const students = [];

// Classe para representar um aluno
class Studant {
  constructor(nome, cpf, nascimento, email, telefone, pais, estado, cidade, prova1, prova2) {
    this.nome = nome;
    this.cpf = cpf;
    this.nascimento = nascimento;
    this.email = email;
    this.telefone = telefone;
    this.pais = pais;
    this.estado = estado;
    this.cidade = cidade;
    this.prova1 = prova1;
    this.prova2 = prova2;
    this.media = (prova1 + prova2) / 2;
    this.situacao = this.media >= 5 ? "aprovado" : "reprovado";
  }

  exibeDados() {
    return `O Aluno ${this.nome} tirou nota ${this.prova1} na P1 e ${this.prova2} na P2. Sua média é: ${this.media.toString().replace(".", ",")} e está ${this.situacao}`;
  }
}

// Habilita ou desabilita o botão de envio baseado nas validações
function ativaDesativaEnviar(valor) {
  const prova1 = parseFloat(document.getElementById("prova1").value);
  const prova2 = parseFloat(document.getElementById("prova2").value);

  if (valor && validarNumero(prova1) && validarNumero(prova2)) {
    document.getElementById("enviar").removeAttribute("disabled");
  } else {
    document.getElementById("enviar").setAttribute("disabled", true);
  }
}

function mascara(i){
   
  var v = i.value;
  
  if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
     i.value = v.substring(0, v.length-1);
     return;
  }
  
  i.setAttribute("maxlength", "14");
  if (v.length == 3 || v.length == 7) i.value += ".";
  if (v.length == 11) i.value += "-";

}

const handlePhone = (event) => {
  let input = event.target
  input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}

// Função para enviar o formulário e adicionar o aluno à lista
function enviarFormulario() {
  const nome = document.getElementById("name").value;
  const cpf = document.getElementById("cpf").value;
  const nascimento = document.getElementById("nascimento").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const pais = document.getElementById("pais").value;
  const estado = document.getElementById("estado").value;
  const cidade = document.getElementById("cidade").value;
  const prova1 = parseFloat(document.getElementById("prova1").value);
  const prova2 = parseFloat(document.getElementById("prova2").value);

  const student = new Studant(nome, cpf, nascimento, email, telefone, pais, estado, cidade, prova1, prova2);

  students.push(student);
  renderData();
  document.getElementById("studentForm").reset();
  document.getElementById("enviar").setAttribute("disabled", true);
}

// Função para exibir os dados dos alunos na tabela
function renderData() {
  const studentTableBody = document.getElementById("studentTableBody");
  studentTableBody.innerHTML = "";

  students.forEach((student) => {
    const row = document.createElement("tr");

    const data = [student.nome, student.cpf, student.nascimento, student.email, student.telefone, student.pais, student.estado, student.cidade, student.prova1, student.prova2, student.media, student.situacao];

    data.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    studentTableBody.appendChild(row);
  });
}

// Adiciona o evento de clique ao botão enviar para chamar a função de enviar formulário
document.getElementById("enviar").addEventListener("click", enviarFormulario);
