package com.sistema.financeiro.api.models.transacao;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transacoes")
@Data
@NoArgsConstructor 
@AllArgsConstructor 
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "A descrição é obrigatória!")
    @Column(nullable = false)
    private String descricao;

    @Positive(message = "O valor deve ser positivo!")
    @Column(nullable = false)
    private BigDecimal valor;

    @NotNull(message = "O tipo é obrigatório (RECEITA OU DESPESA)!")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoTransacao tipo; 
    
    private LocalDate data = LocalDate.now();

    @Enumerated(EnumType.STRING)
    private Categoria categoria = Categoria.OUTROS;
}