class Veiculo:
    def __init__ (self, marca, modelo):
        self.marca = marca
        self.modelo = modelo

    def acelerar(self):
        print(f"O veículo {self.marca} {self.modelo} {self.portas} {self.cor} está acelerando.")
    def frear(self):
        print(f"O veículo {self.marca} {self.modelo} {self.portas} {self.cor} está freando.")

class Carro(Veiculo):
    def __init__(self, marca, modelo, portas, cor):
        super().__init__(marca, modelo)
        self.portas = portas
        self.cor = cor


Ferrari = Carro("Ferrari", "488", 2, "Vermelho")
Ferrari.acelerar()
Ferrari.frear()