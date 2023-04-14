import { evaluate } from "mathjs";
import { useState, useEffect } from "react";
import axios from 'axios'
import { Button, Container, Table, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { CategoryScale,Chart,registerables } from "chart.js";
import './Comp.css'

Chart.register(CategoryScale);
Chart.register(...registerables);

const Secant = () => {
    const url = 'http://localhost:8081/question'
    useEffect(() => {
        axios.get(url)
        .then(res => {
            let Data = res.data
            setEquation(res.data[2].question)
            console.log(Data)
        })
        .catch(error => {
            console.log(error)
        })
        }, []) 

    const print = () => {
        console.log(data)
        a()
        setValueIter(data.map((x)=>x.iteration));
        setValueXl(data.map((x)=>x.Xl));
        setValueXm(data.map((x)=>x.Xm));
        setValueXr(data.map((x)=>x.Xr));

        return(
            <Container>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th width="20%">Iteration</th>
                            <th width="20%">X0</th>
                            <th width="20%">f(X0)</th>
                            <th width="20%">X1</th>
                            <th width="20%">f(X1)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.Iteration}</td>
                                <td>{element.X0}</td>
                                <td>{element.F0}</td>
                                <td>{element.X1}</td>
                                <td>{element.F1}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Line data={datagrapgh}/>
            </Container>
        )
    }

    const [html, setHtml] = useState(null);

    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]);

    const [Equation, setEquation] = useState("");

    const [X, setX] = useState(0);
    const [X0, setX0] = useState(0);
    const [X1, setX1] = useState(0);

    const data = [];
    const [state, setstate] = useState([]);
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    const Calsecant= (x0, x1) => {
        var f0,f1,ea,DF,DX,scope;
        var iter = 0;
        const e = 0.000001;
        var obj={};

        do
        {
            iter ++;
            scope = {
                x:x0,
            }
            f0 = evaluate(Equation, scope)
            scope = {
                x:x1,
            }
            f1 = evaluate(Equation, scope)

            DF = (f0-f1)/(x0-x1);
            DX = (-f1)/DF;
            x0 = x1;
            x1+=DX;
            obj = {
                Iteration:iter,
                X0:x0,
                X1:x1,
                F0:f0,
                F1:f1
            }
            data.push(obj)
            ea = error(x0, x1)            
        }while(ea>e)
        setX(x1)
    }

    const dataX=[];
    const dataY=[];
    const a = () => {
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

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        const x1num = parseFloat(X1)
        Calsecant(x0num,x1num);

        setHtml(print());
        setstate(data);
    }

    return(
        <Container>
            <h3>Secant</h3>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Input g(x)</Form.Label>
                    
                            <input type="text" id="equation" value={Equation} onChange={e => {setEquation(e.target.value)}} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                       
                     <Form.Label>Input X0</Form.Label>
                        <input type="number" id="X0" value={X0} onChange={e => setX0(e.target.value)} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    <Form.Label>Input X1</Form.Label>
                        <input type="number" id="X1" value={X1} onChange={e => setX1(e.target.value)} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    </Form.Group>
                    <Button variant="outline-info" onClick={calculateRoot}>
                        Calculate
                    </Button>
            </Form>
                <br></br>
                <h5>Answer = {X.toPrecision(7)}</h5>
                <Container>
                    {html}
                </Container>
                
        </Container>
    )
    
}

export default Secant