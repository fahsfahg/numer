import { evaluate } from "mathjs"

export const Calonepoint = (x0, Equation) => {
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100

    let X = 0
    var gx0, gx1, ea, scope
    var x1 = 0
    var iter = 0
    var MAX = 50
    const e = 0.00001
    let data = []
    var obj={}
    do
    {
        iter ++;
        scope = {
            x:x0,
        }
        gx0 = evaluate(Equation, scope)
        x1 = evaluate(Equation, scope)
        scope = {
            x:x1,
        }
        gx1 = evaluate(Equation, scope)
        obj = {
            Iteration:iter,
            X0:x0,
            X1:x1,
            gX0:gx0,
            gX1:gx1
        }
        data.push(obj)
        ea = error(x0, x1);
        x0 = x1;
    }while(ea>e && iter<MAX)
    console.log(data)
    X = x1
    console.log(X)
    return { xnew:X, datanew:data }
}