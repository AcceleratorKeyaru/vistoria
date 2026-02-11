# Vistoria Remota (GitHub Pages) — com Dashboard protegido

## Como usar
1) Publique esta pasta no GitHub Pages.
2) Abra `login.html` e entre no Dashboard.
3) Gere uma sala.
4) **Atendente abre primeiro** o link do Atendente.
5) Envie o link do Associado.

## Trocar login/senha
Edite `auth.js`:
- `user` e o valor de `hash` (sha256 de "user:senha").
Por padrão:
- user: admin
- senha: mudar123

> Observação: em GitHub Pages a proteção é no navegador. Isso bloqueia uso casual (associados/curiosos),
mas não é segurança “bancária”. Se você quiser segurança forte, precisa back-end (Cloudflare Access, etc.).

## Créditos
Plataforma desenvolvida por Pedro Vinícius Moraes Alves
