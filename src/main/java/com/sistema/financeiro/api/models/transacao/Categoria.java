package com.sistema.financeiro.api.models.transacao;


public enum Categoria {
    ALIMENTACAO("Alimentação", SubCategoria.NAO_ESSENCIAIS),
    TRANSPORTE("Transporte", SubCategoria.ESSENCIAIS),
    MORADIA("Moradia", SubCategoria.ESSENCIAIS),
    SAUDE("Saúde", SubCategoria.ESSENCIAIS),
    EDUCACAO("Educação", SubCategoria.ENRIQUECER),
    LAZER("Lazer", SubCategoria.NAO_ESSENCIAIS),
    VESTUARIO("Vestuário", SubCategoria.NAO_ESSENCIAIS),
    COMPRAS("Compras", SubCategoria.NAO_ESSENCIAIS),
    CONTAS("Contas", SubCategoria.ESSENCIAIS),
    RESERVA("Reserva", SubCategoria.ENRIQUECER),
    INVESTIMENTOS("Investimentos", SubCategoria.ENRIQUECER),
    MERCADO("Mercado", SubCategoria.ESSENCIAIS),
    OUTROS("Outros", SubCategoria.NAO_ESSENCIAIS);

    private final String descricao;
    private final SubCategoria subCategoria;

    Categoria(String descricao, SubCategoria subCategoria) {
        this.descricao = descricao;
        this.subCategoria = subCategoria;
    }

    public String getDescricao() {
        return descricao;
    }

    public SubCategoria getSubCategoria() {
        return subCategoria;
    }

    public enum SubCategoria {
        ESSENCIAIS("Essenciais"),
        NAO_ESSENCIAIS("Não essenciais"),
        ENRIQUECER("Enriquecer");

        private final String descricao;

        SubCategoria(String descricao) {
            this.descricao = descricao;
        }

        public String getDescricao() {
            return descricao;
        }
    }
}