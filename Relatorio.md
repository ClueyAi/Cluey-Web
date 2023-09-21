Desenvolvimento
O desenvolvimento front-end, foi feito em javascript, por ser um linguagem orientada a objeto, e com maior versatilidade e portabilidade, de plataformas. Utilizando a framework ReactJS, mais precisamente o react-native, que utiliza funções nativas da plataforma que está sendo executado, porem utilizando a syntax padrão do javascript ES6.
Também foi utilizado uma plataforma de controle baseada em NodeJS, chama expo, para facilitar o reaproveitamento de codigo ao maximo, permitindo que o mesmo projeto, seja compilado para o codigo nativo de cada plataforma, em tempo real, facilitando o processo de desenvolvimento e teste do projeto.
No entanto, optamos por fazer a separação do projeto, em sua versão Web, que futuramente, sera compilado também, para um programa nativo, em plataformas desktop, com o compilador ElectronJS, o projeto Mobile, que é desenvolvido e compilado simultaneamente nas plataformas Android e IOS, permitindo a criação de uma app nativa para cada plataforma, utilizando o mesmo codigo e tudo em um unico projeto.
Para o back-end, foi utilizado o firebase, do Google, por possuir um vasta gama de ferramentas back-end e serviços em cloud, para facilitar o desenvolvimento inicial. Como por exemplo as funções de autenticações, que trata de forma segura e criptografada, evitando a complexidade de lidar com o armazenamento de informações de autenticação e detalhes da conta de cada utilizador, utilizando esse sistema apenas como validação e geração de dados seguros para os utilizadores, mas que posteriormente registra esses dados em outra ferramenta, chamada firestore, que é utilizada como base de dados NoSQL em cloud, utilizando um sistema de objetos, e a syntax em JSON, para fazer o registo seguro de todos os dados dos utilizadores e da aplicação.
O uso do firebase, permitiu também o armazenamento de dados em cloud, utilizando a ferramenta storage, assim podendo armazenar qualquer tipo de midia digital, e facilitando a sincronização entro o caminho dessas midias no cloud e o registo na base de dados.
Para o hosting da aplicação, seria necessario um sistema de hosting, que executasse um terminal node, para rodar de forma nativa a aplicação, evitando que precise recompilar e upar para o hosting todas as alterações e compilações feitas.

Dito isso, temos toda a base do nosso projeto pronta, e o codigo desses projetos será armazenado e gerenciado com o versionador git, utilizando a plataforma github, separando os projetos em Cluey-Web, Cluey-Mobile, Cluey-Desktop, Cluey-Ext (Extensão de navegadores) e o principal Cluey-Core, este ultimo é responsavel por toda parte do codigo, que será independente das versões adaptadas e diferentes tipos de plataformas e telas, utilizando o sistema de link simbolico do github, podemos referenciar o repositorio Core, como uma biblioteca dentro de cada um dos demais projetos, fazendo com que, ao executar um ‘git clone’ de um dos projetos, o core, sejá incluido na versão local da biblioteca, e permitindo a sincronia estantanea das alterações, entre as plataformas.
Estrutura do Código
NodeJS
Seguindo a estrutura padrão de projetos NodeJS, o codigo, utiliza a syntax mais recente do javascript, a ES 6 (EcmaScript 6), podemos construir um codigo mais limpo e logivel, com as novas formas de declaração de variaveis e funções como objetos, podendo importar e exportar cada um desses objetos de forma facil e eficiente, evitando lentidoes de carregamento, ou repetição de linhas de codigos, reduzindo em mais ou menos 60% do tamanho total do projeto, sem perder sua complexidade logica e performance.

Para alem disso, permitindo a criação de scripts nativos em node, para facilitar a gestão e manutenção do projeto, poupando tempo e facilitando o trabalho em equipe. 

Com a utilização da biblioteca node eslint, e o auxilio da extensão da mesma para a ferramenta de desenvolvimento VSCode, foi possivel garantir a syntax correta do codigo, não só evitando erros, como também matando o codigo limpo e organizado.

Expo
Essa plataforma, permite que o desenvolvedor possa executar e testar o codigo em nuvem, em tempo real, independente da plataforma, sejá utilizando dispositivos fisicos ou emulados, não é preciso fazer a instalação da versão compilada da app para poder ver e testar as alterações em tempo real, assim como possibilitando uma forma simples de configurar a indentidade do projeto, sendo responsavel pela geração e gestão do manifesto da aplicação, adaptando para cada plataforma.
Também utilizado para gerenciar os dados sensiveis, como codigos de APIs, IDs de serviços e entre outras variaveis sensiveis, que não podem ficar acessiveis ao utilizador. Utilizando o sistema dotenv para compactar e fornecer em variaveis globais esses dados para toda aplicação. Mas mantendo apenas no projeto, não enviando essas informações explicitamentes para o projeto compilado.

React Router / React Navigation
A biblioteca React-Router-Dom foi utilizada para fazer o tratamento de rotas da aplicação web, gerando um sistema de rota em path, similar ao que é feito em php, garantindo a segurança das rotas, que só podem ser acessadas por utilizadores autenticados.
Já a biblioteca React Navigation, faz um função similar, porem utilizados para as aplicações não web, utilizando um sistema de navegação de screens, criando stacks para impedir a rederização de telas sensiveis a utilizadores não autorizados, e garantindo um sistema de rota global, podendo levar o utilizador de uma rata a outra, sem a necessidade de referencia um path, apenas passando uma id de referencia predefinido para cada tela.
Encadeamento
O sistema de encadeamento do codigo, foi completamente pensado para ser entendido por qualquer desenvolvedor que comprenda a syntax do projeto, fazendo com que a organização do codigo seja atemporal, assim mesmo que novos membros sejam adicionados a equipa de desenvolvimento, o padrão será entendido e seguido facilmente, desde a arquitetura dos diretorios, até a posição de cada techo do codigo.
Começando pelo diretorio de assets, onde contem todos os ficheiros, que não são folhas de codigos, para serem carregados rapidamente de forma local do codigo, evitando falhas com ficheiros em cloud, aqui está todos os arquivos essenciais, como lotties, imagens, fontes e entre outros… que são essenciais e não sofreram alterações constantes, apenas alterados em grandes atualizações, que necessitaram de recompilação do projeto.

Já o diretorio src, é o ponto central do projeto, onde todo o codigo será desenvolvido, e nele tem três diretorios principais: api, components e Screens. Utilizando um sistema de index, evitando criar ficheiros com nomes em case sensitive e podendo gerar futuros problemas de ferefenciamento no restante do codigo, assim cada ficheiro referente a um componente expecifico, é definido em um ficheiro com um index.js, que é carregado por padrão, apenas referenciando o ficheiro pai, e isso será um padrão para todo projeto.
Começando pelo diretorio api, aqui é onde ficara dos as apis do projeto, sejam elas externas, desenvolvidas por terceiro, ou interna desenvolvidas pela equipe do projeto. 

Na versão atual, estamos utilizando a api principal, já referenciada, firebase, e possui duas partes principais, o ficheiro index.js principal, e um diretorio de configurações, que também possui um index; a api OpenAi, responsável pelas funções de IA, principalmente, com um unico ficheiro index.js; providers, que é a api responsavel pela logica de autenticação com outras apis, como google, facebook, github… porem não está completamente implementada; uma api desenvolvida internamente, nomeada de country-picker, possuindo alem do index.js um ficheiro styles.js, por se tratar de uma api, toda logica e frmatação tem que está junta, para utilizar em outros projetos, e por ultimo, mas não menos importante, na verdade a mais importante, e também desenvolvida internamente, a api nomeada 3gs-icons, que é uma biblioteca de icones em svg, que podem ser importados como uma biblioteca de icones, mas por ser internamente desenvolvida, pode ser utilizados em todos os projetos e completamentes personalizaveis, assim como, totalmente padronizados.

Indo para o diretorio de componentes, aqui ficara os ficheiros com dados, formatações e logicas principais do projeto, utilizados em diversas partes do codigo. Esse não contem um index como base, sendo apenas um simples diretorio para organizar os components, locale, responsavel pela gestão de idiomas de todo fronte-end da aplicação em todas as plataformas, contendo um ficheiro index, onde é feita a logica de seleção do ficheiro de locale, e os ficheiros em json, referente a cada idioma, onde é aramazenado cada texto que será exibido, garantindo uma tradução completamente controlavel e não auto gerada; theme, esse responsavel por todos os codigos de cores, que seram utilizados no projeto, possuindo um index, para fazer a troca entre os ficheiros de cor, e possuindo atualmente um ficheiro de cores, dark.js, light.js e shadow.js, uma sombra global e padronizada.

Agora no diretorio Screens, onde encontra-se a maior parte de todos codigo, como o nome já sugere, responsavel por toda formatação e logica visual da aplicação. 

5.5.1 Home
Possui um index.js que é responsavel pelo carregamento e verificação da tela inicial, essa é a primeira tela carregada, e ela que decide qual rota será feita de acordo com o status de autenticação do utilizador, dentro dela, temos a seguinte estrutura:
Chat: sendo essa a tela principal, onde não só o chat aberto será exibido, como também, todo conteudo principal da aplicação, quando o utilizador estiver autenticado.
Content: Aqui é onde será exibido os conteutos propriamente ditos.
Messages: esse diretorio é responsavel pela conversa exibida, quando um chat estiver aberto.
Message: referente aos balões flutuantes de mensagens.
Request: o balão com as informações e mensagens, enviada pelo utilizador.
Response: o balão com as informações e mensagens, recebidas pela IA ou outros utilizadores.
Plans: Uma tela principal para quando nenhuma conversa estiver aberta, exibindo informações de planos disponiveis (não exibida atualmente)
Info: informações gerais dessa tela.
Free: componente referente as informações desse plano.
Personal: componente referente as informações desse plano.
Pro: componente referente as informações desse plano.
Presets: Essa componente, é o componente atualmente ativo, que exibe sugestões de perguntas, que ao carregar em uma delas, já inicia um novo chat com IA, com a pergunta sugerida no mesmo.
Item: cada item que será rederizado em uma lista estilizada
Footer: Responsavel por toda parte, principal, inferior da tela home, que não muda, mas se adapta a dapender do conteudo exibido.
Info: localizado no canto esquerdo, exibe as informações do utilizador com quem está conversando, caso não haja chat aberto, possibilita selecionar a IA ou um amigo, para inciar uma nova conversa.
Input: o campo principal, centralizado, de digitação que possui uma logica completamente adptativa, de acordo com o conteudo rederizadom trata o texto inserido nele devidamente, sem a necessidade de um input para cada tela, assim como alguns botões de envio de audio e ficheiros para a conversa.
Actions: encontra-se a direita, e é exibido apenas quando tem um chat está aberto, exibindo botões de ações.
Search: um, botão que ao ser acionado tranforma toda parte de actions em um input, onde será digitado uma ou mais palavras, para ser encontrada na conversa.
Tools: um menu amburguer lateral referente as ações da conversa, como apagar mensagem selecionada, apagar conversa, entre outros…
Header: A parte, principal, superior do home, onde é exibido informações importantes, adaptando a cada tipo de tela exibida.
Back: um botão posicionado a esquerda, para que seja possivel fechar a conversa e retornar a tela principal.
Count: Componente localizado a direita, onde exibe em tempo real o contador de creditos do utilizador.
Menu: Menu geral de navegação da aplicação, localizado a esquerda, que vai da parte superior até a inferior, cobrindo a tela verticalmente, referente a tela home, adaptado para ter responsividade, quando o menu lateral ocupar muito espaço da tela.
Content: Referente as informações exibidas no corpo desse menu lateral.
Contacts: onde será exibido as conversas com outros utilizadores e grupos de utilizadores.
Direct: as convesas em andamento, com utilizadores e grupos.
Item: o item que é exibido na lista de conversa, com as informações necessarias para indentificar a conversa.
People: tela de conteudo onde exibe a lista de contatos.
Search: input localizado na parte superior, que busca em tempo real utilizadores por email ou username.
Person: componente responsavel por exibir os contatos que seram listados.
Chats: os chates privados com a IA
Item: componente que define os blocos de chats que seram listados na tela.
User: Informações localizadas a esquerda, onde exibe nome e username do utilizador, e da acesso a um menu de personalização da conta e do utilizador.
Profile: responsavel por exibir e alterar foto e nome do utilizador.
Email: um botão que leva a um tela de alteração de email.
Password: um botão que leva a um tela de alteração de palavra-passe.
Preferences: Botão que exibe um balão flutuante, para configurar, termos que influencia as respostas da IA.
Focus: define a lista de termos que você tem foca, para que a IA possa melhorar as respostas.
FocInterestsus: define a lista de termos que você tem interesse, para que a IA possa melhorar as respostas.
Settings: Tela com lista de configurações gerais da aplicação, assim como botão de acesso a rota de account.
Header: navegação principal, diagonal, para alternar entre as tela do menu lateral
Nav: os itens personalizados de navegação do menu
Hamburguer: menu expansivel e retratil para telas menores, com navegação vertical.


5.5.1 Auth
Possui tambem um index, que faz a verificação de status de autenticação, para poder direcionar utilizadores já autenticados para o home, caso eles chegem a essa rota por algum motivo. E sua estrutura é a seguinte.
Contente: Onde é exibido todo o conteudo principal e interagivel para o processo de autenticação.
Login: tela principal, onde é feito o login de utilizadores já registrados.
Register: tela para fazer o registo de novos utilizadores.
Forgot: tela para fazer a solicitação de recuperação da conta.
Verify: tela que o utilizador é redirecionado, quando está autenticado, mas ainda não validou o email de confirmação
Footer: com um rodape global para todo Auth, que possui as mesma informações independente da tela.
News: banners, personalizados e armazenados na base de dados, para exibir indformações e apresentações da aplicações, que rotacionam aleatoriamente a cara refresh.

5.5.1 Account
Referente pela configuração mais precisa da conta do utilizador, como desativação ou eliminação por completa da conta, da nossa base de dados. Assim como configuração de planos e formas de pagamentos.
Content: Referente pelo conteudo principal exibido na tela
Account: secção de configurações da conta
Invoicing: secção de configuração de metodos de pagamentos
Plans: secção de gestão de planos
Notify: secção de gestão detalhada de notificações
Footer: rodape global, que possui um balão flutuante de ajuda.
Header: menu de navegação superior
Top: logo da app, e botões com links importantes, e detalhes da conta a direita.
Nav: navegação principal, entre as telas de conteúdos.
