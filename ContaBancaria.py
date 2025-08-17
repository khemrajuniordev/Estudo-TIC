class ContaBancaria:
    def __init__(self, titular, saldo):
        self.titular = titular
        self.saldo = saldo

    def depositar(self, valor):
        self.saldo += valor
        print(f"Depósito de R${valor:.2f} realizado. Saldo atual: R${self.saldo:.2f}")
        

    def sacar(self, valor):
        if valor > self.saldo:
            print(f"Saldo insuficiente para sacar R${valor:.2f}. Saldo atual: R${self.saldo:.2f}")
        else:
            self.saldo -= valor
            print(f"Saque de R${valor:.2f} realizado. Saldo atual: R${self.saldo:.2f}")


    def exibir_saldo(self):
        print(f"Saldo atual de {self.titular}: R${self.saldo:.2f}")
    


# Simulação / Teste do código

conta1 = ContaBancaria("Alice", 1000.0)
conta1.exibir_saldo()
conta1.depositar(500.0)
conta1.sacar(200.0)
conta1.exibir_saldo()

conta2 = ContaBancaria("Bob", 300.0)
conta2.exibir_saldo()
conta2.depositar(150.0)
conta2.sacar(100.0)
conta2.exibir_saldo()
