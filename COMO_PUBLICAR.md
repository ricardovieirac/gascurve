# Como publicar o GasCurve

Tudo nesta pasta já está pronto. Você só precisa colocá-la na internet.

## Por que isso é obrigatório para o iPhone

Desde o iOS 18 o Safari **não abre mais arquivo HTML local**, e o visualizador do app Arquivos até mostra a página, mas **não executa JavaScript** — por isso o simulador apareceu morto. Não é defeito do arquivo, é restrição do sistema. Servido por HTTPS, funciona normalmente. No Android e no computador o arquivo único continua abrindo direto.

## Caminho rápido — Netlify Drop (uns 2 minutos, sem conta)

1. Abra `app.netlify.com/drop` no computador.
2. Arraste **esta pasta `site` inteira** para a área indicada.
3. Ele devolve uma URL do tipo `https://algum-nome-aleatorio.netlify.app`. Pronto, já funciona no iPhone.
4. Se criar conta (grátis), dá para renomear para algo como `gascurve.netlify.app` e o endereço fica estável.

Bom para: testar com residentes esta semana.

## Caminho durável — GitHub Pages

1. Crie um repositório **público** chamado `gascurve`.
2. Suba os arquivos desta pasta na **raiz** do repositório (não dentro de uma subpasta).
3. Settings → Pages → Source: **Deploy from a branch** → branch `main`, pasta `/ (root)` → Save.
4. Em um ou dois minutos sai em `https://SEU-USUARIO.github.io/gascurve/`.

Bom para: uso permanente. O código fica versionado e público, o que importa se o simulador virar material citável.

> Os caminhos do `manifest.json` são relativos (`./`), então funciona tanto na raiz de um domínio quanto numa subpasta como `/gascurve/`. Não precisa mexer em nada.

## Instalar no iPhone como app

Abra a URL no **Safari** (tem que ser o Safari, não o Chrome), toque no botão de compartilhar e escolha **Adicionar à Tela de Início**. O ícone entra junto com os outros aplicativos e abre em tela cheia, sem barra de navegador. A partir daí funciona offline.

No Android é o mesmo caminho pelo Chrome: menu → Instalar aplicativo.

## Publicar uma versão nova depois

Substitua os arquivos e **mude a linha `const CACHE` no `sw.js`** — por exemplo de `gascurve-v3.7` para `gascurve-v3.8`. É essa linha que faz os aparelhos baixarem a versão nova; sem trocá-la, quem já instalou continua vendo a antiga, porque o service worker serve do cache.

## O que é cada arquivo

| Arquivo | Para que serve |
|---|---|
| `index.html` | O app. É o `gascurve.html`, com o manifest apontando para arquivo e o service worker registrado |
| `manifest.json` | Nome, ícones e cores — é o que torna o app instalável |
| `sw.js` | Service worker: guarda o app no aparelho para funcionar offline |
| `icon-180/192/512.png` | Ícones. O de 180 é o que o iPhone usa na tela de início |
| `icon-maskable-512.png` | Ícone com margem, para o Android recortar no formato dele |
| `_headers` | Só o Netlify lê. Evita que o navegador sirva uma versão velha |

**O `gascurve.html` da pasta de cima continua valendo** para mandar por e-mail e abrir offline no computador ou no Android. A versão publicada precisa ser em três arquivos porque **service worker não pode ser embutido** no HTML — tem que ser um `.js` de mesma origem. Era isso que impedia o app de ser um arquivo só e instalável ao mesmo tempo.
