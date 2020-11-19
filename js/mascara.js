const permitidoSomenteInteiros = valor => valor.replace(/\D/g,'');
const permitido = valor => valor.replace(/[^0-9-.]/g,'');