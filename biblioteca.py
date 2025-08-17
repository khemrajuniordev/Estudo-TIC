# Definição da classe Livro: um "molde" para criar objetos do tipo Livro.
class Livro:
    # __init__ é o construtor: roda sempre que criamos um novo Livro.
    # Usei nomes sem acentos por boa prática e um padrão para o Python.
    def __init__(self, titulo, autor, disponivel=True):
        # 'self.titulo' armazena o título dentro do objeto (estado do livro).
        self.titulo = titulo
        # 'self.autor' armazena o autor do livro dentro do objeto.
        self.autor = autor
        # 'self.disponivel' diz se o livro pode ser emprestado (True = sim).
        self.disponivel = disponivel

    # Método para tentar emprestar o livro.
    def emprestar(self):
        # Se o livro está disponível, podemos emprestar.
        if self.disponivel:
            # Atualiza o estado: agora o livro não está mais disponível.
            self.disponivel = False
            # Feedback para o usuário do sistema.
            print(f"Livro '{self.titulo}' emprestado com sucesso.")
        else:
            # Se já estava emprestado, avisamos que não dá para emprestar de novo.
            print(f"Livro '{self.titulo}' não está disponível para empréstimo.")

    # Método para devolver o livro.
    def devolver(self):
        # Se o livro NÃO está disponível, significa que está emprestado → pode devolver.
        if not self.disponivel:
            # Atualiza o estado: volta a ficar disponível.
            self.disponivel = True
            # Mensagem de confirmação.
            print(f"Livro '{self.titulo}' devolvido com sucesso.")
        else:
            # Se já estava disponível, não havia ninguém com ele → apenas informamos.
            print(f"Livro '{self.titulo}' já está disponível.")


# -------------------------------
# SIMULAÇÃO / TESTE DO CÓDIGO
# -------------------------------

# Cria um objeto Livro chamado 'livro' com titulo, autor e (por padrão) disponível = True.
livro = Livro("Dom Casmurro", "Machado de Assis")

# Tenta emprestar o livro: como está disponível, deve mudar para 'disponivel = False'.
livro.emprestar()

# Tenta emprestar de novo: agora está indisponível, então deve avisar que não pode.
livro.emprestar()

# Devolve o livro: volta a ficar 'disponivel = True'.
livro.devolver()

# Tenta devolver de novo: já está disponível, então apenas informa que não havia empréstimo ativo.
livro.devolver()
