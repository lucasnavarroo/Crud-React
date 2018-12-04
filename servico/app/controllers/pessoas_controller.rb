class PessoasController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :criar_conexao

    # Routes
    def create

        pessoa = Pessoa.new(pessoa_params)
        data = pessoa.data_nascimento.nil? ? "null" : "'#{pessoa.data_nascimento}'"
        
        successfull = checar_campos(pessoa) #chama função para checar se todos os campos foram preenchidos.

        if successfull

            #data = Time.at(pessoa.data_nascimento).to_datetime  #convente timeStamp para dateTime
            #dateFormatted = data.strftime("'%Y-%m-%d'") #convente pro formato necessário para salvar no banco
            #puts("data formatada: #{dateFormatted}")    #printa
            
            colunas = ""
            contador = 0
            Pessoa.column_names.each do |coluna| #Percorre as colunas do Modelo Pessoa
                if contador > 0
                    colunas = (contador == 1) ? "#{colunas} #{coluna}" : "#{colunas}, #{coluna}"    #Monta uma string com os nomes das colunas
                end
                contador += 1
            end
            
            #Inserção no banco
            @conn.execute("  insert into pessoas(#{colunas}) 
                            values( #{pessoa.codigo_fonte}, 
                                    '#{pessoa.cpf}',
                                    '#{pessoa.nome}',
                                    '#{pessoa.email}',
                                    '#{pessoa.telefone}',
                                    '#{pessoa.celular}',
                                    '#{pessoa.cep}',
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

            result = @conn.select_one "select * from pessoas order by numero_registro desc limit 1" #Pega do banco o ultimo objeto cadastrado

            result["data_nascimento"] = result["data_nascimento"].to_time.to_i 

            render json: result, status: 200 #Retorna Retorna o objeto criado
        else
            render json: {message: "Preencha todos os campos!!"}, status: 418 #Retorna um erro pedindo para preencher todos os campos
        end
    end

    def show

        results = @conn.select_all "select * from pessoas order by numero_registro asc" #Comando para pegar todas as pessoas de forma ordenada

        results.each do |result|
            
            result["data_nascimento"] = result["data_nascimento"].to_time.to_i 
        end

        render json: results, status: 200  #retorna um json com todos os objetos buscados
    end

    def show_one        

        result = @conn.select_one "select numero_registro,
                                   descricao_fonte,
                                   cpf, 
                                   nome, 
                                   email, 
                                   telefone, 
                                   celular, 
                                   cep,
                                   nome_UF,
                                   nome_cidade,
                                   nome_municipio,
                                   sexo,
                                   data_nascimento,
                                   descricao_faixa_etaria,
                                   descricao_estado_civil,
                                   classe_social,
                                   descricao_instrucao,
                                   descricao_renda,
                                   descricao_profissao,
                                   descricao_posicao_trabalho,
                                   imovel,
                                   funcionario,
                                   moradia,
                                   possui_carro,
                                   raca
                                   from pessoas as pe
                                   inner join Fontes as fo on fo.codigo_fonte = pe.codigo_fonte
                                   inner join UFs as uf on uf.codigo_uf = pe.codigo_uf
                                   inner join Cidades as c on c.codigo_cidade = pe.codigo_cidade
                                   inner join Municipios as m on m.codigo_municipio = pe.codigo_municipio
                                   inner join FaixaEtarias as fe on fe.codigo_faixa_etaria = pe.codigo_faixa_etaria
                                   inner join EstadoCivils as ec on ec.codigo_estado_civil = pe.codigo_estado_civil
                                   inner join Instrucaos as i on i.codigo_instrucao = pe.codigo_instrucao
                                   inner join Rendas as r on r.codigo_renda = pe.codigo_renda
                                   inner join Profissaos as pr on pr.codigo_profissao = pe.codigo_profissao
                                   inner join PosicaoTrabalhos as pt on pt.codigo_posicao_trabalho = pe.codigo_posicao_trabalho
                                   where numero_registro = #{params[:numero_registro]};" #pega um objeto especifico do banco a partir de um id

        if !result.nil?  #Testa se o resultado é nulo
            result["data_nascimento"] = result["data_nascimento"].to_time.to_i 
            
            render json: result, status: 200 #retorna o json do objeto buscado
        else
            render json: {message: "Não encontrado"}, status: 404  #retorna not found se nao existir esse id no banco.
        end
    end 

    def update

        pessoa = Pessoa.new(pessoa_params)  #instancia um objeto pessoa a partir dos parametros recebidos.
        data = pessoa.data_nascimento.nil? ? "null" : "'#{pessoa.data_nascimento}'"
        successfull = checar_campos(pessoa) #chama função para checar se todos os campos foram preenchidos.

        if successfull

            #data = Time.at(pessoa.data_nascimento).to_datetime  #convente timeStamp para dateTime
            #dateFormatted = data.strftime("'%Y-%m-%d'") #convente pro formato necessário para salvar no banco
            #puts("data formatada: #{dateFormatted}")    #printa

            #Comando de editar dado em uma tabela
            @conn.execute(" update pessoas set 
                            codigo_fonte = #{pessoa.codigo_fonte}, 
                            cpf = '#{pessoa.cpf}', 
                            nome = '#{pessoa.nome}', 
                            email = '#{pessoa.email}', 
                            telefone = '#{pessoa.telefone}', 
                            celular = '#{pessoa.celular}', 
                            cep = '#{pessoa.cep}', 
                            codigo_UF = #{pessoa.codigo_UF}, 
                            codigo_cidade = #{pessoa.codigo_cidade}, 
                            codigo_municipio = #{pessoa.codigo_municipio}, 
                            sexo = '#{pessoa.sexo}', 
                            data_nascimento = #{data}, 
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

            result = @conn.select_one "select * from pessoas where numero_registro = #{params[:numero_registro]}" #pega o objeto editado

                if !result.nil?  #Testa se o resultado é nulo
                    result["data_nascimento"] = result["data_nascimento"].to_time.to_i 
                    
                    render json: result, status: 200 #retorna o json do objeto editado
                else
                    render json: {message: "Não encontrado"}, status: 404 #retorna not found se nao existir esse id no banco.
                end
        else 
            render json: {message: "Preencha todos os campos!!"}, status: 418 #Retorna um erro pedindo para preencher todos os campos
        end
    end

    def destroy
        
        result = @conn.select_one "select * from pessoas where numero_registro = #{params[:numero_registro]}"   #Pega o cadastro a ser deletado
        @conn.execute("delete from pessoas where numero_registro = #{params[:numero_registro]}")                #Deleta do banco


        if !result.nil? #Testa se o resultado é nulo
            result["data_nascimento"] = result["data_nascimento"].to_time.to_i 
            
            headers['Access-Control-Allow-Origin'] = '*'
            headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
            headers['Access-Control-Request-Method'] = '*'
            headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            
            render json: result, status: 200 #retorna o json do objeto deletado
        else
            render json: {message: "Não encontrado"}, status: 404 #retorna not found se nao existir esse id no banco.
        end
    end

    # General functions

    def checar_campos(pessoa)

        contador = 0
        successfull = true   #|nomeAtributo, valorAtributo|
        pessoa.attributes.each do |att_name, att_value| #Percorre os atributos do objeto pessoa recebido por parametro
            if contador > 0                             #Ignora o primeiro atributo, pois é o numero_registro que é auto_increment
                successfull = !att_value.nil?           #Testa se o valor do atributo é nulo
                if !successfull
                    puts "#{att_name}"                  #Printa o nome do coluna que é nula
                    break
                end
            end
            contador += 1
        end 

        successfull                                     #Retorna o resultado (se há alguma coluna nula ou não)
    end
    
    def pessoa_params
        #recebe os parametros
        params.permit(  :codigo_fonte, 
                        :numero_registro,
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
        @conn = ActiveRecord::Base.connection #conexao com o banco.
    end
end