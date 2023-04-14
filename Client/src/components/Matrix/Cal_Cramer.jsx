

export const calCramer = (A) => {

    const detOfMatrix = (matrix) => {
        var ans = matrix[0][0]*(matrix[1][1]*matrix[2][2] - matrix[2][1]*matrix[1][2])
            - matrix[0][1]*(matrix[1][0]*matrix[2][2] - matrix[1][2]*matrix[2][0])
            + matrix[0][2]*(matrix[1][0]*matrix[2][1] - matrix[1][1]*matrix[2][0]);
        return ans;
    }

    var x = new Array(3);
    // for det(A)
    var d = [[A[0][0], A[0][1], A[0][2]], 
        [A[1][0], A[1][1], A[1][2]], 
        [A[2][0], A[2][1], A[2][2]]];
    // for det(A1)
    var d1 = [[A[0][3], A[0][1], A[0][2]], 
        [A[1][3], A[1][1], A[1][2]], 
        [A[2][3], A[2][1], A[2][2]]];
    // for det(A2)
    var d2 = [[A[0][0], A[0][3], A[0][2]], 
        [A[1][0], A[1][3], A[1][2]], 
        [A[2][0], A[2][3], A[2][2]]];
    // for det(A3)		
    var d3 = [[A[0][0], A[0][1], A[0][3]], 
        [A[1][0], A[1][1], A[1][3]], 
        [A[2][0], A[2][1], A[2][3]]];

    var D = detOfMatrix(d);
    var D1 = detOfMatrix(d1);
    var D2 = detOfMatrix(d2);
    var D3 = detOfMatrix(d3);
    
    if (D !== 0)
    {
        x[0] = D1/D;
        x[1] = D2/D;
        x[2] = D3/D;
    }

    else
    {
        if (D1 === 0 && D2 === 0 && D3 === 0)
            alert("Infinite");
        else if(D1 !== 0 || D2 !== 0 || D3 !== 0)
            alert("No solution");
    }
    console.log(x)
    return {xnew:x}
}