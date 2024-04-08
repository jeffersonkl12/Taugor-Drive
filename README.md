# Projeto Taugor Drive

## Descrição

O Projeto Taugor Drive é um desafio de desenvolvimento React Native focado no gerenciamento de uploads de arquivos. O objetivo é criar um aplicativo que permita aos usuários fazer login usando Firebase, com opção de autenticação pelo Google. O aplicativo também deve fornecer funcionalidades de recuperação de senha, além de permitir o cadastro e login de usuários.

O foco principal do aplicativo é permitir o cadastro de arquivos e pastas, com a capacidade de listar os últimos 50 arquivos e rolar para exibir mais. Os usuários podem preencher informações básicas para cada arquivo, como título, e o sistema calculará o tamanho do arquivo, limitando o upload a 1 GB. Haverá também um recurso de pesquisa por título de arquivo e extensão.

## Tarefas

### 1. Configuração Inicial

Configure um ambiente de desenvolvimento React Native em seu computador, seguindo as instruções na documentação oficial do React Native.

### 2. Criação de um Novo Projeto

Crie as telas padrões de login, recuperação de senha e registro, utilizando autenticação Firebase com login pelo Google.

### 3. Estrutura do Projeto

Crie a estrutura básica de pastas no projeto, incluindo "components", "screens" e "assets".

### 4. Configuração de Navegação

Configure a navegação no aplicativo utilizando o React Navigation. Crie uma pilha de navegação com duas telas: "Home" e "Upload".

### 5. Criação da Tela Inicial (Home)

Crie uma tela "HomeScreen" com um texto de boas-vindas e um botão para navegar para a tela de upload.

### 6. Criação da Tela de Upload

Crie uma tela "UploadScreen" que permita ao usuário selecionar e exibir informações sobre um arquivo para upload.

### 7. Integração com API de Gerenciamento de Arquivos

Integre uma API de gerenciamento de arquivos (fictícia ou real) para enviar e buscar arquivos. Certifique-se de que a tela de upload possa enviar com sucesso um arquivo selecionado para a API.

### 8. Implementação da Pesquisa por Título

Adicione a capacidade de buscar arquivos por título na tela "HomeScreen", permitindo que o usuário insira um título e veja os resultados correspondentes.

### 9. Exibição de Detalhes de Arquivos

Na tela de resultados da pesquisa, permita que o usuário clique em um arquivo para ver seus detalhes, como nome, tamanho e data de upload.

### 10. Geração de APK para Teste

Siga as instruções na documentação do React Native para gerar um APK assinado do aplicativo para testar em dispositivos Android.

### 11. Teste do Aplicativo
