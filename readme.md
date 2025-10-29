# � ForBianca - Uma Declaração de Amor

Site especial feito com muito carinho para a Bianca, mostrando que nosso encontro foi matematicamente impossível, mas o destino fez acontecer.

## 🚀 Deploy na Vercel

Este projeto está configurado para deploy automático na Vercel.

### Métodos de Deploy:

#### 1. Via GitHub (Recomendado - Deploy Automático):
```bash
# 1. Adicionar e commitar mudanças
git add .
git commit -m "Deploy na Vercel"
git push origin main

# 2. Conectar na Vercel
# - Acesse https://vercel.com
# - Clique em "Import Project"
# - Selecione o repositório "ForBianca"
# - Deploy automático!
```

#### 2. Via Vercel CLI:
```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

#### 3. Via Upload Direto:
- Acesse [Vercel Dashboard](https://vercel.com/dashboard)
- Clique em "Add New Project"
- Faça upload da pasta do projeto
- Deploy automático

## 🌐 Características

- ✅ **Design Responsivo**: Totalmente adaptável para mobile, tablet e desktop
- ✅ **Mobile-First**: Desenvolvido com foco em dispositivos móveis
- ✅ **PWA Ready**: Configurado como Progressive Web App (pode ser instalado)
- ✅ **Performance**: Otimizado para carregamento rápido
- ✅ **Touch Gestures**: Suporte a gestos de toque (swipe)
- ✅ **Animações Românticas**: Transições suaves e partículas flutuantes
- ✅ **Timeline de Fotos**: História do casal em linha do tempo interativa
- ✅ **Cálculo Matemático**: Apresentação mostrando a probabilidade impossível do encontro

## 🛠️ Tecnologias

- HTML5
- CSS3 (com variáveis CSS e Grid/Flexbox)
- JavaScript (Vanilla JS)
- PWA (Manifest.json)

## 📦 Estrutura do Projeto

```
Pratica/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
├── manifest.json       # Configuração PWA
└── readme.md          # Este arquivo
```

## 🎯 Como Usar

### Desenvolvimento Local

1. Clone o repositório ou baixe os arquivos
2. Abra o arquivo `index.html` em um navegador

**Opção 1: Usando Live Server (Recomendado)**

Se você usa VS Code, instale a extensão "Live Server" e clique com o botão direito em `index.html` > "Open with Live Server"

**Opção 2: Usando Python**

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Acesse: `http://localhost:8000`

**Opção 3: Usando Node.js**

```bash
# Instale o http-server globalmente
npm install -g http-server

# Execute no diretório do projeto
http-server
```

**Opção 4: Usando PHP**

```bash
php -S localhost:8000
```

### Testando em Dispositivo Mobile

1. Certifique-se de que seu computador e dispositivo móvel estão na mesma rede
2. Inicie um servidor local (veja opções acima)
3. No dispositivo móvel, acesse: `http://[SEU_IP]:8000`
   - Para descobrir seu IP no Mac: `ifconfig | grep "inet " | grep -v 127.0.0.1`
   - Para descobrir seu IP no Windows: `ipconfig`

## 🎨 Customização

### Cores

As cores podem ser alteradas no arquivo `styles.css` modificando as variáveis CSS:

```css
:root {
    --primary-color: #4F46E5;
    --primary-dark: #4338CA;
    --primary-light: #6366F1;
    /* ... outras variáveis */
}
```

### Layout

O layout é construído com CSS Grid e Flexbox. Você pode modificar:
- Grid de features em `.features-grid`
- Espaçamentos nas variáveis `--spacing-*`
- Breakpoints nos media queries

### Conteúdo

Edite o arquivo `index.html` para modificar:
- Textos e títulos
- Seções
- Links de navegação
- Formulários

## 📱 PWA (Progressive Web App)

O site está configurado como PWA e pode ser instalado em dispositivos móveis:

1. Acesse o site em um navegador mobile (Chrome/Safari)
2. O navegador oferecerá a opção de "Adicionar à tela inicial"
3. O app funcionará como um aplicativo nativo

### Requisitos para PWA

- [x] manifest.json configurado
- [x] HTTPS (para produção)
- [ ] Service Worker (próxima implementação)

## 🔧 Próximas Implementações

- [ ] Service Worker para funcionamento offline
- [ ] Cache de assets
- [ ] Notificações push
- [ ] Dark mode
- [ ] Mais animações e interações
- [ ] Integração com APIs
- [ ] Testes automatizados

## 📚 Recursos de Aprendizado

### HTML/CSS
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)

### JavaScript
- [JavaScript.info](https://javascript.info/)
- [MDN JavaScript Guide](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide)

### Mobile Development
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals)
- [Mobile Web Best Practices](https://www.w3.org/TR/mobile-bp/)

### PWA
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Workbox (Service Workers)](https://developers.google.com/web/tools/workbox)

## 🐛 Depuração Mobile

### Chrome DevTools

1. Conecte seu dispositivo Android via USB
2. Ative as "Opções do desenvolvedor" no Android
3. No Chrome desktop, acesse: `chrome://inspect`
4. Selecione seu dispositivo e inspecione

### Safari Web Inspector (iOS)

1. No iPhone: Ajustes > Safari > Avançado > Web Inspector (ativar)
2. No Mac: Safari > Preferências > Avançado > Mostrar menu Desenvolvedor
3. Conecte o iPhone via USB
4. Safari (Mac) > Desenvolver > [Seu iPhone] > [Página]

## 📝 Dicas de Desenvolvimento Mobile

1. **Sempre teste em dispositivos reais** - Emuladores não capturam todos os comportamentos
2. **Use meta viewport** - Já configurado no HTML
3. **Otimize imagens** - Use formatos modernos (WebP, AVIF)
4. **Touch targets mínimos** - 44x44 pixels (já implementado)
5. **Performance first** - Mobile tem menos recursos que desktop
6. **Progressive Enhancement** - Funcione em todos os dispositivos

## 🤝 Contribuindo

Este é um projeto de aprendizado. Sinta-se livre para:
- Fazer fork
- Criar branches
- Submeter pull requests
- Abrir issues
- Sugerir melhorias

## 📄 Licença

Projeto de código aberto para fins educacionais.

## 👨‍💻 Autor

Desenvolvido como projeto de prática e aprendizado.

---

**Happy Coding! 🚀**