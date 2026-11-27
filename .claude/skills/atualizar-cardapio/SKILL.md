---
name: atualizar-cardapio
description: Atualizar preços, produtos, categorias, fotos ou contatos do site Viñas Café. Use quando pedirem para mudar o cardápio, trocar uma foto ilustrativa por oficial, adicionar/remover item ou alterar telefone/horário.
---

# Atualizar o cardápio do Viñas Café

Leia `PROJECT_CONTEXT.md` antes. Altere **somente** os arquivos de dados — os componentes se adaptam sozinhos.

## Preço / descrição / disponibilidade
Edite a linha do produto em `src/data/products.ts` (`price`, `description`, `ingredients`, `available: false`).

## Novo produto
Adicione um objeto em `src/data/products.ts`:
- `id`: `"VC-<número>"` único (use o ID do aiqfome quando houver; senão `VC-L001`, `VC-L002`…)
- `slug`: minúsculas, sem acento, com hífens, único (vira a URL `/cardapio/<slug>`)
- `category`: um `CategoryId` de `src/data/types.ts`
Nova categoria → adicione o id em `types.ts` e a cena em `categories.ts` (paleta, partículas, layout, glyph).

## Foto oficial
1. Converter para WebP ~1200px: `python3 -c "from PIL import Image; im=Image.open('in.jpg').convert('RGB'); im.thumbnail((1400,1400)); im.save('public/img/oficial/<nome>.webp', quality=80)"`
2. Registrar em `src/data/images.ts` com `of('<nome>.webp', '<alt descritivo>')` e chave `of-<nome>`.
3. Apontar `image: 'of-<nome>'` no produto.
Nunca marque como `oficial` uma imagem que não seja do Viñas Café.

## Contatos / horário
`src/data/contact.ts` (e o JSON-LD em `index.html`).

## Verificar
`npx tsc -b && npx eslint . && npm run build` — o prerender deve listar o novo total de páginas.
