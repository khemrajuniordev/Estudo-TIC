""" crie uma classe com o nome de Televisao
crie um método construtor e declare os seguintes atributos de instancia para essa classe com os seguintes conteúdos:
Marca = "LG", volume = 0
Crie um método para aumentar o volume e outro método para diminuir o volume.
Ao aumentar o volume, este não pode passar de 10. Ao diminuir o volume, este não pode ser menor que 0 """


class Televisao:
    def __init__(self, marca):    # Construtor da classe #contrutor com atributos

        self.marca = marca # Atributo de instância para a marca da TV
        self.volume = 0 # Atributo de instância para o volume da TV

    def aumentar_volume(self): # Método para aumentar o volume
        if self.volume < 10: # Verifica se o volume é menor que 10
            self.volume += 1 # Aumenta o volume em 1
            print(f"Volume aumentado para: {self.volume}") # Exibe o novo volume
        else:  # Se o volume já estiver no máximo
            print("Volume já está no máximo (10).") # Exibe mensagem de volume máximo

    def diminuir_volume(self): # Método para diminuir o volume
        if self.volume > 0: # Verifica se o volume é maior que 0
            self.volume -= 1 # Diminui o volume em 1
            print(f"Volume diminuído para: {self.volume}") # Exibe o novo volume
        else: # Se o volume já estiver no mínimo
            print("Volume já está no mínimo (0).") # Exibe mensagem de volume mínimo

    def visualizar_atributos(self): # Método para visualizar os atributos da TV
        print(f"Marca: {self.marca}") # Exibe a marca da TV
        print(f"Volume: {self.volume}") # Exibe o volume da TV

def ler_marca_tv(): # Função para ler a marca da TV
    return input(f"Digite o nome da marca: ")    #retorna a marca da TV

tv_sala = Televisao(ler_marca_tv()) # Cria uma instância da TV na sala como atributo uma função
tv_sala.visualizar_atributos()
tv_sala.aumentar_volume()
tv_sala.aumentar_volume()
tv_sala.aumentar_volume()
tv_sala.aumentar_volume()
tv_sala.aumentar_volume()
tv_sala.aumentar_volume()
tv_sala.aumentar_volume()
tv_sala.aumentar_volume()
tv_sala.aumentar_volume()
tv_sala.aumentar_volume()
tv_sala.aumentar_volume()
tv_sala.visualizar_atributos()
tv_sala.diminuir_volume()
tv_quarto = Televisao(ler_marca_tv())
tv_quarto.visualizar_atributos()
tv_quarto.aumentar_volume()
tv_quarto.aumentar_volume()
tv_quarto.aumentar_volume()
tv_quarto.aumentar_volume()
tv_quarto.aumentar_volume()
tv_quarto.aumentar_volume()
tv_quarto.aumentar_volume()
tv_quarto.aumentar_volume()
tv_quarto.aumentar_volume()
tv_quarto.aumentar_volume()
tv_quarto.aumentar_volume()
tv_quarto.visualizar_atributos()
tv_quarto.diminuir_volume()
tv_sala.visualizar_atributos()
tv_quarto.visualizar_atributos()
