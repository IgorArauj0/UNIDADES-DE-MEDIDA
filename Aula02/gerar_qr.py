
#pip install qrcode[pil]

# Passo 1: importa a biblioteca instalada
import qrcode

# Passo 2: cria o objeto QR Code
# box_size = tamanho de cada quadradinho em pixels
# border   = margem branca ao redor (padrão = 4)
qr = qrcode.QRCode(
    box_size=10,
    border=4
)

# Passo 3: adiciona o conteúdo que vai virar QR
# Pode ser um link, texto, email, telefone...
qr.add_data("https://bookdev.eadplataforma.app/")

# Passo 4: gera o QR de forma otimizada
# fit=True ajusta o tamanho automaticamente
qr.make(fit=True)

# Passo 5: cria a imagem com cores
# fill_color = cor dos quadradinhos
# back_color = cor do fundo
img = qr.make_image(
    fill_color="black",
    back_color="white"
)

# Passo 6: salva o arquivo no computador
img.save("meu_qrcode.png")

# Confirma que deu tudo certo
print("QR Code gerado com sucesso! ✅")
print("Arquivo salvo: meu_qrcode.png")