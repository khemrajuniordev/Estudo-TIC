class filmecomatributos:
    def __init__(self, titulo, ano, genero):
        self.titulo = titulo
        self.ano = ano
        self.genero = genero

        
    def assistir_filme(self):
        print("====================================================")
        print(f"Filme Selecionado: {self.titulo} ({self.ano}) - Gênero: {self.genero} - Duração: {self.calcular_duracao_filme()} minutos - tradução: {self.traducao()}")
    
    def calcular_duracao_filme(self):       
        return 120

    def traducao(self):
        return "Português"

    def assistindo_filme(self):
        print(f"Assistindo ao filme: {self.titulo} ({self.ano})")

Filme = filmecomatributos("Matrix", 1999, "Ficção Científica")
Filme.assistir_filme()
Filme.calcular_duracao_filme()
Filme.traducao()
Filme.assistindo_filme()
