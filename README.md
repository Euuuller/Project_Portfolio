# Portfólio de Ciência de Dados - Template

Bem-vindo ao seu novo template de portfólio! Este projeto foi criado para ser uma base limpa, moderna e fácil de customizar para exibir seus projetos de Ciência de Dados. Ele usa apenas HTML, CSS e JavaScript puros, sem a necessidade de Node.js ou qualquer outra dependência complexa.

**[➡️ Veja a demonstração ao vivo](URL_DO_SEU_SITE_AQUI)** <-- _Substitua este link após o deploy!_

![Pré-visualização do Portfólio](assets/images/Preview/1_Image.jpg)
_Esta é uma imagem de exemplo, você pode substituí-la por um print do seu próprio site._

---

## ✨ Passo a Passo para Customização

Siga estes passos para transformar este template no seu portfólio pessoal.

### 1. Informações Pessoais
- **Abra o arquivo `index.html`**.
- **Altere seu nome:** Procure pela linha `<span class="text-primary">Euller dos Santos Rodrigues Duarte</span>` e substitua pelo seu nome.
- **Altere a descrição:** Edite os parágrafos na seção "Sobre Mim" (`<section id="about" ...>`).
- **Atualize os links de contato:** Na seção "Entre em Contato" (`<section id="contact" ...>`), substitua os links de e-mail, telefone, LinkedIn, GitHub, etc., pelos seus.
- **Troque a foto de perfil:** Substitua o arquivo `assets/images/perfil/1_Image.jpg` pela sua foto. Tente manter as dimensões para um melhor ajuste.

### 2. Adicionar Seus Projetos
A seção de projetos é a mais importante. Para adicionar um novo projeto:
- **Vá para a seção de projetos:** Encontre a `<section id="projects" ...>`.
- **Copie a estrutura de um projeto:** Copie todo o bloco de um `<article class="project-card" ...>...</article>`.
- **Cole e edite:**
    - **Imagem do projeto:** Adicione a imagem do seu novo projeto na pasta `assets/images/Preview/` e atualize o caminho no `<img>`.
    - **Título e Descrição:** Altere o título (`<h3 class="project-title">`) e a descrição curta.
    - **Links:** Atualize os links do GitHub e da demonstração ao vivo do projeto.
    - **Tecnologias:** Adicione ou remova ícones de tecnologias na `div` com a classe `tech-icons`. Você pode encontrar mais ícones em [Devicon](https://devicons.github.io/devicon/).

### 3. Atualizar Habilidades
- **Vá para a seção de Habilidades:** Encontre a `<section id="skills" ...>`.
- **Edite as abas:** Você pode adicionar, remover ou editar os itens (`<div class="skill-item">`) em cada aba para refletir as ferramentas e tecnologias que você domina.

### 4. Fazer o Deploy no GitHub Pages
Depois de personalizar seu portfólio, siga estes passos para publicá-lo online de graça:
1. **Crie um repositório no GitHub** e envie seus arquivos.
2. No seu repositório, vá para **Settings > Pages**.
3. Na seção "Build and deployment", em "Source", selecione **"Deploy from a branch"**.
4. Escolha a branch (`main` ou `master`), a pasta (`/root`) e clique em **Save**.
5. **Aguarde alguns minutos** e seu site estará no ar! Não se esqueça de atualizar o link da "demonstração ao vivo" no topo deste README.

---

## 🚀 Tecnologias Utilizadas
- **HTML5:** Estrutura semântica e acessível.
- **CSS3:** Estilização moderna, design responsivo e tema claro/escuro.
- **JavaScript (Puro):** Interatividade, animações e lógica do site.

Este projeto é um ponto de partida. Sinta-se à vontade para explorar, modificar e levar seu portfólio para o próximo nível!
