const criarDivMestre = (idRestri) => {
    return $('<div>', {
        id: `restricao_${idRestri}`,
        class: 'row'
    });
}

const criarDiv = (idDiv, tamanho, classDivPerso) => {
    return $('<div>', {
        id: idDiv,
        class: `input-field col s${tamanho} ${classDivPerso}`
    });
}

const criarP = (idParagrafo, classPerso, texto) => {
    return $('<p>', {
        id: idParagrafo,
        class: classPerso
    }).html(texto);
}

const criarInput = (tipoInput, idInput, classInputPerso) => {
    return $('<input>', {
        id: idInput,
        type: tipoInput,
        class: `validate ${classInputPerso}`
    });
}

const criarLabel = (idInput, nomeLabel) => {
    return $('<label>', {
        for: idInput
    }).html(nomeLabel);
}

const criarIcone = (nomeIcone, classIPerso) => {
    return $('<i>', {
        class: `material-icons prefix ${classIPerso}`
    }).html(nomeIcone);
}

const criarSelect = (idSelect, quant, nomeDefault, arrayValores, classPerso) => {
    let count = 0;

    const select = $('<select>', {
        id: idSelect,
        class: classPerso
    });

    const optionDefault = $('<option>', {
        id: 'opt_default',
        value: '',
        selected: true,
        disabled: true
    }).html(nomeDefault);
    select.append(optionDefault);

    while (count < quant) {
        const option = $('<option>', {
            id: `opt_${count}`,
            value: arrayValores[count]
        }).html(arrayValores[count]);
        select.append(option);
        count++;
    }
    return select;

}

const criarBotao = (idBotao, refBotao, pos, nomeIcone, nomeBotao, classPerso) => {
    return $('<a>', {
        id: idBotao,
        class: `waves-effect waves-light btn ${classPerso}`,
        href: refBotao
    }).html(nomeBotao).append($('<i>', {
        class: `material-icons ${pos}`
    }).html(nomeIcone));
}

const criarTabela = (id, classPerso) => {
    return $('<table>', {
        id: id,
        class: classPerso
    });
}

const criarCabecaTabela = (id, classPerso) => {
    return $('<thead>', {
        id: id,
        class: classPerso
    });
}

const criarCorpoTabela = (id, classPerso) => {
    return $('<tbody>', {
        id: id,
        class: classPerso
    });
}

const criarLinhaTabela = (id, classPerso) => {
    return $('<tr>', {
        id: id,
        class: classPerso
    });
}

const criarColunaTabela = (id, classPerso) => {
    return $('<th>', {
        id: id,
        class: classPerso
    });
}

const criarColunaTab = (id, classPerso, texto) => {
    return $('<th>', {
        id: id,
        class: classPerso
    }).html(texto);
}

const criarColunaMeioTabela = (id, classPerso, texto) => {
    return $('<td>', {
        id: id,
        class: classPerso
    }).html(texto);
}
