class EstadoCivilsController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :criar_conexao

    def show

        results = @conn.select_all "select * from estadocivils"

        render json: results, status: 200
    end

    private
    def criar_conexao
        @conn = ActiveRecord::Base.connection
    end
end