'use strict';

Arroz.prototype.splice= function splice(start,span,insert){
    var beginingArroz= new Arroz();
    var endingArroz= new Arroz();
    var addingArroz= new Arroz();

    if(insert instanceof Arroz){
        for(var l=0;l<insert.length;l++){
            
            addingArroz[addingArroz.length]=insert[l];
            addingArroz.length++;
        }
    }else{
        addingArroz[addingArroz.length]=insert;
        addingArroz.length++;
    }
    if(start<0) {
        start=this.length+start;
        span=0;
    }
    if((this.length+start)<0) start=0;
    for(var i=0;i<start;i++){
        beginingArroz[i]=this[i];
        beginingArroz.length++;
    }
    for(var j=start+span;j<this.length;j++){
        endingArroz[endingArroz.length]=this[j];
        endingArroz.length++;
    }
    for(var k=this.length-1;k>=0;k--){
        delete this[k];
        this.length--;
    }
    for(var i=0;i<beginingArroz.length;i++){
        this[this.length]=beginingArroz[i];
        this.length++;
    }
    for(var l=0; l<addingArroz.length;l++){
        this[this.length]=addingArroz[l];
        this.length++;
    }
    
    for(var j=0;j<endingArroz.length;j++){
        this[this.length]=endingArroz[j];
        this.length++;
    }
}
