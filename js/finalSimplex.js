const container = $('#conteiner');

const calcVbVnbValz = (map) => {
    let mapaParaTabela = {};
    mapaParaTabela['vb'] = vb(map);
    mapaParaTabela['vnb'] = vnb(map, mapaParaTabela);
    mapaParaTabela['valZ'] = valorDeZ(map);
    
    return mapaParaTabela;
}

const valorDeZ = (map) => {
   return  map.prim.t
}

const vnb = (map, newMap) => {

    let vb = newMap.vb;
    let arrayVar = [];
    let mp = {};

    for(chav in vb) {
      arrayVar.push(chav);
    }

    for(chave in map.prim){
        if(chave !== 'z' && chave !== 't'){
            mp[chave] = 0;
        }
    }
    
    arrayVar.forEach( va => {
        delete mp[va];
    });
    
    return mp;
}

const vb = (map) => {
    let valZ = map.prim;
    let valV = map.segu;
    let pesqUm = 100
    let pesqZero = 0


    arrayZeroUm = [];
    arFim = [];

    let mpVb = {}
 
    let qtdFolga = parseInt(localStorage.qtdFolga);
    
    for(chave in valZ){
        if(chave !== 'z' && chave !== 't'){
            valor = valZ[chave]*100;
            if(valor === pesqZero || valor === pesqUm){
                arrayZeroUm.push(chave);
            }   
        }
    }


    for(chave in valV){
        let val = valV[chave];
        for(chv in val){
            if(chv !== 'z' && chv !== 't'){
                let valor = val[chv]*100;
                if(valor === pesqZero || valor === pesqUm){
                    arrayZeroUm.push(chv);
                }
            }
        }
    }
    arrayZeroUm = arrayZeroUm.sort();

    let pos = arrayZeroUm[0];
    let count = 0;
    arrayZeroUm.forEach(value => {
        if(value !== pos){
            pos = value;
            count = 1;
        }else{
            count ++;
        }
        if(count > qtdFolga){
            arFim.push(value);
        }
    })
   
    arFim.forEach(vl => {
        let val = valZ[vl] * 100;
        if(val === pesqUm){
            mpVb[vl] = valZ['t'];
        }
    });

    arFim.forEach(vl => {   
        for(let i = 0 ; i< qtdFolga; i++){
            let val = valV[i][vl] * 100;
            if(val === pesqUm){
                mpVb[vl] = valV[i]['t'];
            }
        }
        
    });
 
    return mpVb;
}

const valoresFinal = (map,pagina,newMap) =>{
    let ok = false;
    let textFinal = '';
    for(chave in newMap.prim){
        if(chave !== 'z' && chave !== 't'){
            if(parseFloat(newMap.prim[chave]) < parseFloat(0)){
                ok = true;
            }
        }
    }
    if(ok){
        textFinal = '<b>Solução Não Ótima</b>'
    }else{
        textFinal = '<b>Solução Ótima</b>' 
    }

    let div = criarDiv(`div-fim-pag-${pagina}`, 6, 'div-fim-edit');
    let pf = criarP(`pf-fim-pag-${pagina}`,'',textFinal);
    div.append(pf);
    let texto = '<b>Vb:</b> ';
    for( chave in map.vb){
        if(texto === '<b>Vb:</b> ') {
            texto += `${chave}=${map.vb[chave]}`;
        }else{
            texto += `, ${chave}=${map.vb[chave]}`;
        }
        
    }
    let p = criarP('', '', texto);
    div.append(p);

    texto = '<b>Vnb:</b> ';
    for( chave in map.vnb){
        if(texto === '<b>Vnb:</b> ') {
            texto += `${chave}=${map.vnb[chave]}`;
        }else{
            texto += `, ${chave}=${map.vnb[chave]}`;
        }
        
    }
    p = criarP('', '', texto);
    div.append(p);

    texto = `<b>Valor de Z:</b> ${map.valZ}` ;
    p = criarP('', '', texto);
    div.append(p);

    container.append(div);
}