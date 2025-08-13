""" crie uma classe com o nome de Televisao
crie um método construtor e declare os seguintes atributos de instancia para essa classe com os seguintes conteúdos:
Marca = "LG", volume = 0
Crie um método para aumentar o volume e outro método para diminuir o volume.
Ao aumentar o volume, este não pode passar de 10. Ao diminuir o volume, este não pode ser menor que 0 """


class Televisao:
    def __init__(self):
        
        self.marca = "LG"
        self.volume = 0
        print(f"Tv: ({self.marca} e esta no volume {self.volume})")

    def aumentar_volume(self):
        if self.volume < 10:
            self.volume += 1
            print(f"Volume aumentado para: {self.volume}")
        else:
            print("Volume já está no máximo (10).")

    def diminuir_volume(self):
        if self.volume > 0:
            self.volume -= 1
            print(f"Volume diminuído para: {self.volume}")
        else:
            print("Volume já está no mínimo (0).")

# Exemplo de uso da classe Televisao
tv = Televisao()
tv.aumentar_volume()
tv.aumentar_volume()
tv.aumentar_volume()
tv.aumentar_volume()
tv.aumentar_volume()
tv.aumentar_volume()
tv.aumentar_volume()
tv.aumentar_volume()
tv.aumentar_volume()
tv.aumentar_volume()  # Aumentar o volume até o máximo permitido
tv.aumentar_volume()  # Tentativa de aumentar o volume acima do máximo
tv.diminuir_volume()
tv.diminuir_volume()
tv.diminuir_volume()
tv.diminuir_volume()
tv.diminuir_volume()
tv.diminuir_volume()
tv.diminuir_volume()
tv.diminuir_volume()
tv.diminuir_volume()
tv.diminuir_volume()
tv.diminuir_volume()  # Diminuir o volume até o mínimo permitido
tv.diminuir_volume()  # Tentativa de diminuir o volume abaixo do mínimo
