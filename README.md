
# Desafio QA Saucedemo

Neste repositório você encontra cenários de testes automatizados do site [Sauce Demo](https://www.saucedemo.com/v1/) com o padrão de design Page Objects (POM)

Os seguintes casos foram automatizados:

- **Login**: login com credenciais válidas e inválidas
- **Visualização de Produtos**: visualização de produtos de acordo com o filtro utilizado
- **Adicionar ao Carrinho**: adição de produtos no carrinho
- **Remover do Carrinho**: remoção de produtos do carrinho
- **Finalizar Compra**: fluxo completo de compra
## Melhorias

- Adicionado configuração CI/CD para rodar os testes em pipeline com o Git Hub Actions


## Pré-Requisitos

Node v20.15.1

NPM v10.8.2

Cypress v13.14.2
## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/Quagliato98/saucedemo.git
```

Entre no diretório do projeto

```bash
  cd saucedemo/
```

Instale as dependências

```bash
  npm install
```


## Rodando os testes

Para rodar os testes em modo de interface gráfica, rode o seguinte comando

```bash
  npx cypress open
```

Para rodar os testes em modo headless, rode o seguinte comando

```bash
  npx cypress run
```
