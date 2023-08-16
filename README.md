# <a href='https://app.cluey.pt'>Cluey-Web</a>
Cluey App for Web

### Future Features
- Add responsive to all components on left menu.
- Add New Cluey chat button and function.
- When no chat selected, show footer input to tapy message and create a new chat, to default chat with cluey bot, but can change target message changed a person or group.

### Known Issues
- Need click 2x to sign in/sign up

### Future Directs Chats Features
- When offline status, don't loading news chats received
- When away status, don't mark as received on friend chat but loading news chats
- When busy status, don't mark as read on friend chat but loading news chats
- When online status, mark as received on friend chat and loading news chats
- When open chat, mark as read on friend chat
- When marked as not read, marl as not read on friend chat and mark read on user chat with diferent icon or color

### Web App
- [x] api
  - [x] country-picker *function* *component* *@*
  - [x] firebase *function* *context* *@*
    - [x] config *function*
  - [x] openai *function* // voice text *working*
  - [x] providers *function* *working*
  
- [x] components // structure *working* *@*
  - [x] global *component* *deprecied*
  - [x] locale *function* *context* 
    - [x] portugues *json* *working* 
    - [x] spanish *json* *working* *translating* 
    - [x] french *json* *working* *translating*
    - [x] english *json* *working* *translating*
  - [x] theme *function* 
    - [x] light *pallet*
    - [x] dark *pallet* *working*
  - [x] tools *function* *deprecied*

- [x] Home *@*
  - [x] Loading *index* 
  - [x] Chat *@*
    - [x] Hearder *working*
      - [x] Count
    - [x] Content
      - [X] Presets
        - [x] Suggests *working* 
      - [x] Plans 
        - [x] Free
        - [x] Info
        - [x] Personal
        - [x] Pro
      - [X] Messages 
        - [x] Message
          - [x] Response
          - [x] Request
    - [X] Footer 
      - [x] Info *working*
      - [x] Input
      - [x] Actions *working*
        - [X] Search *working* 
        - [X] Tools *working* 
  - [x] "Menu" *@*
    - [x] Hearder // Responsive *working* *@*
    - [x] Content *@*
      - [x] Chats *@*
        - [X] Item 
      - [x] Contacts *@*
        - [x] Direct 
          - [X] Item 
        - [x] People 
          - [x] Person 
          - [x] Search 
        - [x] Directs 
          - [x] Item 
      - [X] Node *working*
      - [X] Tasks *working*
      - [X] Auto *working*
      - [X] Settings // Theme *working* // Language // Logout // About *working* *@*
      - [X] User *@*
        - [X] Email *working* 
        - [X] Password *working* 
        - [X] Preferences 
        - [X] Profile 

- [x] Auth *@*
  - [x] Login
  - [x] Register
  - [x] Forgot Password
  - [x] Confirm Email

- [x] Utils
  - [ ] About
  - [x] components *components* *working*
  - [ ] Rules 
  - [x] Working *@*

- [x] components *components* *@*
  - [x] AlertBox *components*
  - [x] Language *components*
  - [x] PatchNotes *components*
  - [x] Preferences *components*
  - [x] ThemeSwitch *components* 

- [x] functions *functions* *@*
  - [x] hover *functions*
  - [x] navigate *functions*
  - [x] patchnote *functions*

> #### Install
> <code>git clone https://github.com/ClueyAi/Cluey-Web.git</code>
> 
> <code>cd Cluey-Web</code>
> 
> <code>yarn install</code> / <code>npm install</code>
> 
> <code>yarn start</code> / <code>npm start</code>

> #### Build
> <code>yarn build</code>

> #### Deploy
> <code>yarn prod</code>


# COMO EU FARIA:

## 1. Sistema de Read Mark

Adicionaria um registro na base de dados, dentro de cada usuario, para verificar se eles estão logados. Se SIM: (Verrificaria se o status do usuario é online, se SIM: Marcaria como recebido [unico V azul], se NÃO: Marcaria como não recebido [unico V cinza].) Se NÃO: Marcaria como não recebido [unico V cinza].

Adicionaria um registro de abertura do chat, para comparar a data da ultima abertura, com a data, da ultima mensagem, e marcar como lida, as mensagens anteriores a ultima abertura. Caso o usuario estiver com status, offline, away ou busy, não marcaria como lida, mas sim como recebido. Porem também não poderia ver o status de leitura das mensagens enviadas, em quanto estiver nesses status.

Exige uma logica complexa, para funcionar corretamente, por isso essa funcionalidade, foi adiada para uma versão futura.

## 2. Sistema de Notificações

Atualmente já existe um registro de status dos botões on/off do sistema de notificações, registrando o valor na base de dados. Apenas precisaria criar uma função para alternar de acordo com o valor do registro. Utilizando biblioteca nativas de cada plataforma, para ter acesso as notificações, e no caso de uma nova instalação, e o valor do registro for on, verificar isso no loading e pedir os acessos necessarios ao recurso. Caso seja off, só pedir acesso, quando utilizar o botão para mudar o valor para on.

Não é uma funcionalidade exencial para essa fase do projeto, por isso, foi adiada para uma versão futura.

## 3. Sistema de Resposta em Streaming

Atualmente a resposta da IA, é registrada na base de dados, para depois ser exibida... Para esse sistema funcionar, seria necessario exibir a mensagem em tempo real, com uma funcionalidade nativa da API OpenAI, para exibir a resposta em streaming, e não apenas quando a IA terminar de responder. Mas quando a resposta for finalizada, ai sim, registrar na base de dados, e depois substituir a mensagem em tempo real, pela mensagem registrada na base de dados.

Porem para isso, existe uma complexidade, de tratamento da mensagem em streaming, por isso essa funcionalidade, foi adiada para uma versão futura.

## 5. Sistema de Contabilidade de Creditos

Atualmente está funcionando de forma simbolica, fazendo uma adição padrão de 10000 creditos de interação, para qualquer utilizador no ato do registro, e depois fazendo uma subtração de 1 credito, para cada interação. Para esse sistema funcionar, como deveria, precisaria de um sistema preciso de contabilidade, para garantir que nenhum erro aconteça, já que os creditos teram um valor real, e não pode existe falhas, que gerarão situações de injustiça, ou alterações manuais.

Porem para isso, existe uma complexidade, de tratamento da mensagem em streaming, por isso essa funcionalidade, foi adiada para uma versão futura.

## 6. Sistema de Administração do Sistema

Atualmente, feito manualmente na base de dados, existem valores, salvos em variaveis, que são interpretados pelo sistema, para executar funções externas aos utilizadores, que seram acessadas pelos administradores do sistema, com diferentes niveis.

Neste momento, essas funcionalidade estão disponiveis para os administradores:
#### Funções
- forceLogoutAll(bool) // Forçar logout de todos os utilizadores, para casos extremos, de mudanças no sistema ou base de dados.

#### Informações
- displayName(string) // Cluey
- photoURL(string) // Foto que será exibida no perfil da AI Cluey
- uid(string) // ID unico, aleatoriamente gerado para o perfil da AI Cluey
- userName(string) // Nome de usuario, que será exibido no perfil da AI Cluey

#### Status
- server(bool) // Status da AI Cluey, para saber se ela está online ou offline
- newUpdate(bool) // Status de atualização, para saber se existe uma nova atualização disponivel

#### Patch Notes
- documentos comm informações sobre as atualizações do sistema, em array, para ser listado para os utilizadores, quando tem uma nova atualização disponivel, com id unicopara cada atualização. Assim marcando baseado no ID, como lido, para que o usuario não volte a receber a mesma atualização, e também para que o usuario possa ver as atualizações anteriores, caso queira.

Todos essas funcionalidades, seriá administradar por outra aplicação, que acessa a mesma base de dados, para fazer as alterações necessarias, assim como fazer a contabilidade e administração dos creditos, e oferecer suporte aos utilizadores.

Porem para isso, esse nivel de gestão, com uma interface totalmente dedicada a utilizadores administradores, foi adiada para uma versão futura. Por motivos obvios.
