# Rentalx-API-Node
Api desenvolvida em Node | Typescript | SOLID | Streams | Swagger

S => SRP - Single Responsability Principle (Princípo de Responsabilidade Única)
O => OCP - Open-Closed Principle (Princípio aberto/fechado)
L => LSP - Liskov Substituion Principle (Princípio de Substituição de Liskov)
I => ISP - Interface Segregation Principle (Princípio de Segregação de Interface)
D => DIP - Dependency Inversion Principle (Princípio de INversão de Dependência)

# Docker
-qual imagem quero usar
FROM node:latest
-PASTA ONDE AS INFORMACOES ESTARAO CONTIDAS. DIRETORIO DE TRABALHO 
WORKDIR /usr/app
-copiar o package
COPY package.json ./
-instalar as dependencias
RUN npm install
-copiar tudo pra dentro da pasta
COPY . . 
-rodar na porta 3333
EXPOSE 3333
-executar - docker build -t rentx . (rentx=nome_do_projeto) local onde esta(na riaz= .)
CMD ["npm","run","dev"]


docker build -t nome_projeto .
docker ps 
  qual container esta rodando?
docker run -p 3333:3333 nome_img
  esse -p esta fazendo um mapeamento das portas: toda vez que eu chamar minha locahost:3333 ele procura no docker a porta 3333

docker ps
-lista os containers rodando

docker ps -a
-lista cos containters com mais informacoes

docker rm id_container
-remove o container

docker start nome_container
-iniciar container

docker stop nome_container
-para container

mode <-> orm <-> banco de dados
o orm faz o mapeamento das informacoes de meu model e transforma isso numa tabela no meu bd

npm run typeorm migration:create src/database/migrations/CreateCategoryTable
npm run typeorm -- -d ./src/database/data-source.ts migration:run

**Requisitos Funcionais**
Funcionalidades que a aplicação vai ter: criar um usuario, recuperar senha, etc


**Requisitos Não-Funcionais**
Os dados deve ser salvos em Banco MySql, ferramentas


**Regra de Negócio**
Deve ser possivel cadastras uma categoria
Nao deve ser possivel cadastrar uma categoria ja existente

# Cadastro de carro
**RF**
[] - Deve ser possível cadastrar um novo carro.
[] - Deve ser possível listar todas as categorias.

**RNF**
**RN**
[] - Não deve ser possível cadastrar um carro com uma placa já existente.
[] - Não deve ser possivel alterar a placa de um carra cadastrado.
[] - O carro deve ser cadastrado com disponibilidade por padrão.
[] - O usuário responsável pelo cadastro deve ser um usuári administrador.

# Listagem de carro

**RF**
[] - Deve ser possível listar todos os carros disponíveis.
[] - Deve ser possivel listar todos os carros disponíveis pelo nome da categoria.
[] - Deve ser possivel listar todos os carros disponíveis pelo nome da marca.
[] - Deve ser possivel listar todos os carros disponíveis pelo nome do carro.


**RNF**
**RN**
[] - O usuario não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**RF**
[] - Deve ser possível cadastrar uma espicificação para um carro.
[] - Deve ser possível listar todas as especificações.
[] - Deve ser possível listar todas os carros.

**RN**
[] - Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
[] - Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
[] - O usuário responsável pelo cadastro deve ser um usuári administrador.

# Cadastro de imagens do carro
**RF**
[] - Deve ser possível cadastrar a imagem do carro.
[] - Deve ser possível listar todas os carros.

**RNF**
[] - Utilizar o multer para upload dos arquivos.

**RN**
[] - Deve ser possível cadatrar mais de uma imagem para o mesmo carro.
[] - O usuário responsável pelo cadastro deve ser um usuári administrador.

# Agendamento de aluguel
**RF**
[] - Deve ser possível cadastrar um aluguel

**RN**
[] - O aluguel deve ter duração mínima de 24 horas.
[] - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
[] - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
