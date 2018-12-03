import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import AddPessoa from "./components/AddPessoa/AddPessoa";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "./components/MySnackbarContent/MySnackbarContent";

const baseUrl = 'http://localhost:3000/pessoas';
class App extends Component {
  state = {
    pessoas: [],
    showDialog: false,
    carregando: true,
    openSnack: false,
    snackBarVariant: "",
    snackMessage: "",
    isEdit: false,
    id: ''
  };

  componentDidMount() {
    this.setState({ carregando: true });

    this.getPessoas();
  }

  deleteClick = id => {
    axios
      .delete(`${baseUrl}/${id}/apagar`)
      .then(res => {
        this.setState(prevState => {
          return {
            pessoas: prevState.pessoas.filter(pessoa => {
              return pessoa.numero_registro !== id;
            })
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  editClick = id => {
    axios.
        put(`${baseUrl}/pessoas/${id}`)
        .then(res => {

        })
  }

  handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openSnack: false });
  };

  getPessoas() {
    axios
      .get(baseUrl)
      .then(res => {
        this.setState({ pessoas: res.data });
      })
      .then(this.setState({ carregando: false }));
  }

  render() {
    return (
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" align="center">
              Lista de Pessoas
            </Typography>
            <div
              style={{
                textAlign: "center",
                display: this.state.carregando ? "block" : "none"
              }}
            >
              <ProgressBar />
            </div>
            <List>
              {this.state.pessoas.map(pessoa => (
                <ListItem button key={pessoa.numero_registro}>
                  <ListItemText primary={pessoa.nome} secondary={pessoa.cpf} />
                  <Button>
                    <DeleteIcon
                      onClick={() => this.deleteClick(pessoa.numero_registro)}
                    />
                  </Button>
                  <Button>
                    <EditIcon onClick={() => {
                      this.setState({isEdit: true, id: pessoa.numero_registro, showDialog: true})
                    }} />
                  </Button>
                </ListItem>
              ))}
            </List>
            <Grid container direction="row" align="center">
              <Button
                onClick={() => this.setState({ showDialog: true })}
                fullWidth={true}
                color="primary"
              >
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <AddPessoa isEdit = {this.state.isEdit} id = {this.state.id}
          open={this.state.showDialog}
          close={v => {
            if (v) {
              this.setState({
                openSnack: true,
                snackBarVariant: "success",
                snackMessage: "Operação realizada com succeso",
                carregando: true
              });

              this.getPessoas();
            }
            this.setState({ showDialog: false });
          }}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={this.state.openSnack}
          autoHideDuration={4000}
          onClose={this.handleSnackClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleSnackClose}
            variant={this.state.snackBarVariant}
            message={this.state.snackMessage}
          />
        </Snackbar>
      </div>
    );
  }
}

export default App;
