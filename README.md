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