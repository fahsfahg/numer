import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import './Matrix.css'

const Jacobi = () =>{
    const [value, setValue] = useState(0)
    const [mRows, setmRows] = useState([])
    const [mColumn, setmColumn] = useState([])

    const UpdateMatrix = (e) => {
        setValue(e.target.value)
        setmRows([])
        setmColumn([])

        for(let i=0; i<e.target.value; i++){
            setmRows(oldArray => [...oldArray, { id: "A" + (i + 1) }])
        }

        for(let j=0; j<e.target.value; j++){
            setmColumn(oldArray => [...oldArray, { id: "A" + (j + 1) }])
        }
    }

    const CalJacobi = (e) => {
        // e.preventDefault()

        // const matrixA = []
        // for(let i=0; i<value; i++){
        //     for(let j=0; j<value; j++){
        //         matrixA[i] = []
        //     }
        // }

        // for(let i=0; i<value; i++){
        //     for(let j=0; j<value; j++){
        //         const A = document.getElementById("A" + (i + 1) + (j + 1)).value
        //         matrixA[i][j] = A
        //     }
        // }

        // for(let i=0; i<value; i++){
        //     for(let j=0; j<value; j++){
        //         console.log("i: " + (i + 1) + " j: " + (j + 1) + " = " + matrixA[i][j])
        //     }
        // }
    }

    useEffect(() => { })

    return (
        <div>
            <h3>Jacobi</h3>
            <div className="col-auto">
                <input type="number" placeholder="ex. 3x3" name="matrix" onChange={UpdateMatrix} value={value.matrix} style={{width:"10%", margin:"0 auto"}} className="form-control"/>
            </div>
            
                <Container>
                    {mRows.map((mRows, i) => (
                        <Row key={i}>
                            {mColumn.map((mColumn, j) => (
                                <Col key={j}>
                                    <input type='number' id={ 'A' + (i + 1) + "" + (j + 1) } placeholder={ 'A' + (i + 1) + "" + (j + 1) } style={{width:"50%"}} className="form-control"/>
                                </Col> 
                            ))}
                        </Row>
                    ))}
                </Container>
                <Button className="mb-4" variant="outline-info" onClick={CalJacobi}>
                    Calculate
                </Button>
            
        </div>
    )
}

export default Jacobi