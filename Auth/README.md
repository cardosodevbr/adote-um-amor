# Auth — Login e Cadastro

Tela de login e cadastro do projeto **Adote com Amor**, usando o Supabase Auth
para autenticação de usuários.

## Arquivos

| Arquivo               | Descrição                                                                 |
|------------------------|---------------------------------------------------------------------------|
| `Auth.html`            | Telas de login e cadastro                                                 |
| `Auth.css`             | Estilo da tela                                                     |
| `Auth.js`              | Codigo da troca de telas, conexão com o Supabase, login e cadastro com SingUp e SingInwith         |
| `config.js`            | URL e chave do projeto Supabase (**não enviar pro github / git**)                  |
| `config.example.js`    | Modelo do `config.js`, para caso for clonar                   |

## Como rodar

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Em **Project Settings > API Keys**, copie a **Publishable key** e a **API URL**
3. Copie `config.example.js` para `config.js` e preencha com suas chaves:

```js
const SUPABASE_URL = "url-aqui";
const SUPABASE_KEY = "publishable-key-aqui";
```

4. Abra `Auth.html` no navegador (abrir com extension, já que os `<script src="...">` precisam ser servidos via `http`,
   não abertos direto como arquivo)

## O que já funciona

- troca entre as telas de login e cadastro, sem recarregar o site
- Cadastro de usuário via `supabaseClient.auth.signUp()`
- Verificação de senha e confirmação de senha antes de enviar ao Supabase
- Login via `supabaseClient.auth.signInWithPassword()`
- Usuários criados podem ser conferidos no painel do Supabase, em
  **Authentication > Users**

## passos seguintes

- [ ] Mostrar mensagens de erro/sucesso na tela (usando as divs `message-login`
      e `message-cadastro`)
- [ ] Salvar o nome do usuário no cadastro (via `options.data` do `signUp`)
- [ ] Colocar login com Google (`signInWithOAuth`)
- [ ] Redirecionar o usuário após login bem-sucedido
- [ ] Criar a tabela de pets no banco e configurar RLS

## Notas de segurança

- A **Publishable key** é segura para expor no frontend — o controle de acesso
  real é feito pelas políticas de **Row Level Security (RLS)** configuradas no
  banco, não pelo sigilo dessa chave
- A **Secret key** do Supabase **nunca** deve ser usada neste projeto, sendo exclusiva pra back-end
- `config.js` está no `.gitignore` da raiz do projeto e não deve ser commitado