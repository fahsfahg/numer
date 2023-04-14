import { evaluate } from 'mathjs'
import { useState } from 'react'
import { Button, Container, Table } from "react-bootstrap";

const Onep = () => {

    const p = () => {
        console.log(data)

        return(
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>Iteration</th>
                            <th>X0</th>
                            <th>g(x0)</th>
                            <th>X1</th>
                            <th>g(x1)</th>
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
            </Container>
        )
    }

    const calonep = (x0) => {
        var gx0, gx1, er, x1, max=50, obj={}, scope
        var iteration = 0
        var sete = 0.0000001
        do {
            iteration++

            scope = {x:x0}
            gx0 = evaluate(Equation, scope)
            x1 = evaluate(Equation, scope)
            scope = {x:x1}
            gx1 = evaluate(Equation, scope)

            data.push(obj = {
                Iteration: iteration,
                gX0: gx0,
                gX1: gx1,
                X0: x0,
                X1: x1
            })

            er = err(x0, x1)
            x0 = x1
        }while(er>sete && iteration<max)
        setX(x1)
    }

    const data = []
    const [html, setHtml] = useState(null)
    const [state, setState] = useState([])
    const [X0, setX0] = useState(0)
    const [X, setX] = useState(0)
    const [Equation, setEquation] = useState("(x+4)-13")
    const err = (xold, xnew) => Math.abs((xnew-xold) / xnew) * 100

    const inputX0 = (event) => {
        console.log(event.traget.value)
        setX0(event.traget.value)
    }

    const calculateroot = () =>{
        const x0 = parseFloat(X0)
        calonep(x0)
        setHtml(p());
    }

    return(
        <Container>
            <h4>One Point</h4>
            <form>
                <h6>g(x)</h6>
                <input type="text" value={Equation} onChange={e => setEquation(e.target.value)}/>
                <h6>X0</h6>
                <input type="Number" value={X0} onChange={e => setX0(e.target.value)}/>
                <br /> <br />
                <Button onClick={calculateroot}>Calculate</Button>
            </form>
            <br />
            <h5>Answer = {X}</h5>
            <Container>
                {html}
            </Container>
        </Container>
    )
}

export default Onep