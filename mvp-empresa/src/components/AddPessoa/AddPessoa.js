import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "@material-ui/core";
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const baseUrl = "http://localhost:3000/";

const possuiCarro = [
  {
    codigo: 1,
    valor: "Sim"
  },
  {
    codigo: 0,
    valor: "Não"
  }
];

class AddPessoa extends Component {
  state = {
    cidades: [],
    cidade: "",
    estadosCivis: [],
    estadoCivil: "",
    faixasEtarias: [],
    faixaEtaria: "",
    fontes: [],
    fonte: "",
    instrucoes: [],
    instrucao: "",
    municipios: [],
    municipio: "",
    posicoesTrabalho: [],
    posicaoTrabalho: "",
    profissoes: [],
    profissao: "",
    rendas: [],
    renda: "",
    ufs: [],
    uf: "",
    sexo: "",

    cpf: "",
    nome: "",
    email: "",
    telefone: "",
    celular: "",
    cep: "",
    codigo_UF: "",
    dataNascimento: "",
    classeSocial: "",
    imovel: "",
    funcionario: "",
    moradia: "",
    possuiCarro: "",
    raca: "",

    codigo_UF: "",
    codigo_cidade: "",
    codigo_municipio: "",
    codigo_faixa_etaria: "",
    codigo_estado_civil: "",
    codigo_instrucao: "",
    codigo_renda: "",
    codigo_profissao: "",
    codigo_posicao_trabalho: "",
    possui_carro: ""
  };

  componentDidMount() {
    return axios
      .all([
        axios.get(`${baseUrl}cidades`),
        axios.get(`${baseUrl}estados_civis`),
        axios.get(`${baseUrl}faixas_etarias`),
        axios.get(`${baseUrl}fontes`),
        axios.get(`${baseUrl}instrucoes`),
        axios.get(`${baseUrl}municipios`),
        axios.get(`${baseUrl}posicoes_trabalho`),
        axios.get(`${baseUrl}profissoes`),
        axios.get(`${baseUrl}rendas`),
        axios.get(`${baseUrl}ufs`)
      ])
      .then(
        axios.spread(
          (
            cidadesRes,
            estadosCivisRes,
            faixasEtariasRes,
            fontesRes,
            instrucoesRes,
            municipiosRes,
            posicoesTrabalhoRes,
            profissoesRes,
            rendasRes,
            ufsRes
          ) => {
            this.setState({
              cidades: cidadesRes.data,
              estadosCivis: estadosCivisRes.data,
              faixasEtarias: faixasEtariasRes.data,
              fontes: fontesRes.data,
              instrucoes: instrucoesRes.data,
              municipios: municipiosRes.data,
              posicoesTrabalho: posicoesTrabalhoRes.data,
              profissoes: profissoesRes.data,
              rendas: rendasRes.data,
              ufs: ufsRes.data
            });
            {
              console.log(this.state.cidades);
            }
          }
        )
      );
  }

  selectCidade = () =>
    this.state.cidades.map(cidade => (
      <MenuItem key={cidade.codigo_cidade} value={cidade.nome_cidade}>
        {cidade.nome_cidade}
      </MenuItem>
    ));

  selectUf = () =>
    this.state.ufs.map(uf => (
      <MenuItem key={uf.codigo_UF} value={uf.nome_UF}>
        {uf.nome_UF}
      </MenuItem>
    ));

  selectFaixaEtaria = () =>
    this.state.faixasEtarias.map(faixaEtaria => (
      <MenuItem
        key={faixaEtaria.codigo_faixa_etaria}
        value={faixaEtaria.descricao_faixa_etaria}
      >
        {faixaEtaria.descricao_faixa_etaria}
      </MenuItem>
    ));

  selectFontes = () =>
    this.state.fontes.map(fonte => (
      <MenuItem key={fonte.codigo_fonte} value={fonte.descricao_fonte}>
        {fonte.descricao_fonte}
      </MenuItem>
    ));

  selectEstadoCivil = () =>
    this.state.estadosCivis.map(estadoCivil => (
      <MenuItem
        key={estadoCivil.codigo_estado_civil}
        value={estadoCivil.descricao_estado_civil}
      >
        {estadoCivil.descricao_estado_civil}
      </MenuItem>
    ));

  selectInstrucoes = () =>
    this.state.instrucoes.map(instrucao => (
      <MenuItem
        key={instrucao.codigo_instrucao}
        value={instrucao.descricao_instrucao}
      >
        {instrucao.descricao_instrucao}
      </MenuItem>
    ));

  selectMunicipios = () =>
    this.state.municipios.map(municipio => (
      <MenuItem
        key={municipio.codigo_municipio}
        value={municipio.nome_municipio}
      >
        {municipio.nome_municipio}
      </MenuItem>
    ));

  selectPosicoesTrabalho = () =>
    this.state.posicoesTrabalho.map(posicaoTrab => (
      <MenuItem
        key={posicaoTrab.codigo_posicao_trabalho}
        value={posicaoTrab.descricao_posicao_trabalho}
      >
        {posicaoTrab.descricao_posicao_trabalho}
      </MenuItem>
    ));

  selectProfissoes = () =>
    this.state.profissoes.map(profissao => (
      <MenuItem
        key={profissao.codigo_profissao}
        value={profissao.descricao_profissao}
      >
        {profissao.descricao_profissao}
      </MenuItem>
    ));

  selectRendas = () =>
    this.state.rendas.map(renda => (
      <MenuItem key={renda.codigo_renda} value={renda.descricao_renda}>
        {renda.descricao_renda}
      </MenuItem>
    ));

  selectSexo = () =>
    ["M", "F"].map(item => (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    ));

  selectPossuiCarro = () => 
    possuiCarro.map(item => (
      <MenuItem key={item.codigo} value={item.codigo}>
        {item.valor}
      </MenuItem>
    ));

  addButton = () => {
    axios
      .post(`${baseUrl}pessoas/cadastrar`, {
        codigo_fonte: this.state.codigo_fonte,
        cpf: this.state.cpf,
        nome: this.state.nome,
        email: this.state.email,
        telefone: this.state.telefone,
        celular: this.state.celular,
        cep: this.state.cep,
        codigo_UF: this.state.codigo_UF,
        codigo_cidade: this.state.codigo_cidade,
        codigo_municipio: this.state.codigo_municipio,
        sexo: this.state.sexo,
        data_nascimento: this.state.dataNascimento,
        codigo_faixa_etaria: this.state.codigo_faixa_etaria,
        codigo_estado_civil: this.state.codigo_estado_civil,
        classe_social: this.state.classeSocial,
        codigo_instrucao: this.state.codigo_instrucao,
        codigo_renda: this.state.codigo_renda,
        codigo_profissao: this.state.codigo_profissao,
        codigo_posicao_trabalho: this.state.codigo_posicao_trabalho,
        imovel: this.state.imovel,
        funcionario: this.state.funcionario,
        moradia: this.state.moradia,
        possui_carro: this.state.possuiCarro,
        raca: this.state.raca
      })
      .then(
        console.log(
          "codigo_fonte: " + this.state.codigo_fonte,
          "cpf: " + this.state.cpf,
          "nome: " + this.state.nome,
          "email: " + this.state.email,
          "telefone: " + this.state.telefone,
          "celular: " + this.state.celular,
          "cep: " + this.state.cep,
          "codigo_UF: " + this.state.codigo_UF,
          "codigo_cidade: " + this.state.codigo_cidade,
          "codigo_municipio: " + this.state.codigo_municipio,
          "sexo: " + this.state.sexo,
          "data_nascimento: " + this.state.dataNascimento,
          "codigo_faixa_etaria: " + this.state.codigo_faixa_etaria,
          "codigo_estado_civil: " + this.state.codigo_estado_civil,
          "classe_social: " + this.state.classeSocial,
          "codigo_instrucao: " + this.state.codigo_instrucao,
          "codigo_renda: " + this.state.codigo_renda,
          "codigo_profissao: " + this.state.codigo_profissao,
          "codigo_posicao_trabalho: " + this.state.codigo_posicao_trabalho,
          "imovel: " + this.state.imovel,
          "funcionario: " + this.state.funcionario,
          "moradia: " + this.state.moradia,
          "possui_carro: " + this.state.possui_carro,
          "raca: " + this.state.raca,
          "cidade: " + this.state.cidade
        )
      )
  };

  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>Adicionar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha os campos abaixo para adicionar uma nova pessoa
          </DialogContentText>
          <TextField
            autoFocus
            value={this.state.nome}
            onChange={event => {
              this.setState({ nome: event.target.value });
            }}
            margin="dense"
            id="nome"
            label="Nome"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={this.state.cpf}
            onChange={event => {
              this.setState({ cpf: event.target.value });
            }}
            id="cpf"
            label="CPF"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={this.state.email}
            onChange={event => {
              this.setState({ email: event.target.value });
            }}
            id="email"
            label="Email"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            value={this.state.telefone}
            onChange={event => {
              this.setState({ telefone: event.target.value });
            }}
            id="telefone"
            label="Telefone"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={this.state.celular}
            onChange={event => {
              this.setState({ celular: event.target.value });
            }}
            id="celular"
            label="Celular"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={this.state.cep}
            onChange={event => {
              this.setState({ cep: event.target.value });
            }}
            id="cep"
            label="CEP"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={this.state.classeSocial}
            onChange={event => {
              this.setState({ classeSocial: event.target.value });
            }}
            id="classeSocial"
            label="Classe social"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={this.state.imovel}
            onChange={event => {
              this.setState({ imovel: event.target.value });
            }}
            id="imovel"
            label="Imóvel"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={this.state.funcionario}
            onChange={event => {
              this.setState({ funcionario: event.target.value });
            }}
            id="funcionario"
            label="Funcionário"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            value={this.state.moradia}
            onChange={event => {
              this.setState({ moradia: event.target.value });
            }}
            id="moradia"
            label="Moradia"
            type="text"
            fullWidth
          />
          <TextField
            select
            margin="dense"
            value={this.state.possuiCarro}
            onChange={event => {
              const pc = () => {
               let c = possuiCarro.filter(c => {
                  return c.codigo === event.target.value;
                });
                return c[0].codigo;
              };
              this.setState({
                possuiCarro: event.target.value,
                possui_carro: pc()
              });
            }}
            id="possui_Carro"
            label="Possui carro"
            type="text"
            fullWidth
          >
            {this.selectPossuiCarro()}
          </TextField>
          <TextField
            margin="dense"
            value={this.state.raca}
            onChange={event => {
              this.setState({ raca: event.target.value });
            }}
            id="raca"
            label="Raça"
            type="text"
            fullWidth
          />
          <TextField
            select
            value={this.state.uf}
            onChange={event => {
              const codUf = () => {
                let u = this.state.ufs.filter(u => {
                  return u.nome_UF === event.target.value;
                });
                return u[0]["codigo_UF"];
              };
              this.setState({ codigo_UF: codUf(), uf: event.target.value });
            }}
            margin="dense"
            id="uf"
            label="UF"
            type="text"
            fullWidth
          >
            {this.selectUf()}
          </TextField>
          <TextField
            select
            value={this.state.faixaEtaria}
            onChange={event => {
              const codFaixaEt = () => {
                let fe = this.state.faixasEtarias.filter(fe => {
                  return fe.descricao_faixa_etaria === event.target.value;
                });
                return fe[0]["codigo_faixa_etaria"];
              };
              this.setState({
                codigo_faixa_etaria: codFaixaEt(),
                faixaEtaria: event.target.value
              });
            }}
            margin="dense"
            id="faixaEtaria"
            label="Faixa Etária"
            type="value"
            fullWidth
          >
            {this.selectFaixaEtaria()}
          </TextField>
          <TextField
            select
            value={this.state.cidade}
            onChange={event => {
              const codCidade = () => {
                let c = this.state.cidades.filter(c => {
                  return c.nome_cidade === event.target.value;
                });
                return c[0]["codigo_cidade"];
              };
              this.setState({
                codigo_cidade: codCidade(),
                cidade: event.target.value
              });
            }}
            margin="dense"
            id="cidade"
            label="Cidade"
            type="text"
            fullWidth
          >
            {this.selectCidade()}
          </TextField>
          <TextField
            select
            value={this.state.fonte}
            onChange={event => {
              const codFonte = () => {
                let f = this.state.fontes.filter(f => {
                  return f.descricao_fonte === event.target.value;
                });
                return f[0]["codigo_fonte"];
              };
              this.setState({
                codigo_fonte: codFonte(),
                fonte: event.target.value
              });
            }}
            margin="dense"
            id="fontes"
            label="Fontes"
            type="text"
            fullWidth
          >
            {this.selectFontes()}
          </TextField>
          <TextField
            select
            value={this.state.estadoCivil}
            onChange={event => {
              const codEstCivil = () => {
                let ec = this.state.estadosCivis.filter(ec => {
                  return ec.descricao_estado_civil === event.target.value;
                });
                return ec[0]["codigo_estado_civil"];
              };
              this.setState({
                codigo_estado_civil: codEstCivil(),
                estadoCivil: event.target.value
              });
            }}
            margin="dense"
            id="estadoCivil"
            label="Estado civil"
            type="text"
            fullWidth
          >
            {this.selectEstadoCivil()}
          </TextField>
          <TextField
            select
            value={this.state.profissao}
            onChange={event => {
              const codProfissao = () => {
                let p = this.state.profissoes.filter(p => {
                  return p.descricao_profissao === event.target.value;
                });
                return p[0]["codigo_profissao"];
              };
              this.setState({
                codigo_profissao: codProfissao(),
                profissao: event.target.value
              });
            }}
            margin="dense"
            id="profissao"
            label="Profissão"
            type="text"
            fullWidth
          >
            {this.selectProfissoes()}
          </TextField>
          <TextField
            select
            value={this.state.renda}
            onChange={event => {
              const codRenda = () => {
                let r = this.state.rendas.filter(r => {
                  return r.descricao_renda === event.target.value;
                });
                return r[0]["codigo_renda"];
              };
              this.setState({
                codigo_renda: codRenda(),
                renda: event.target.value
              });
            }}
            margin="dense"
            id="renda"
            label="Renda"
            type="text"
            fullWidth
          >
            {this.selectRendas()}
          </TextField>
          <TextField
            select
            value={this.state.instrucao}
            onChange={event => {
              const codInst = () => {
                let i = this.state.instrucoes.filter(i => {
                  return i.descricao_instrucao === event.target.value;
                });
                return i[0]["codigo_instrucao"];
              };
              this.setState({
                codigo_instrucao: codInst(),
                instrucao: event.target.value
              });
            }}
            margin="dense"
            id="instrucoes"
            label="Instruções"
            type="text"
            fullWidth
          >
            {this.selectInstrucoes()}
          </TextField>
          <TextField
            select
            value={this.state.municipio}
            onChange={event => {
              const codMun = () => {
                let m = this.state.municipios.filter(m => {
                  return m.nome_municipio === event.target.value;
                });
                return m[0].codigo_municipio;
              };
              this.setState({
                codigo_municipio: codMun(),
                municipio: event.target.value
              });
            }}
            margin="dense"
            id="municipio"
            label="Município"
            type="text"
            fullWidth
          >
            {this.selectMunicipios()}
          </TextField>
          <TextField
            select
            value={this.state.posicaoTrabalho}
            onChange={event => {
              const posTrab = () => {
                let pt = this.state.posicoesTrabalho.filter(pt => {
                  return pt.descricao_posicao_trabalho === event.target.value;
                });
                return pt[0]["codigo_posicao_trabalho"];
              };
              this.setState({
                codigo_posicao_trabalho: posTrab(),
                posicaoTrabalho: event.target.value
              });
            }}
            margin="dense"
            id="posicaoTrabalho"
            label="Posição trabalho"
            type="text"
            fullWidth
          >
            {this.selectPosicoesTrabalho()}
          </TextField>
          <TextField
            select
            value={this.state.sexo}
            onChange={event => {
              this.setState({ sexo: event.target.value });
            }}
            margin="dense"
            id="sexo"
            label="Sexo"
            type="text"
            fullWidth
          >
            {this.selectSexo()}
          </TextField>
          <TextField
            InputLabelProps={{ shrink: true }}
            value={this.state.dataNascimento}
            onChange={event => {
              this.setState({ dataNascimento: event.target.value });
            }}
            margin="normal" 
            id="data_nascimento"
            label="Data de nascimento"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.close()} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => this.addButton()} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddPessoa;
