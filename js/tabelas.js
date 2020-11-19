const containerDiv = $('#conteiner');
const qtdFolga = parseInt(localStorage.qtdFolga);
const qtdVariaveis = parseInt(localStorage.qtdVariaveis);

const tabelaInicial = (pagina, map) => {
    let zVal = map.prim;
    let vVal = map.segu;
    let thead = montarParteSuperior(pagina);
    let tbody = montarParteInferior(pagina, zVal, vVal);
    formarTabela(thead, tbody, pagina);
}

const montarParteSuperior = (pagina) => {
    let arrayTh = [];
    let thead = criarCabecaTabela(`thead-pag-${pagina}`, '');
    let trH = criarLinhaTabela(`trh-pag-${pagina}`, '');

    let th = criarColunaTab(`z-pag-${pagina}`, 'th-edit', 'z');
    arrayTh.push(th);

    for (let i = 1; i <= qtdVariaveis; i++) {
        th = criarColunaTab(`x${i}-pag-${pagina}`, 'th-edit', `x${i}`);
        arrayTh.push(th);
    }

    for (let i = 1; i <= qtdFolga; i++) {
        th = criarColunaTab(`f${i}-pag-${pagina}`, 'th-edit', `f${i}`);
        arrayTh.push(th);
    }

    th = criarColunaTab(`b-pag-${pagina}`, 'th-edit', `b`);
    arrayTh.push(th);

    arrayTh.forEach(th => {
        trH.append(th);
    })

    thead.append(trH);
    return thead;
}

const montarParteInferior = (pagina, zVal, vVal) => {

    let arrayTd = [];
    let arrayTr = [];

    let tbody = criarCorpoTabela(`tbody-pag-${pagina}`, '');
    let trB = criarLinhaTabela(`trb-pag-${pagina}`, '');

    for (chave in zVal) {
        let td = criarColunaTab(`${chave}-pag-${pagina}-value`, '', zVal[chave]);
        arrayTd.push(td);
    }

    arrayTd.forEach(td => {
        trB.append(td);
    })
    arrayTr.push(trB);


    for (chave in vVal) {
        trB = criarLinhaTabela(`trb${chave}-pag-${pagina}`, '');
        let interno = vVal[chave];
        for (chv in interno) {
            let td = criarColunaTab(`${chv}-pag-${pagina}-value`, '', interno[chv]);
            trB.append(td);
        }
        arrayTr.push(trB);
    }

    arrayTr.forEach(tr => {
        tbody.append(tr);
    })

    return tbody;
}

const formarTabela = (thead, tbody, pagina) => {
    let table = criarTabela(`tabela-pag-${pagina}`, 'table-edit');
    table.append(thead)
        .append(tbody);
    containerDiv.append(table);
}