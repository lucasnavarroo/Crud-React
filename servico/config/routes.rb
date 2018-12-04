Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # pessoas_controller
  post "pessoas/cadastrar", to: "pessoas#create"
  get "pessoas", to: "pessoas#show"
  get "pessoa/:numero_registro", to: "pessoas#show_one"
  delete "pessoas/:numero_registro/apagar", to: "pessoas#destroy"
  put "pessoas/:numero_registro", to: "pessoas#update"

  # cidades_controller ok
  get "cidades", to: "cidades#show"
  # estado_civis_controller ok
  get "estados_civis", to: "estado_civils#show"
  # faixa_etarias_controller ok
  get "faixas_etarias", to: "faixa_etarias#show"
  # fontes_controller ok
  get "fontes", to: "fontes#show"
  # Instrucaos_controller ok
  get "instrucoes", to: "instrucaos#show"
  # Municipios_controller ok
  get "municipios", to: "municipios#show"
  # Posicoes_Trabalho_controller ok
  get "posicoes_trabalho", to: "posicao_trabalhos#show"
  # Profissaos_controller ok
  get "profissoes", to: "profissaos#show"
  # Rendas_controller ok
  get "rendas", to: "rendas#show"
  # Ufs_controller ok
  get "ufs", to: "ufs#show"
  # Ufs_controller ok
  get "historicoCadastros", to: "historico_cadastros#show"

end
