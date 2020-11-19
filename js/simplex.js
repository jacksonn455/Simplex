const divInicial = $('#var-ini');
const formInicial = $('#form-ini');
const btnProximo = $('#btn-proximo');
const btnVoltar = $('#btn-voltar');

let textosConvertidos = [];

let pagina = 1;
let countMapLocalStorage = 0;

let valores = {};
let folga = {};
let newMapProp = {};
let continua = true;
let liberaDefaut = false;
let countNewMap = 0;

const paginacaoMetodos = (pagina) => {
    if(continua){
        switch (pagina) {
            case 0:
                window.location.assign('index.html');
                break;
            case 1:
                removeDivAux();
                break;
            case 2:
                if ($(`#tabela-pag-${pagina + 1}`).length > 0) {
                    $(`#tabela-pag-${pagina + 1}`).remove();
                    newMapProp = JSON.parse(localStorage[`newMapP${countNewMap}`]);
                } else {
                    metodoAuxiliares();
                }
    
                break;
            case 3:
                if ($(`#tabela-pag-${pagina + 1}`).length > 0) {
                    $(`#tabela-pag-${pagina + 1}`).remove();
                    $(`#div-fim-pag-${pagina + 1}`).remove();
                    countNewMap--;
                    newMapProp = JSON.parse(localStorage[`newMapP${0}`]);
                } else {
                    liberaDefaut = true;
                    tabelaInicial(pagina, newMapProp);
                }
                break;
            case 4:
                if ($(`#tabela-pag-${pagina + 1}`).length > 0) {
                    $(`#tabela-pag-${pagina + 1}`).remove();
                    $(`#div-fim-pag-${pagina + 1}`).remove();
                    countNewMap--;
                    newMapProp = JSON.parse(localStorage[`newMapP${countNewMap}`]);
                } else {
                    localStorage.setItem(`newMapP${countNewMap}`, JSON.stringify(newMapProp));
                    countNewMap++;
                    newMapProp = calcSimplex(newMapProp);
                    tabelaInicial(pagina, newMapProp);
                    let mapaFi = calcVbVnbValz(newMapProp);
                    valoresFinal(mapaFi,pagina,newMapProp);
                    liberaDefaut = true;
                }
                break;
            default:
                if ($(`#tabela-pag-${pagina + 1}`).length > 0) {
                    $(`#tabela-pag-${pagina + 1}`).remove();
                    $(`#div-fim-pag-${pagina + 1}`).remove();
                    countNewMap--;
                    newMapProp = JSON.parse(localStorage[`newMapP${countNewMap}`]);
                } else {
    
                    if (liberaDefaut) {
                        localStorage.setItem(`newMapP${countNewMap}`, JSON.stringify(newMapProp));
                        newMapProp = calcSimplex(newMapProp,pagina);
                        if (continua) {
                            countNewMap++;
                            tabelaInicial(pagina, newMapProp);
                            let mapaFi = calcVbVnbValz(newMapProp);
                            valoresFinal(mapaFi,pagina,newMapProp);
                        }
                    }
                }
                break;
        }
    }
}

btnVoltar.click(event => {
    pagina--;
    !continua && pagina--;
    continua = true;
    paginacaoMetodos(pagina);
})
btnProximo.click(event => {
    if(continua) {
        pagina++;
    }
    paginacaoMetodos(pagina);
})


$(document).ready(() => {
    valores = JSON.parse((localStorage.mapValores));
    folga = JSON.parse((localStorage.valF));
    textosConvertidos = [];

    // criar p max/min de Z
    tipoX = 1;
    tipoF = 1;
    let texto = '';
    for (chave in valores.Z) {
        if (chave !== `f${tipoF}` && chave !== 't') {
            if (valores.Z[chave].toLowerCase() === 'maximizar') {
                texto += `Max Z: `;
            }
            else if (valores.Z[chave].toLowerCase() === 'minimizar') {
                texto += `Min Z: `;
            }
            else {
                let corta = valores.Z[chave].split(' ');
                if (corta[1] === '0') {
                    tipoX++;
                } else {
                    if (chave === `x${tipoX}`) {

                        if (corta[1] === '1') {
                            if (corta[0] !== '+') {
                                texto += `${corta[0]} ${chave} `;
                            } else {
                                texto += `${chave} `;
                            }
                        } else {
                            let corta = valores.Z[chave].split(' ');
                            if (corta[0] !== '+') {
                                texto += `${corta[0]} ${corta[1]}${chave} `;
                            } else {
                                texto += `${corta[1]}${chave} `;
                            }
                        }

                    } else {
                        if (corta[1] === '1') {
                            texto += `${corta[0]} ${chave} `;
                        } else {
                            texto += `${corta[0]} ${corta[1]}${chave} `;
                        }

                    }
                }
            }
        } else {
            tipoF++;
        }

    }
    let p = criarP('expre_orig', '', texto);
    divInicial.append(p);
    textosConvertidos.push(texto);
    // terminado

    let textos = [];
    for (chaveP in valores.V) {
        texto = '';
        tipoX = 1;
        let tipoF = 0;
        let val = valores.V[chaveP];
        for (chaveS in val) {
            let corta = val[chaveS].split(' ');

            if (chaveS !== 'z' && chaveS !== `f${tipoF}`) {
                if (corta[1] === '0') {
                    tipoX++;
                } else {
                    if (chaveS === `x${tipoX}`) {
                        if (corta[1] === '1') {
                            if (corta[0] !== '+') {
                                texto += `${corta[0]} ${chaveS} `;
                            } else {
                                texto += `${chaveS} `;
                            }
                        } else {
                            if (corta[0] !== '+') {
                                texto += `${corta[0]} ${corta[1]}${chaveS} `;
                            } else {
                                texto += `${corta[1]}${chaveS} `;
                            }
                        }
                    }
                    else if (chaveS === 't') {
                        texto += `${corta[1]} `
                    }
                    else {
                        if (corta[1] === '1') {
                            if (chaveS !== 'r') {
                                texto += `${corta[0]} ${chaveS} `;
                            } else {
                                texto += `${chaveS} `;
                            }
                        }
                        else {
                            if (chaveS !== 'r') {
                                texto += `${corta[0]} ${corta[1]}${chaveS} `;
                            } else {
                                texto += `${val[chaveS]} `;
                            }
                        }
                    }

                }
            } else {
                tipoF++;
            }



        }
        textos.push(texto);
    }

    textos.forEach((texto, index) => {
        p = criarP(`expre_orig${index}`, '', texto);
        divInicial.append(p);
        textosConvertidos.push(texto);
    })

    p = criarP(`expre_origF`, '', valores.fim);
    divInicial.append(p);

})
const removeDivAux = () => {
    let conf = $('#aux-div');
    if (conf) conf.remove();
}

const metodoAuxiliares = () => {
    removeDivAux();
    let div = criarDiv('aux-div', '6', 'inline-div p-modif');
    let textos = [];
    textosConvertidos.forEach((value, index) => {
        let corta = value.split(' ');
        let txt = '';
        if (index === 0) {
            corta.forEach((stri, i) => {
                switch (stri) {
                    case 'Max':
                        stri = ''
                        break;
                    case 'Min':
                        stri = '-'
                        break
                    case '-':
                        stri = '+'
                        break;
                    case '+':
                        stri = '-'
                        break;
                    case 'Z:':
                        stri = 'z';
                        break;
                    case '':
                        stri = '=';
                        break;
                    default:
                        break;
                }
                corta[i] = stri;
            })

            corta.forEach((co, i) => {
                if (i === 2) {
                    if (co !== '+') {
                        txt += `- ${co} `
                    } else {
                        txt += `+ ${co} `
                    }
                } else {
                    txt += `${co} `
                }
            });
            txt += '0'
            textos.push(txt);
        }
        else {
            let aux = '';
            corta.forEach((co, i) => {
                if (i === (corta.length - 3)) {
                    corta[i] = '=';
                }
                if (co === '') {
                    corta[i] = `+ f${index}`;
                }
            });

            corta.forEach((co, i) => {
                if (i > (corta.length - 4) && i < (corta.length - 1)) {
                    aux += `${co} `;
                } else {
                    txt += `${co} `;
                }
            });
            txt += aux;
            textos.push(txt);
        }
    });
    textos.push(valores.fim);
    textos.forEach((tx, i) => {
        div.append(criarP(`cov${i}`, '', tx));
    });
    formInicial.append(div);
    newMapProp = maperarPropsParaTabela();
}

const maperarPropsParaTabela = () => {
    let newMap = {};
    let valZ = valores.Z;
    let valV = valores.V;
    if (valZ.z !== parseFloat(-1) && parseFloat(valZ.z) !== parseFloat(1)) {
        for (chave in valZ) {
            let valor = valZ[chave];

            if (chave === 'z') {
                if (valor.toLowerCase() == 'minimizar') {
                    valZ[chave] = -1;
                } else {
                    valZ[chave] = 1;
                }
            } else {
                let corta = valor.split(' ');
                if (corta[0] == '-') valZ[chave] = parseFloat(corta[1]);
                else if (corta[1] === '0') valZ[chave] = 0;
                else valZ[chave] = -parseFloat(corta[1]);
            }
        }

        for (chave in valV) {
            let mapV = valV[chave];
            for (chav in mapV) {
                let valor = mapV[chav];
                if (chav !== 'r') {
                    let corta = valor.split(' ');
                    if (corta[1] === '0') mapV[chav] = 0;
                    else if (chav === 't') mapV[chav] = parseFloat(corta[1]);
                    else if (corta[0] === '-') mapV[chav] = -parseFloat(corta[1]);
                    else mapV[chav] = parseFloat(corta[1]);
                } else {
                    delete mapV['r'];
                }
            }
            valV[chave] = mapV;
        }

        newMap['prim'] = valZ;
        newMap['segu'] = valV;

        for (let i = 1; i <= parseInt(localStorage.qtdFolga); i++) {
            newMap.prim[`f${i}`] = 0;
        }
        return newMap;
    }

    return JSON.parse(localStorage.newMapP0);


}