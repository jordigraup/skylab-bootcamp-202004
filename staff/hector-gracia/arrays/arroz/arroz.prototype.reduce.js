'use strict';

Arroz.prototype.reduce= function reduce(expresion,initial){
    if(typeof initial!= "number") initial=0;
    var acumulator=0;
    acumulator+=initial;
    for(var i=0; i<this.length;i++){
        acumulator=expresion(acumulator,this[i],i,this);
    }
    return acumulator;
}