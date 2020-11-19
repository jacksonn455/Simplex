const calcSimplex = (map) => {
    let ok = false;
    for(chave in map.prim){
        if(chave !== 'z' && chave !== 't'){
            if(parseFloat(map.prim[chave]) < parseFloat(0)){
                ok = true;
            }
        }
    }
    if(!ok){
        continua = false;
    }

    let coluna = acharColunaPivo(map);
    let pivo = acharPivo(map, coluna[0], coluna[1]);
    let linha = acharLinhaPivo(map, pivo[0], coluna[0],pivo[2]);
    let newMap = criarNovoMapa(map, linha, pivo[0], pivo[1]);

    return newMap;
}

const acharColunaPivo = (map) => {

    let valorP = map.prim;
    let countX = 1;
    let arrayZ = [];
    for (chave in valorP) {
        if (chave === `x${countX}`) {
            if (valorP[chave] < 0) {
                arrayZ.push(valorP[chave]);
            }
            countX++;
        }
    }

    let menorX = 0
    arrayZ.forEach(x => {
        if (menorX > x) {
            menorX = x;
        }
    });
    countX = 1;
    let numeroP = '';
    let colunaDe = '';
    for (chave in valorP) {
        if (chave === `x${countX}`) {
            if (valorP[chave] === menorX) {
                colunaDe = chave;
                numeroP = valorP[chave];
            }
            countX++;
        }
    }
    return [colunaDe, numeroP];
}

const acharPivo = (map, coluna, nlinha) => {

    let valorV = map.segu;
    let arrayXV = [];
    let arrayTV = [];
    let arrayResult = [];
    
    arrayLinha = [];
    arrayLinha.push(nlinha);

    for (chave in valorV) {
        let valorVI = valorV[chave];
        for (chv in valorVI) {
            if (chv === 't') {
                arrayTV.push(parseFloat(valorVI[chv]));
            }
            if (chv === coluna) {
                arrayXV.push(parseFloat(valorVI[chv]));
            }
            

        }
    }

    arrayXV.forEach((x, i) => {
        let calc = parseFloat(x) / parseFloat(arrayTV[i]);
        if(parseFloat(arrayTV[i]) === parseFloat(0)){
            calc = 0;
        }
        calc = parseFloat(calc.toFixed(2));
        if (calc >= parseFloat(0)) {
            arrayResult.push(calc);
        }
    });



    let menorN = 0
    arrayResult.forEach(n => {
        if(n !== 0) menorN = n;
    })

    arrayResult.forEach(n => {
        if (parseFloat(menorN) < parseFloat(n) && n !== 0) {
            menorN = n;
        }
    })
    let index = 0;
    let pos = 0;
    arrayResult.forEach((n, i) => {
        if (parseFloat(menorN) === parseFloat(n) && pos === 0) {
            index = i;
            pos++;
            
        }
    })

    arrayXV.forEach((x,i) => {
        if(i !== index) arrayLinha.push(x);
    })
    return [parseFloat(arrayXV[index]), arrayLinha, index];

}

const acharLinhaPivo = (map, pivo, coluna, index) => {
    let valorV = map.segu;
    let linha = {};
    for (chave in valorV) {
        let valorVI = valorV[chave];
        for (chv in valorVI) {
            if (chv === coluna) {
                if (parseFloat(valorVI[chv]) === parseFloat(pivo)) {
                    if(parseInt(chave) === parseInt(index)){
                        linha[chave] = valorV[chave]
                    } 
                }
            }
        }
    }
    return linha;
}

const criarNovoMapa = (map, linha, pivo, nLinhaU) => {
    let primeiraLinha = map.prim;
    let restoLinhas = map.segu;
    let nLinha = 0;
    let lPivo = [];
    let npPLinha = [];
    let pLinha = [];
    let nPpLinha = [];

    for (chave in linha) {
        nLinha = chave;
        for (chv in linha[chave]) {
            lPivo.push(parseFloat(linha[chave][chv]));
        }
    }

    for (chave in primeiraLinha) {
        pLinha.push(primeiraLinha[chave]);
    }
    lPivo.forEach((n) => {

        if(parseFloat(n) === parseFloat(0)){
            npPLinha.push(0);
        }else{
            let calc = parseFloat(n) / parseFloat(pivo);
            calc = parseFloat(calc.toFixed(2));
            npPLinha.push(calc);
        }
    })
    

    let nl = 0;
    let npLinha = retornarNLinha(npPLinha, pLinha, nLinhaU, nl);


    let countL = 0;
    for (chave in primeiraLinha) {
        map.prim[chave] = npLinha[countL];
        countL++;
    }

    
   
    arraynpLinha = [];
    nl = 1;
    for (chave in restoLinhas) {    
        if (parseInt(chave) !== parseInt(nLinha)) {
            let res = restoLinhas[chave];
            let  pLinha = [];
            for (chv in res){
                pLinha.push(res[chv]);
            }
            
            npLinha = retornarNLinha(npPLinha, pLinha, nLinhaU, nl);
            
            arraynpLinha[chave] = npLinha;
            nl++;
        }
    }
    
    for (chave in restoLinhas) {
        countL = 0;
        let res = restoLinhas[chave];     
        if (parseInt(chave) !== parseInt(nLinha)) {
            let np = arraynpLinha[chave];
            for (chv in res) {
                map.segu[chave][chv] = np[countL];
                countL++;
            }
        }   
    }

    countL = 0;
    for (chave in map.segu[nLinha]) {
        map.segu[nLinha][chave] = npPLinha[countL];
        countL++;
    }

    return map;
}

const retornarNLinha = (npPLinha, pLinha, nLinhaU, nl) => {
    let npLinha = [];
    let nPeLinha = [];
    npPLinha.forEach((n, i) => {
        let calc = parseFloat(n) * (parseFloat(nLinhaU[nl]) * -1);
        calc = parseFloat(calc.toFixed(2));
        nPeLinha.push(calc);
        console.log()
    

    });

    nPeLinha.forEach((n, i) => {
        let calc = parseFloat(n) + parseFloat(pLinha[i]);
        calc = parseFloat(calc.toFixed(2));
        npLinha.push(calc);
    });

    return npLinha;
}