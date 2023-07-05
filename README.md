# <a href='https://app.cluey.pt'>Cluey-Web</a>
Cluey App for Web

<<<<<<< HEAD
### Future Features
- Add responsive to all components on left menu.

=======
>>>>>>> 7bdd9a2def7945d866a4dff43fb04c3b07c0eb6a
### New Router DOM
- [x] Screen
  - [x] Home
    - [x] Loading
<<<<<<< HEAD
  - [x] Auth *working*
=======
  - [ ] Auth *working*
>>>>>>> 7bdd9a2def7945d866a4dff43fb04c3b07c0eb6a

### Web App
- [x] api
  - [x] country-picker *function* *component* *@*
  - [x] firebase *function* *context* *@*
    - [x] config *function*
  - [x] openai *function* // voice text *working*
  - [x] providers *function* *working*
  
- [ ] components // structure *working* *@*
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
    - [x] Hearder // Disabled! *working*
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
      - [x] Info 
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

- [ ] Auth *@*
  - [ ] Login
  - [ ] Register
  - [ ] Forgot Password
  - [ ] Confirm Email

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


### Known Issues
- Chats auto go back navigation after update data
- Need click 2x to sign in/sign up

### Future Directs Chats Features
- When offline status, don't loading news chats
- When away status, don't mark as received on friend chat but loading news chats
- When busy status, don't mark as read on friend chat but loading news chats
- When online status, mark as received on friend chat and loading news chats
- When open chat, mark as read on friend chat
- When marked as not read, marl as not read on friend chat and mark read on user chat with diferent icon or color
  

> #### Install
> git clone https://github.com/ClueyAi/Cluey-Web.git
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
