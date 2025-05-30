function converter() {
    const numero = document.getElementById("numero").value.trim().toUpperCase();
    const baseOrigem = parseInt(document.getElementById("base-origem").value);
    const baseDestino = parseInt(document.getElementById("base-destino").value);
    const resultadoInput = document.getElementById("resultado");
    const mensagemDiv = document.getElementById("mensagem");

    // Limpar mensagens anteriores
    mensagemDiv.style.display = "none";
    mensagemDiv.className = "mensagem";

    // Validar seleção das bases
    if (isNaN(baseOrigem) || isNaN(baseDestino)) {
        mostrarMensagem("Selecione as bases de origem e destino", "erro");
        return;
    }

    // Validar entrada
    if (!numero) {
        mostrarMensagem("Digite um número para converter", "erro");
        return;
    }

    try {
        // Validar caracteres para a base de origem
        if (!validarNumero(numero, baseOrigem)) {
            mostrarMensagem(`Número inválido para base ${baseOrigem}`, "erro");
            return;
        }

        // Converter para decimal
        const decimal = parseInt(numero, baseOrigem);

        // Verificar se a conversão foi bem sucedida
        if (isNaN(decimal)) {
            mostrarMensagem("Erro na conversão. Verifique o número digitado.", "erro");
            return;
        }

        // Converter para a base de destino
        const resultado = decimal.toString(baseDestino).toUpperCase();

        // Mostrar resultado
        resultadoInput.value = resultado;
        mostrarMensagem("Conversão realizada com sucesso!", "sucesso");

    } catch (erro) {
        mostrarMensagem("Erro na conversão. Verifique os dados inseridos.", "erro");
        console.error(erro);
    }
}

function validarNumero(numero, base) {
    // Caracteres válidos para cada base
    const caracteresValidos = {
        2: "01",
        3: "012",
        5: "01234",
        8: "01234567",
        10: "0123456789",
        16: "0123456789ABCDEF"
    };

    // Se a base não estiver definida, retorna falso
    if (!caracteresValidos[base]) {
        return false;
    }

    // Conjunto de caracteres válidos para a base
    const caracteres = caracteresValidos[base];

    // Verificar cada caractere do número
    for (let i = 0; i < numero.length; i++) {
        if (caracteres.indexOf(numero[i]) === -1) {
            return false;
        }
    }

    return true;
}

function mostrarMensagem(texto, tipo) {
    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.textContent = texto;
    mensagemDiv.className = `mensagem ${tipo}`;
    mensagemDiv.style.display = "block";
}

// Enter para converter
document.getElementById("numero").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        converter();
    }
});