import { useState } from "react"
import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import IconButton from '@mui/material/IconButton'
import Fingerprint from '@mui/icons-material/Fingerprint'
import axios from "axios"

const Crud = () => {
  const [items, setItems] = useState([]);
  const [html, setHTML] = useState(null);

  // const url = 'http://localhost:8081/ques'
  // useEffect(() => {
  //     axios.get(url)
  //     .then(res => {
  //         let Data = res.data
  //         setItems(res.data)
  //         console.log(Data)
  //     })
  //     .catch(error => {
  //         console.log(error)
  //     })
  //     }, [])

  const gettoken = () => {
    const url = "http://localhost:8081/login";
    axios
      .get(url)
      .then((res) => {
        let token = res.data;
        console.log(token);
        getdata(token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getdata = (token) => {
    const url = "http://localhost:8081/ques";
    axios
      .get(url, { headers: { authorization: `b ${token.token}` } })
      .then((res) => {
        console.log(res);
        setItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setHTML(print());
  };

  const print = () => {
    return (
      <Container>
        <Paper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Question</TableCell>
                  <TableCell align="right">Title</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="right">{row.question}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ p: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
            >
              DATABASE
            </Typography>
          </Box>
          <Box>
            {/* <Button variant="outlined" onClick={getdata}>
              SHOW
            </Button> */}
            <Button color="secondary" onClick={getdata}>SHOW</Button>
          </Box>
          <Box>
            {/* <Button variant="outlined" onClick={gettoken}>
              TOKEN
            </Button> */}
            <IconButton aria-label="fingerprint" color="secondary" onClick={gettoken}>
              <Fingerprint />
            </IconButton>
          </Box>
        </Box>
        {html}
      </Paper>
    </Container>
  );
};

export default Crud;
