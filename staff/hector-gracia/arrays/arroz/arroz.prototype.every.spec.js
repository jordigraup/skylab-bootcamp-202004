'use strict';

describe('Arroz.prototype.every', function () {
    it('should check if all elements of the arroz are numbers', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result=false;

        result=arroz.every(function(element,index){
            return typeof element==="number";
            });
        
        expect(result).toBe(true);
    });
    it('should check if the value of all elements of the arroz is equal to its index', function () {
        var arroz = new Arroz(0,1,2,3,4,5,6,7,8,9);
        var result=false;

        result=arroz.every(function(element,index){
            return element===index;
            });
        
        expect(result).toBe(true);
    });
});