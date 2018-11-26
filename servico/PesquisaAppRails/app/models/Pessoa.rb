class Pessoa < ActiveRecord::Base
    has_one :cidade
    has_one :estado_civil
    has_one :faixa_etaria
    has_one :fonte
    has_one :instrucao
    has_one :municipio
    has_one :posicao_trabalho
    has_one :profissao
    has_one :renda
    has_one :uf
end