import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate, typeOf } from "mathjs";
import "./Comp.css";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";

Chart.register(CategoryScale);
Chart.register(...registerables);

const Bisection = () => {
  const url = "http://localhost:8081/question";
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        let Data = res.data;
        setEquation(res.data[0].question);
        console.log(Data[0].question);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const print = () => {
    console.log(data);
    a();
    setValueIter(data.map((x) => x.iteration));
    setValueXl(data.map((x) => x.Xl));
    setValueXm(data.map((x) => x.Xm));
    setValueXr(data.map((x) => x.Xr));
    return (
      <Container>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th width="10%">Iteration</th>
              <th width="30%">XL</th>
              <th width="30%">XM</th>
              <th width="30%">XR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.iteration}</td>
                  <td>{element.Xl}</td>
                  <td>{element.Xm}</td>
                  <td>{element.Xr}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Line data={datagraph} />
      </Container>
    );
  };

  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

  const Calbisection = (xl, xr) => {
    var xm, fXm, fXr, ea, scope;
    var iter = 0;
    var MAX = 50;
    const e = 0.00001;
    var obj = {};
    do {
      xm = (xl + xr) / 2.0;
      scope = {
        x: xr,
      };
      fXr = evaluate(Equation, scope);

      scope = {
        x: xm,
      };
      fXm = evaluate(Equation, scope);

      iter++;
      if (fXm * fXr > 0) {
        ea = error(xr, xm);
        obj = {
          iteration: iter,
          Xl: xl,
          Xm: xm,
          Xr: xr,
        };
        data.push(obj);
        xr = xm;
      } else if (fXm * fXr < 0) {
        ea = error(xl, xm);
        obj = {
          iteration: iter,
          Xl: xl,
          Xm: xm,
          Xr: xr,
        };
        data.push(obj);
        xl = xm;
      }
    } while (ea > e && iter < MAX);
    setX(xm);
  };
  const dataX = [];
  const dataY = [];
  const a = () => {
    {
      data.map((element, index) => {
        dataX[index] = element.Xm;
        dataY[index] = element.iteration;
      });
    }
    console.log("datax" + dataX);
    console.log("datay" + dataY);
  };

  const datagraph = {
    labels: dataX,
    datasets: [
      {
        axis: "y",
        label: "Answer",
        data: dataX,
        borderColor: "rgb(120, 228, 255)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const data = [];
  const [valueIter, setValueIter] = useState([]);
  const [valueXl, setValueXl] = useState([]);
  const [valueXm, setValueXm] = useState([]);
  const [valueXr, setValueXr] = useState([]);

  const [html, setHtml] = useState(null);
  const [Equation, setEquation] = useState("");
  const [X, setX] = useState(0);
  const [XL, setXL] = useState(0);
  const [XR, setXR] = useState(0);

  const inputEquation = (event) => {
    console.log(event.target.value);
    setEquation(event.target.value);
  };

  const inputXL = (event) => {
    console.log(event.target.value);
    setXL(event.target.value);
  };

  const inputXR = (event) => {
    console.log(event.target.value);
    setXR(event.target.value);
  };

  const calculateRoot = () => {
    const xlnum = parseFloat(XL);
    const xrnum = parseFloat(XR);
    Calbisection(xlnum, xrnum);

    setHtml(print());

    console.log(valueIter);
    console.log(valueXl);
  };

  return (
    <Container>
      <h3>Bisection</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Input f(x)</Form.Label>

          <input
            type="text"
            id="equation"
            data-testid="Equation"
            value={Equation}
            onChange={inputEquation}
            style={{ width: "20%", margin: "0 auto" }}
            className="form-control"
          ></input>

          <Form.Label>Input XL</Form.Label>
          <input
            type="number"
            id="XL"
            data-testid="XL"
            onChange={inputXL}
            style={{ width: "20%", margin: "0 auto" }}
            className="form-control"
          ></input>
          <Form.Label>Input XR</Form.Label>
          <input
            type="number"
            id="XR"
            data-testid="XR"
            onChange={inputXR}
            style={{ width: "20%", margin: "0 auto" }}
            className="form-control"
          ></input>
        </Form.Group>
        <Button variant="outline-info" onClick={calculateRoot} data-testid="myBtn">
          Calculate
        </Button>
      </Form>
      <br></br>
      {console.log(typeof X)}
      <h5 data-testid="ans">Answer = {X.toPrecision(7)}</h5>
      <Container>{html}</Container>
    </Container>
  );
};

export default Bisection;
