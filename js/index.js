const variaveis = $('#variaveis');
const restricao = $('#restricao');
const btnApagarUm = $('#btn-apagar-um');
const btnProximoUm = $('#btn-proximo-um');
const divACalcular = $('#div-a-calcular');
const divZ = $('#div-z');
const divBtCalc = $('#div-bt-calc');
const h6 = $('#h6-txt');
const mapValores = {};
const folga = {};

let liberaConfirma = false;

variaveis.keyup(event => {
    if(event.key === 'Enter'){
        iniciarInputs();
    }
    variaveis.val(permitidoSomenteInteiros(event.target.value));
});

restricao.keyup(event => {
    if(event.key === 'Enter'){
        iniciarInputs();
    }
    restricao.val(permitidoSomenteInteiros(event.target.value));
});

variaveis.focus(event => {
    btnProximoUm.removeAttr('disabled');
})

restricao.focus(event => {
    btnProximoUm.removeAttr('disabled');
})


btnApagarUm.click(event => {
    variaveis.val('');
    restricao.val('');
    apagarTudo();
})



btnProximoUm.click(event => {
    event.preventDefault();
    iniciarInputs();
});

const iniciarInputs = () => {
    btnProximoUm.attr('disabled', 'true');
    apagarTudo();


    let quant = variaveis.val();
    let vezes = restricao.val();
    let count = 0;


    let divM = criarDivMestre('div-m-z');


    while (quant >= count) {

        let div = criarDiv(`z-div-x${count}`, 2, '');
        let nomeIcone = 'add';

        if (count === 0) {
            let select = criarSelect(`select_objetivo`, 2, 'Objetivo', ['Maximizar', 'Minimizar'], 'select-text');
            div.append(select);

        } else {
            if (count === 1) nomeIcone = 'navigate_next'
            let i = criarIcone(nomeIcone, 'icon-config');
            let input = criarInput('text', `z-x${count}`, 'input-edit');
            input.keyup(event => {
                input.val(permitido(event.target.value));
            });
            let label = criarLabel(`z-x${count}`, `x${count}`);

            div.append(i)
                .append(input)
                .append(label);
        }

        divM.append(div);
        count++;
    }

    divZ.append(divM);


    let countV = 1;

    while (vezes > 0) {
        count = 1;
        let divM = criarDivMestre(countV);

        let idDiv = 'escrever';
        let classDivPerso = '';
        let tamanho = 2;

        while (count <= quant) {
            let nomeIcone = 'add';
            let nomeLabel = `x${count}`;
            let tipoInput = 'text';
            let idInput = `x${countV}${count}`;
            let classInputPerso = 'input-edit';
            let classIPerso = 'icon-config';



            if (count === 1) nomeIcone = 'star_half';

            let div = criarDiv(idDiv, tamanho, classDivPerso);
            let i = criarIcone(nomeIcone, classIPerso);
            let input = criarInput(tipoInput, idInput, classInputPerso);

            input.keyup(event => {
                input.val(permitido(event.target.value));
            });

            let label = criarLabel(idInput, nomeLabel);

            div.append(i)
                .append(input)
                .append(label);


            divM.append(div);

            count++;
        }

        let divUm = criarDiv(idDiv, tamanho, classDivPerso);
        let divDois = criarDiv(idDiv, tamanho, classDivPerso);


        let select = criarSelect(`select_restricao_${countV}`, 3, 'Restrição', ['=', '>=', '<='], 'select-text');

        let input = criarInput('text', `t${countV}`, 'input-edit');
        input.keyup(event => {
            input.val(permitido(event.target.value));
        });
        let label = criarLabel(`t${countV}`, 'total');


        divUm.append(select);
        divDois.append(input)
            .append(label);
        divM.append(divUm)
            .append(divDois);
        divACalcular.append(divM);
        countV++;
        vezes--;
    }

    count = 1;
    let stringX = '';
    while (count <= quant) {
        stringX += `X${count}, `
        count++;
    }
    stringX = stringX.slice(0, stringX.length - 2);
    stringX += ' >= 0';

    mapValores['fim'] = stringX;

    let h6 = $('<h6>', { id: 'h6-txt', class: 'h6-edit' }).html(stringX);
    $('select').formSelect();

    let calc = criarBotao('calcular', 'simplex.html', 'right', 'done', 'Calcular', 'btn-edit')

    calc.click(event => {
        mapearZ();
        mapearVari();
        if (localStorage.mapValores) {
            localStorage.removeItem('mapValores');
            localStorage.removeItem('valF');
            localStorage.removeItem('qtdFolga');
            localStorage.removeItem('qtdVariaveis');
        }
        localStorage.setItem('mapValores', JSON.stringify(mapValores));
        localStorage.setItem('valF', JSON.stringify(folga));
        localStorage.setItem('qtdFolga', restricao.val());
        localStorage.setItem('qtdVariaveis', variaveis.val());
    });

    divBtCalc.append(h6)
        .append(calc);
}



const mapearZ = () => {
    let mapZ = {};
    let formZ = $('#restricao_div-m-z').children();
    formZ.each(i => {
        if (i > 0) {
            let div = $($(formZ[i])[0]);
            let filhos = div.children();
            let valInput = $(filhos[1]).val();
            if (parseFloat(valInput) < 0) {
                mapZ[`x${i}`] = `- ${valInput.replace('-', '')}`;
            } else {
                mapZ[`x${i}`] = `+ ${valInput}`;
            }
        } else {
            let div = $(formZ[i])[0];
            let filhos = $($(div).children()[0]).children()[0];
            let valInput = $(filhos).val();
            mapZ[`z`] = valInput;
        }
    })
    for (let k = 1; k <= parseInt(restricao.val()); k++) {
        mapZ[`f${k}`] = '+ 0';
    }
    mapZ['t'] = '+ 0';
    mapValores['Z'] = mapZ;
}

const mapearVari = () => {
    let mapV = {};
    let form = $('#div-a-calcular').children();
    let pos = 1;
    form.each(i => {
        let div = $(form[i]).children();
        let mapVF = {};
        mapVF['z'] = '+ 0';
        div.each(j => {
            if (j === (div.length - 2)) {
                let inputVal = $($($($(div[j])[0]).children()[0]).children()[0]).val();
                for (let k = 1; k <= parseInt(restricao.val()); k++) {
                    if (k === pos) {
                        mapVF[`f${k}`] = '+ 1';
                    } else {
                        mapVF[`f${k}`] = '+ 0';
                    }
                }
                pos++;
                mapVF[`r`] = inputVal;
            }
            else if (j === (div.length - 1)) {
                let inputVal = $($(div[j]).children()[0]).val();
                if (parseFloat(inputVal) < 0) {
                    mapVF[`t`] = `- ${inputVal.replace('-', '')}`;
                } else {
                    mapVF[`t`] = `+ ${inputVal}`;
                }
            }
            else {
                let inputVal = $($(div[j]).children()[1]).val();
                if (parseFloat(inputVal) < 0) {
                    mapVF[`x${j + 1}`] = `- ${inputVal.replace('-', '')}`;
                } else {
                    mapVF[`x${j + 1}`] = `+ ${inputVal}`;
                }

            }
        });
        mapV[i] = mapVF;
    })
    mapValores['V'] = mapV;
}

const apagarTudo = () => {
    $('#div-z').children().remove();
    $('#div-a-calcular').children().remove();
    $('#div-bt-calc').children().remove();
}