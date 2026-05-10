const form = document.querySelector('#formImc');
const input = document.getElementById('darkmode-switch');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputPeso = e.target.querySelector('#peso');
    const inputAltura = e.target.querySelector('#altura');

    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    if (!peso) {
        setResultado('Peso inválido', false);
        return;
    }

    if (!altura) {
        setResultado('Altura inválida', false);
        return;
    }

    const imc = getImc(peso, altura);
    const grauImc = getGrauImc(imc);

    const msg = `Seu IMC é ${imc.toFixed(2)} (${grauImc}).`;
    const eSaudavel = imc > 18.4 && imc < 30.00;

    setResultado(msg, eSaudavel);

});

function getGrauImc(imc) {
    const grau = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau I', 'Obesidade grau II', 'Obesidade grau III'];

    if (imc >= 39.9) return grau[5];
    if (imc >= 34.9) return grau[4];
    if (imc >= 29.9) return grau[3];
    if (imc >= 24.9) return grau[2];
    if (imc >= 18.5) return grau[1];
    return grau[0];
}

function getImc(peso, altura) {
    const imc = peso / (altura ** 2);
    return imc;
}

function criaP() {
    return document.createElement('p');
}

function setResultado(msg, isValid) {
    const resultado = document.querySelector('#resultadoTexto');
    resultado.innerHTML = '';

    const p = criaP();
    p.classList.add(isValid ? 'p-resultado' : 'bad');
    p.innerHTML = msg;
    resultado.appendChild(p);
}

input.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});
