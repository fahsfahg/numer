import React from 'react';
import axios from 'axios'
import { evaluate } from "mathjs";
import { useState, useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { CategoryScale,Chart,registerables } from "chart.js";
import './Comp.css'
import { Calonepoint } from "./CalOnepoint"

Chart.register(CategoryScale);
Chart.register(...registerables);

const Onepoint = () => {
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

    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("")
    const [X, setX] = useState(0);
    // let X = 0
    const [X0, setX0] = useState(0);
    let data =[];
    const [state, setState] = useState([]);
    // const [valueIter, setValueIter] = useState([]);
    // const [valueX0, setValueX0] = useState([]);
    // const [valueX1, setValueX1] = useState([]);
    // const [valuegX0, setValuegX0] = useState([]);
    // const [valuegX1, setValuegX1] = useState([]);

    let valueIter = []
    let valueX0 = []
    let valueX1 = []
    let valuegX0 = []
    let valuegX1 = []

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }


    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    // const Calonepoint = (x0) => {
    //     var gx0,gx1,ea,scope;
    //     var x1 = 0;
    //     var iter = 0;
    //     var MAX = 50;
    //     const e = 0.00001;
    //     var obj={};
    //     do
    //     {
    //         iter ++;
    //         scope = {
    //             x:x0,
    //         }
    //         gx0 = evaluate(Equation, scope)
    //         x1 = evaluate(Equation, scope)
    //         scope = {
    //             x:x1,
    //         }
    //         gx1 = evaluate(Equation, scope)
    //         obj = {
    //             Iteration:iter,
    //             X0:x0,
    //             X1:x1,
    //             gX0:gx0,
    //             gX1:gx1
    //         }
    //         data.push(obj)
    //         ea = error(x0, x1);
    //         x0 = x1;
    //     }while(ea>e && iter<MAX)
    //     setX(x1)
    // }

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        const { xnew, datanew} = Calonepoint(x0num, Equation)
        setX(xnew)
        console.log(X)
        data = datanew

        valueIter.push(data.map((x)=>x.Iteration));
        valueX0.push(data.map((x)=>x.X0));
        valuegX0.push(data.map((x)=>x.gX0));
        valueX1.push(data.map((x)=>x.X1));
        valuegX1.push(data.map((x)=>x.gX1));

        setHtml(print());

        // setEquation(print());
        console.log(valueIter)
        console.log(valueX1)

        setState(data)

    }
    console.log(X)

    const dataX=[];
    const dataY=[];
    const g = () => {
    {
        data.map((element,index) =>{
        dataX[index]= element.X0;
        dataY[index]= element.gX0;
        })   }
        console.log("dataX"+dataX); 
        console.log("dataY"+dataY); 

    }
    const datagrapgh={
        labels : dataX,
        datasets:[
            {
                axis:'y',
                label: 'Answer',
                data: dataY,
                borderColor: 'rgb(120, 228, 255)',
                fill: false,
                tension: 0.1
            }
        ]
    };
    const print = () =>{
        console.log(data)
        g()
        // setValueIter(data.map((x)=>x.iteration));
        // setValueX0(data.map((x)=>x.X0));
        // setValuegX0(data.map((x)=>x.gX0));
        // setValueX1(data.map((x)=>x.X1));
        // setValuegX1(data.map((x)=>x.gX1));

        return(
            <Container>
                 <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th width="20%">Iteration</th>
                            <th width="20%">X0</th>
                            <th width="20%">g(X0)</th>
                            <th width="20%">X1</th>
                            <th width="20%">g(X1)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.Iteration}</td>
                                <td>{element.X0}</td>
                                <td>{element.gX0}</td>
                                <td>{element.X1}</td>
                                <td>{element.gX1}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Line data={datagrapgh}/>
            </Container>
        );
    }

    return(
        <Container className="mb-4">
            <div className = "form-box">
            <form> 
            <Row className="mb-4">
                <h3>Onepoint</h3>
                    <Col>
                    <h6>g(x)</h6>
                    <input type="text" id="equation" value={Equation} onChange={e => setEquation(e.target.value)} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    </Col>
                    <Col>
                    <h6>X0</h6>
                    <input type="number" id="X0" value={X0} onChange={inputX0} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    </Col>
                    <br></br>
                </Row>
                <Button onClick={calculateRoot} variant="outline-info">Calculate</Button>
                </form> 
                <br></br>
                <h5>Answer = {X.toPrecision(7)}</h5>
                <Container>
                {html}
                </Container>
            </div>
        </Container>
        );
    }

export default Onepoint
