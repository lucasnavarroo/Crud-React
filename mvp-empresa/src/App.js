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

// const styles = {
//   hide: {
//     display: none
//   }
// };

class App extends Component {
  state = {
    pessoas: [],
    showDialog: false

  };

  componentDidMount() {
    axios.get("http://localhost:3000/pessoas").then(res => {
      this.setState({ pessoas: res.data });
    });
  }

  deleteClick = id => {
    axios
      .delete(`http://localhost:3000/pessoas/${id}/apagar`)
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
  // className={styles.hide}
  render() {
    return (
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" align="center">
              Lista de Pessoas
            </Typography>
            <ProgressBar ></ProgressBar>
            <List>
              {this.state.pessoas.map(pessoa => (
                <ListItem button key={pessoa.numero_registro}>
                  <ListItemText primary={pessoa.nome} />
                  <Button>
                    <DeleteIcon
                      onClick={() => this.deleteClick(pessoa.numero_registro)}
                    />
                  </Button>
                  <Button>
                    <EditIcon />
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
        <AddPessoa
          open={this.state.showDialog}
          close={() => {
            this.setState({ showDialog: false });      
            // axios.get("http://localhost:3000/pessoas").then(res => {
            //   this.setState({ pessoas: res.data });
            // });
          }}
        />
      </div>
    );
  }
}

export default App;
