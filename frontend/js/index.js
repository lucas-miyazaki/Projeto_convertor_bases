// Função principal para converter o número usando o backend
async function converter() {
    // Pegar o número digitado nos inputs, tirar espaços e deixar em maiúsculo, além disso linkar componentes da pagina
    const numero = document.getElementById("numero").value.trim().toUpperCase();
    const baseOrigem = parseInt(document.getElementById("base-origem").value);
    const baseDestino = parseInt(document.getElementById("base-destino").value);
    const resultadoInput = document.getElementById("resultado");
    const mensagemDiv = document.getElementById("mensagem");

    // Esconder a mensagem antes de começar
    mensagemDiv.style.display = "none"; // deixa o resultado oculto (por estar vazio)
    mensagemDiv.className = "mensagem";

    // Verificar se as bases foram selecionadas corretamente (Primeira validação)
    if (isNaN(baseOrigem) || isNaN(baseDestino)) {
        mostrarMensagem("Selecione as bases de origem e destino", "erro");
        return; // Encerra a função 
    }

    // Verificar se o usuário digitou um número (mais uma validação)
    if (!numero) {
        mostrarMensagem("Digite um número para converter", "erro");
        return;
    }

    // Validar se o número digitado é válido para a base de origem (mais uma validação ;-;)
    if (!validarNumero(numero, baseOrigem)) {
        mostrarMensagem(`Número inválido para base ${baseOrigem}`, "erro");
        return;
    }

    try {
        // Montar a URL da requisição para seu backend 
        const url = `http://127.0.0.1:5000/converter/${numero}/${baseOrigem}/${baseDestino}`;

        // Fazer a requisição para o backend e esperar a resposta (manda as informações do front end para o back end)
        const resposta = await fetch(url);

        // Se a resposta não foi OK, mostrar a mensagem de erro
        if (!resposta.ok) {
            const erro = await resposta.text();
            mostrarMensagem(erro || "Erro na conversão", "erro");
            return;
        }

        // Pegar os dados da resposta em JSON (recebe a resposta do back end)
        const dados = await resposta.json();

        // Mostrar o resultado no campo de resultado (ou tem o resultado certo ou vai ficar em branco)
        resultadoInput.value = dados.resultado || "";

        // Mostrar mensagem de sucesso
        mostrarMensagem("Conversão realizada com sucesso!", "sucesso");

    } catch (erro) {
        // Se deu algum problema ao falar com o servidor (ex: backend desligado)
        mostrarMensagem("Erro ao se comunicar com o servidor.", "erro");
        console.error(erro);
    }
}

// Função para validar se o número está correto para a base informada (Mais uma validação)
function validarNumero(numero, base) {
    // Quais caracteres são válidos para cada base
    // Obrigatoriamente, as seguintes bases: binária (base 2), decimal (base 10), hexadecimal (base 16) 
    // Bases de escolha pelo grupo: Ternário (base 3), Quinário (base 5), Octal (base 8)
    const caracteresValidos = {
        2: "01",
        3: "012",
        5: "01234",
        8: "01234567",
        10: "0123456789",
        16: "0123456789ABCDEF"
    };

    // Pegar os caracteres válidos para a base escolhida
    const validos = caracteresValidos[base];
    if (!validos) return false; // Se base não suportada, retorna falso (DIFICILMENETE, mas o usuario é imprevisivel)

    // Verificar cada caractere do número digitado (testa os caracteres com base no caracteresValidos)
    for (let i = 0; i < numero.length; i++) {
        if (!validos.includes(numero[i])) {
            return false; // Se algum caractere não é válido, retorna falso
        }
    }

    return true; // Se passou em tudo, número é válido
}

// Função para mostrar mensagem para o usuário
function mostrarMensagem(texto, tipo) {
    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.textContent = texto; // mostra o resultado da conversão 
    mensagemDiv.className = `mensagem ${tipo}`; // Definir a classe para estilo (erro ou sucesso) 
    mensagemDiv.style.display = "block"; // Mostrar a mensagem (que antes estava oculta)
}

// Para caso o usuario clique em enter a conversão aconteça 
document.getElementById("numero").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        converter();
    }
});
