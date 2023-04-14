import { derivative, evaluate } from "mathjs";
import { useState, useEffect } from "react";
import { Button, Container, Table, Form } from "react-bootstrap";
import axios from 'axios'
import './Comp.css'

const NewtonRaphson = () => {

    const url = 'http://localhost:8081/question'
    useEffect(() => {
        axios.get(url)
        .then(res => {
            let Data = res.data
            setEquation(res.data[0].question)
            console.log(Data)
        })
        .catch(error => {
            console.log(error)
        })
        }, []) 

    const [Equation, setEquation] = useState(" ")
    const [Equationdiff, setEquationdiff] = useState(" " + derivative(Equation, 'x'));
    
    const [X, setX] = useState(0);
    const [X0, setX0] = useState(0);
    const data = [];
    const [state, setstate] = useState([]);
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100

    const Calnewton= (x0) => {
        var x1, f0, f0diff,  ea,scope;
        var iter = 0;
        const e = 0.000001;
        var obj={};
        do
        {
            iter ++;
            scope = {x:x0}
            f0 = evaluate(Equation, scope)
            f0diff = evaluate(Equationdiff, scope)
            x1 = x0 - (f0/f0diff)
            obj = {
                Iteration:iter,
                X0:x0,
                X1:x1,
                F0:f0,
                F0diff:f0diff
            }
            
            data.push(obj)
            ea = error(x0, x1)
            x0 = x1            
        }while(ea > e)
        setX(x1)
    }

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        Calnewton(x0num)
        setstate(data)
        console.log("test " + Equationdiff)
    }

    return(
        <Container>
            <h3>Newton Raphson</h3>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Input g(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={e => {setEquation(e.target.value)}} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    <Form.Label>Input X0</Form.Label>
                        <input type="number" id="X0" value={X0} onChange={e => setX0(e.target.value)} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    </Form.Group>
                    <Button variant="outline-info" onClick={calculateRoot}>
                        Calculate
                    </Button>
            </Form>
                <br></br>
                <h5>Answer = {X.toPrecision(7)}</h5>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="20%">X0</th>
                            <th width="20%">f(x) = {Equation}</th>
                            <th width="20%">f'(x) = {Equationdiff}</th>
                            <th width="20%">X1</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.Iteration}</td>
                                <td>{element.X0}</td>
                                <td>{element.F0}</td>
                                <td>{element.F0diff}</td>
                                <td>{element.X1}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
        </Container>
    )
}

export default NewtonRaphson