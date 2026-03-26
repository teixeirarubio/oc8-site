# OC8 Finance — Blog / Backoffice

## Como publicar um novo post

### Via CMS (oc8.com.br/admin)
1. Faça login com seu email (precisa de convite via Netlify Identity)
2. Clique em "Posts do Blog" > "New Post"
3. Preencha todos os campos incluindo a solução relacionada
4. Clique em "Publish" ou "Save Draft"

### O que acontece após publicar no CMS
- O Markdown é salvo em `admin/posts/seu-post.md` no repositório Git
- **O arquivo HTML público NÃO é gerado automaticamente**
- Para o post aparecer no site público, é necessário:
  1. O Claude gera o `post-seu-slug.html` a partir do Markdown
  2. Atualizar `conteudo.html` com o novo card
  3. Republicar o site no Netlify

### Fluxo atual (simples)
1. Escrever o texto do post
2. Enviar para o Claude com: título, categoria, data, autor e solução relacionada
3. Claude gera o HTML e entrega o ZIP atualizado
4. Arrastar o ZIP no Netlify → publicado

### Para automatizar no futuro
- Configurar um build hook no Netlify com um gerador estático (11ty ou Hugo)
- O CMS faz commit → Netlify roda o build → post publicado automaticamente
- Isso exige migração do projeto para um SSG (Static Site Generator)

## Campos disponíveis no CMS
- título, slug, descrição, categoria, data
- imagem de capa, alt da imagem
- autor, cargo, LinkedIn, foto do autor
- tempo de leitura
- solução relacionada + label do botão
- destaque, publicado
- conteúdo (Markdown com suporte a imagens)
