class PessoasController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :criar_conexao

    # Routes
    def create

        pessoa = Pessoa.new(pessoa_params)
        data = pessoa.data_nascimento.nil? ? "null" : "'#{pessoa.data_nascimento}'"

        successfull = checar_campos(pessoa)

        if successfull
            
            colunas = ""
            contador = 0
            Pessoa.column_names.each do |coluna|
                if contador > 0
                    colunas = (contador == 1) ? "#{colunas} #{coluna}" : "#{colunas}, #{coluna}"
                end
                contador += 1
            end
            
            @conn.execute("  insert into pessoas(#{colunas}) 
                            values( #{pessoa.codigo_fonte}, 
                                    #{pessoa.cpf},
                                    '#{pessoa.nome}',
                                    '#{pessoa.email}',
                                    #{pessoa.telefone},
                                    #{pessoa.celular},
                                    #{pessoa.cep},
                                    #{pessoa.codigo_UF},
                                    #{pessoa.codigo_cidade},
                                    #{pessoa.codigo_municipio},
                                    '#{pessoa.sexo}',
                                    #{data},
                                    #{pessoa.codigo_faixa_etaria},
                                    #{pessoa.codigo_estado_civil},
                                    '#{pessoa.classe_social}',
                                    #{pessoa.codigo_instrucao},
                                    #{pessoa.codigo_renda},
                                    #{pessoa.codigo_profissao},
                                    #{pessoa.codigo_posicao_trabalho},
                                    '#{pessoa.imovel}',
                                    '#{pessoa.funcionario}',
                                    '#{pessoa.moradia}',
                                    #{pessoa.possui_carro},
                                    '#{pessoa.raca}')")

            result = @conn.select_one "select * from pessoas order by numero_registro desc limit 1"

            result["data_nascimento"] = result["data_nascimento"].to_time.to_i 

            render json: result, status: 200
        else
            render json: {message: "Preencha todos os campos!!"}, status: 418
        end
    end

    def show

        results = @conn.select_all "select * from pessoas order by numero_registro asc"

        results.each do |result|
            
            result["data_nascimento"] = result["data_nascimento"].to_time.to_i 
        end

        render json: results, status: 200
    end

    def show_one

        result = @conn.select_one "select * from pessoas where numero_registro = #{params[:numero_registro]}"

        if !result.nil?  
            result["data_nascimento"] = result["data_nascimento"].to_time.to_i 
            
            render json: result, status: 200
        else
            render json: {message: "Não encontrado"}, status: 404
        end
    end 

    def update

        pessoa = Pessoa.new(pessoa_params)

        @conn.execute(" update pessoas set 
                        codigo_fonte = #{pessoa.codigo_fonte}, 
                        cpf = #{pessoa.cpf}, 
                        nome = '#{pessoa.nome}', 
                        email = '#{pessoa.email}', 
                        telefone = #{pessoa.telefone}, 
                        celular = #{pessoa.celular}, 
                        cep = #{pessoa.cep}, 
                        codigo_UF = #{pessoa.codigo_UF}, 
                        codigo_cidade = #{pessoa.codigo_cidade}, 
                        codigo_municipio = #{pessoa.codigo_municipio}, 
                        sexo = '#{pessoa.sexo}', 
                        data_nascimento = '#{pessoa.data_nascimento}', 
                        codigo_faixa_etaria = #{pessoa.codigo_faixa_etaria}, 
                        codigo_estado_civil = #{pessoa.codigo_estado_civil}, 
                        classe_social = '#{pessoa.classe_social}', 
                        codigo_instrucao = #{pessoa.codigo_instrucao}, 
                        codigo_renda = #{pessoa.codigo_renda}, 
                        codigo_profissao = #{pessoa.codigo_profissao}, 
                        codigo_posicao_trabalho = #{pessoa.codigo_posicao_trabalho}, 
                        imovel = '#{pessoa.imovel}', 
                        funcionario = '#{pessoa.funcionario}', 
                        moradia = '#{pessoa.moradia}', 
                        possui_carro = #{pessoa.possui_carro}, 
                        raca = '#{pessoa.raca}' 
                        where numero_registro = #{params[:numero_registro]}")

        result = @conn.select_one "select * from pessoas where numero_registro = #{params[:numero_registro]}"

        if !result.nil?  
            result["data_nascimento"] = result["data_nascimento"].to_time.to_i 
            
            render json: result, status: 200
        else
            render json: {message: "Não encontrado"}, status: 404
        end
    end

    def destroy
        
        result = @conn.select_one "select * from pessoas where numero_registro = #{params[:numero_registro]}"
        @conn.execute("delete from pessoas where numero_registro = #{params[:numero_registro]}")


        if !result.nil?
            result["data_nascimento"] = result["data_nascimento"].to_time.to_i 

            render json: result, status: 200
        else
            render json: {message: "Não encontrado"}, status: 404
        end
    end

    # General functions

    def checar_campos(pessoa)

        contador = 0
        successfull = true
        pessoa.attributes.each do |att_name, att_value|
            if contador > 0 
                successfull = !att_value.nil?
                if !successfull
                    puts "#{att_name}"
                    break
                end
            end
            contador += 1
        end 

        successfull
    end
    
    def pessoa_params
        params.permit( :codigo_fonte, :numero_registro,
            :cpf, 
            :nome, 
            :email, 
            :telefone, 
            :celular, 
            :cep, :codigo_UF, 
            :codigo_cidade, 
            :codigo_municipio, 
            :sexo, 
            :data_nascimento, 
            :codigo_faixa_etaria, 
            :codigo_estado_civil, 
            :classe_social, 
            :codigo_instrucao,
            :codigo_renda, 
            :codigo_profissao, 
            :codigo_posicao_trabalho, 
            :imovel, 
            :funcionario, 
            :moradia, 
            :possui_carro, 
            :raca)
    end

    private
    def criar_conexao
        @conn = ActiveRecord::Base.connection
    end
end

