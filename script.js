const btn = window.document.getElementById('submit-btn');
const inputs = window.document.querySelectorAll('input');
const cep = window.document.getElementById('cep');

cep.addEventListener('focusout', searchCep); // cria um evento para quando o campo perder o foco

const cepValido = (cep) => {
    cep = cep.replace(/\D/g, ''); // remove tudo que não é número
    return cep.length === 8; // verifica se o CEP tem 8 dígitos
}

async function searchCep(){

    const url = `https://viacep.com.br/ws/${cep.value}/json/`; // cria a URL para a requisição

    if(cepValido(cep.value)){
        const response = await fetch(url); // envia a requisição para a API
        const address = await response.json(); // transforma a resposta em JSON

        if(address .hasOwnProperty('erro')){ // verifica se o CEP existe
            alert('CEP não encontrado!');
        } else{
            document.getElementById('address').value = address.logradouro;
            document.getElementById('neighborhood').value = address.bairro;
            document.getElementById('city').value = address.localidade;
            document.getElementById('state').value = address.uf;
        }
    } else if(cep.value.length === 0){
        return;
    } else{
        alert('CEP inválido!');
    }
}

btn.addEventListener('click', (event) => {
    event.preventDefault(); 
    let empty = false;

    inputs.forEach((input) => {
        if(input.name === 'complement') return;

        if(input.value.trim() === ""){
            empty = true;
        }
    });

    if(empty){
        alert('Por favor, preencha todos os campos antes de enviar o formulário.');
    } else{
        alert('Formulário enviado com sucesso!');

        inputs.forEach((input) => {
        input.value = "";
        });
    }
});