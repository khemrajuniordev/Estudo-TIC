class Animal:
    def __init__(self, nome):
        self.nome = nome

    def emitir_som(self):
        print("Som genérico")

class Cachorro(Animal):  # Herda de Animal
    def emitir_som(self):
        print(f"O cachorro {self.nome} diz: Au au!")


class Gato(Animal):  # Herda de Animal
    def emitir_som(self):
        print(f"O gato {self.nome} diz: Miau!")

animais = [Cachorro("Rex"), Gato("Mimi"), Cachorro("Buddy"), Gato("Luna"), Cachorro("Max"), Gato("Oliver")]
for animal in animais:
    animal.emitir_som()
# Rex -> Au au! 
# Mimi -> Miau!

