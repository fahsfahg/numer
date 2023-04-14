import { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { calCramer } from "./Cal_Cramer"

const Cramer = () => {
    const [N, setN] = useState(3);
    const [Ans, setAns] = useState([]);

    // const detOfMatrix = (matrix) => {
    //     var ans = matrix[0][0]*(matrix[1][1]*matrix[2][2] - matrix[2][1]*matrix[1][2])
    //         - matrix[0][1]*(matrix[1][0]*matrix[2][2] - matrix[1][2]*matrix[2][0])
    //         + matrix[0][2]*(matrix[1][0]*matrix[2][1] - matrix[1][1]*matrix[2][0]);
    //     return ans;
    // }
    
    // const calCramer = (A) => {
    //     var x = new Array(3);
    //     // for det(A)
    //     var d = [[A[0][0], A[0][1], A[0][2]], 
    //         [A[1][0], A[1][1], A[1][2]], 
    //         [A[2][0], A[2][1], A[2][2]]];
    //     // for det(A1)
    //     var d1 = [[A[0][3], A[0][1], A[0][2]], 
    //         [A[1][3], A[1][1], A[1][2]], 
    //         [A[2][3], A[2][1], A[2][2]]];
    //     // for det(A2)
    //     var d2 = [[A[0][0], A[0][3], A[0][2]], 
    //         [A[1][0], A[1][3], A[1][2]], 
    //         [A[2][0], A[2][3], A[2][2]]];
    //     // for det(A3)		
    //     var d3 = [[A[0][0], A[0][1], A[0][3]], 
    //         [A[1][0], A[1][1], A[1][3]], 
    //         [A[2][0], A[2][1], A[2][3]]];
    
    //     var D = detOfMatrix(d);
    //     var D1 = detOfMatrix(d1);
    //     var D2 = detOfMatrix(d2);
    //     var D3 = detOfMatrix(d3);
        
    //     if (D !== 0)
    //     {
    //         x[0] = D1/D;
    //         x[1] = D2/D;
    //         x[2] = D3/D;
    //     }
    
    //     else
    //     {
    //         if (D1 === 0 && D2 === 0 && D3 === 0)
    //             alert("Infinite");
    //         else if(D1 !== 0 || D2 !== 0 || D3 !== 0)
    //             alert("No solution");
    //     }
    //     return x
    // }
    
    const fill2DimensionsArray = (arr, rows, columns) => {
        for (var i = 0; i < rows; i++) {
            arr.push([0])
            for (var j = 0; j < columns; j++) {
                arr[i][j] = 0;
            }
        }
    }

    const [Matrix, setMatrix] = useState([[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]]);

    const calculateRoot = () =>{
        var a = [];
        fill2DimensionsArray(a, N, N);
        for(var i = 0; i<N; i++){
            for(var j = 0; j<N+1; j++){
                a[i][j] = parseFloat(document.getElementById(""+i+j).value);
            }
        }
        console.log(a)
        const {xnew} = calCramer(a)
        console.log(xnew)
        setAns(xnew);
    }

    return(
        <Container className="mb-4">
            <h3>Cramer's Rule</h3>
                <Container className="test">
                    {Matrix.map((element,index)=>{
                        var i = index;
                        return(
                        <Table>
                            <tr key={i}>
                            {Matrix[index].map((e,index)=>{return(<td key={""+i+index}><h5>{i}{index}</h5><input style={{width:"50%", margin:"0 auto"}} className="form-control" id={""+i+index}/></td>)})}
                            </tr>
                        </Table>
                        )
                    })}
                </Container>
                <Button className="mb-4" variant="outline-info" onClick={calculateRoot}>
                    Calculate
                </Button>
                <br></br>
                <h5>Answer = </h5>
                <Table striped bordered hover variant="light">
                    <tbody>
                    <tr>
                    {Ans.map((element,index)=>{
                        return(
                            <td key={index}>X{index+1} = {element}</td>
                        )
                    })}
                    </tr>
                    </tbody>
                </Table>
        </Container>
    )
}

export default Cramer