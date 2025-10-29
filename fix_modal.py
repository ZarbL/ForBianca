#!/usr/bin/env python3
"""
Script para mover o modal do video para o final do body no index.html
"""

with open('math-section.html', 'r', encoding='utf-8') as f:
    math_content = f.read()

# Extrair apenas o modal
modal_start = math_content.find('<div class="video-modal"')
modal_end = math_content.find('</div>\n                </div>\n\n            </div>\n        </section>')
modal_html = math_content[modal_start:modal_end].strip()

# Adicionar divs de fechamento
modal_html += '\n                    </div>\n                </div>'

# Ler index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Procurar onde inserir (antes do </body>)
insert_pos = index_content.find('    <!-- Scripts -->')

if insert_pos > 0:
    # Inserir modal antes dos scripts
    new_content = index_content[:insert_pos] + '\n    <!-- Modal de Vídeo (movido para fora da section) -->\n    ' + modal_html + '\n\n    '+ index_content[insert_pos:]
    
    # Salvar
    with open('index_fixed.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✅ Modal movido com sucesso para index_fixed.html")
    print(f"Modal inserido na posição: {insert_pos}")
else:
    print("❌ Não encontrei onde inserir o modal")
