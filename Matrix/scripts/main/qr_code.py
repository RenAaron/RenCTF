import qrcode

qr = qrcode.QRCode(
    version=1,  # Controls the size of the QR code (1-40)
    error_correction=qrcode.constants.ERROR_CORRECT_L, # Error correction level (L, M, Q, H)
    box_size=10, # Pixels per box
    border=4, # Border thickness
)

qr.add_data("https://en.wikipedia.org/wiki/Caesar_cipher")
qr.make(fit=True)

img = qr.make_image(fill_color="white", back_color="black") # Custom colors
img.save("custom_qrcode.png")