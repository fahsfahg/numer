import { evaluate } from "mathjs";
import axios from 'axios'
import { useState, useEffect } from "react";
import { Button, Container, Table, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { CategoryScale,Chart,registerables } from "chart.js";
import './Comp.css'

Chart.register(CategoryScale);
Chart.register(...registerables);

const FalsePosition = () => {

    const url = 'http://localhost:8081/question'
    useEffect(() => {
        axios.get(url)
        .then(res => {
            setEquation(res.data[0].question)
            console.log(Data)
        })
        .catch(error => {
            console.log(error)
        })
        }, [])

    const print = () =>{
        console.log(data)
        g();        
        setValueIter(data.map((x)=>x.Iteration));
        setValueXn(data.map((x)=>x.Xn));
        setValueXl(data.map((x)=>x.Xl));
        setValueXr(data.map((x)=>x.Xr));

        return (
            <Container>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">Xn</th>
                            <th width="30%">XL</th>
                            <th width="30%">XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.length > 0 && state.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.Iteration}</td>
                                <td>{element.Xn}</td>
                                <td>{element.Xl}</td>
                                <td>{element.Xr}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Line data={datagrapgh}/>
            </Container>
        )
    }

    const [state, setstate] = useState([])
    const [Equation, setEquation] = useState("")
    const [X, setX] = useState(0)
    const [XL, setXL] = useState(0)
    const [XR, setXR] = useState(0)
    const [html, setHTML] = useState(null)
    
    const [valueIter, setValueIter] = useState([])
    const [valueXl, setValueXl] = useState([])
    const [valueXn, setValueXn] = useState([])
    const [valueXr, setValueXr] = useState([])
    
    const data = [];
    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    const Calfalsepos = (xl, xr) => {
        
        var xi,fXi,fXl,fXr,ea,scope;
        var iter = 0;
        var xstring = ""+iter;
        var MAX = 50;
        const e = 0.00001;
        var obj={};

        do
        {
            scope = {
                x:xl,
            }
            fXl = evaluate(Equation, scope)
            scope = {
                x:xr,
            }
            fXr = evaluate(Equation, scope)
            xi = (xl*(fXr)-xr*(fXl))/(fXr-fXl);
            scope = {
                x:xi,
            }
            fXi = evaluate(Equation, scope)
            iter ++;
            xstring = "X"+iter;
            if (fXi*fXr > 0)
            {
                ea = error(xr, xi);
                obj = {
                    Iteration:iter,
                    Xn:xstring,
                    Xi:xi,
                    Xl:xl,
                    Xr:xr
                }
                data.push(obj)
                xr = xi;
            }
            else if (fXi*fXr < 0)
            {
                ea = error(xl, xi);
                obj = {
                    Iteration:iter,
                    Xn:xstring,
                    Xi:xi,
                    Xl:xl,
                    Xr:xr
                }
                data.push(obj)
                xl = xi;
            }
        }while(ea>e && iter<MAX)
        setX(xi)
    }

    const dataX=[];
    const dataY=[];
    const g = () => {
    {
        data.map((element,index) =>{
        dataX[index] = element.Iteration;
        dataY[index] = element.Xi;
        })   }
        console.log("dataX " + dataX); 
        console.log("dataY " + dataY); 

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
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Calfalsepos(xlnum,xrnum);
        setstate(data);
        setHTML(print())
    }
    

    return(
        <Container>
            <h3>False-Position</h3>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    
                            <input type="text" id="equation" value={Equation} onChange={e => setEquation(e.target.value)} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        
                        <Form.Label>Input XL</Form.Label>
                        <input type="number" id="XL" onChange={e => setXL(e.target.value)} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input XR</Form.Label>
                        <input type="number" id="XR" onChange={e => setXR(e.target.value)} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
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

export default FalsePosition