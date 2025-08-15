class GeradorRelatorio:
    def __init__(self, usuario):
        self.usuario = usuario

    def gerar_relatorio(self):
        # Código para gerar o relatório
        return f"Relatório do usuário {self.usuario}"


class SalvadorRelatorio:
    def salvar_arquivo(self, relatorio):
        # Código para salvar o relatório em um arquivo
        print(f"Relatório salvo: {relatorio}")


class EmailRelatorio:
    def enviar_email(self, relatorio):
        # Código para enviar o relatório por e-mail
        print(f"E-mail enviado com o relatório: {relatorio}")


# Exemplo de uso
if __name__ == "__main__":
    gerador = GeradorRelatorio("João")
    relatorio = gerador.gerar_relatorio()

    salvador = SalvadorRelatorio()
    salvador.salvar_arquivo(relatorio)

    emailer = EmailRelatorio()
    emailer.enviar_email(relatorio)
