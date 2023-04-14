import { evaluate } from 'mathjs'
import { useState } from 'react'
import { Container, Button, Table } from 'react-bootstrap'
import {Line} from "react-chartjs-2";
import { CategoryScale, Chart,registerables } from "chart.js";

Chart.register(CategoryScale);
Chart.register(...registerables);

const Onepp = () => {

    const [Equation, setEquation] = useState("(x+7)-10")
    const [X0, setX0] = useState(0)
    const [X1, setX1] = useState(0)
    const [html, setHTML] = useState(null)
    const [setx0, setValueX0] = useState([])
    const [setAns, setValueAns] = useState([])
    const data = []

    // const re = (xold, xnew) => Math.abs((xnew-xold)/xnew)*100

    const print = () => {
        g()
        console.log(datagraph)
        setValueX0(data.map((x)=>x.X0))
        setValueAns(data.map((x)=>x.Answer))
        return(
            <Container>
                <Table>
                    <thead>
                        <th>X</th>
                        <th>Answer</th>
                    </thead>
                    <tbody>
                        {data.length > 0 && data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.X0}</td>
                                    <td>{element.Answer}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {<Line data={datagraph}/>}
            </Container>
        )
    }

    const dataX = []
    const dataY = []
    const g = () => {
        {
            data.map((element, index)=>{
            dataX[index] = element.X0
            dataY[index] = element.Answer
        })
        }
        console.log(dataX)
        console.log(dataY)
    }
    
    const datagraph = {
        labels: dataX,
        datasets:[
            {
                type: 'line',
                label:'Answer',
                data: dataY,
                borderColor: 'rgb(120, 228, 255)',
                fill: false,
                tension: 0.1
            }
        ]
    }

    // const labels = dataY;
    // const da = {
    // labels: labels,
    // datasets: [{
    //     label: 'My First Dataset',
    //     data: dataX,
    //     fill: false,
    //     borderColor: 'rgb(75, 192, 192)',
    //     tension: 0.1
    // }]
    // };
    

    const Calcal = (x0, x1) => {
        var i, scope, obj={}, ans, A=[]

        for (i=x0; i<=x1; i++) {
            scope = { x:i }
            ans = evaluate(Equation, scope)
            A.push(ans)

            data.push(obj = {
                Answer: A[i],
                X0: i
            })

            console.log(ans)
        }
        
    }

    const calculate = () => {
        const x0 = parseFloat(X0)
        const x1 = parseFloat(X1)
        Calcal(x0, x1)
        setHTML(print())
    }
    
    return (
        <Container>
            <h3>One point</h3>

            <h6>g(x)</h6>
            <input type="text" value={Equation} onChange={e => setEquation(e.target.value)}/>
            <h6>x(0)</h6>
            <input type="number" value={X0} onChange={e => setX0(e.target.value)} />
            <h6>x(1)</h6>
            <input type="number" onChange={e => setX1(e.target.value)}/>
            <br /> <br />
            <Button onClick={calculate}>Calculate</Button>
            <br /> <br />
            {/* <h5>Answer = {X}</h5> */}
            <br />
            <Container>
                {html}
            </Container>
        </Container>
    )
}

export default Onepp