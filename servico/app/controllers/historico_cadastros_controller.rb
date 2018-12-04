class HistoricoCadastrosController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :criar_conexao

    def show

        results = @conn.select_all "select * from historicoCadastros"
        
        results.each do |single|
            single["data_cadastro"] = single["data_cadastro"].to_time.to_i 
        end

        render json: results, status: 200
    end

    private
    def criar_conexao
        @conn = ActiveRecord::Base.connection
    end
end