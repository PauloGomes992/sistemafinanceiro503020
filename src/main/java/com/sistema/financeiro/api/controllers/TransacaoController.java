package com.sistema.financeiro.api.controllers;

import java.math.BigDecimal;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sistema.financeiro.api.models.transacao.TipoTransacao;
import com.sistema.financeiro.api.models.transacao.Transacao;
import com.sistema.financeiro.api.models.transacao.TransacaoRepository;
import com.sistema.financeiro.api.models.transacao.Categoria;
import com.sistema.financeiro.api.models.transacao.CategoriaDTO;
import java.util.Arrays;
import com.sistema.financeiro.api.services.TransacaoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transacoes")
@CrossOrigin(origins = "http://localhost:4200")
public class TransacaoController {

    private static final Logger log = LoggerFactory.getLogger(TransacaoController.class);

    private final TransacaoRepository transacaoRepository;

    private final TransacaoService service;

    public TransacaoController(TransacaoService service, TransacaoRepository transacaoRepository) {
        this.service = service;
        this.transacaoRepository = transacaoRepository;
    }

    @GetMapping
    public ResponseEntity<List<Transacao>> listar() {
        log.debug("GET /api/transacoes - Listando todas as transações");
        List<Transacao> lista = service.listarTodas();
        log.debug("Retornando {} transações", lista.size());
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transacao> buscarPorId(@PathVariable Long id) {
        log.debug("GET /api/transacoes/{} - Buscando transação", id);
        return service.buscarPorId(id)
                .map(t -> {
                    log.debug("Transação encontrada: {}", id);
                    return ResponseEntity.ok(t);
                })
                .orElseGet(() -> {
                    log.warn("Transação não encontrada: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @GetMapping("/saldo")
    public ResponseEntity<BigDecimal> getSaldoTotal() {
        log.debug("GET /api/transacoes/saldo - Calculando saldo total");
        try {
            BigDecimal receitas = transacaoRepository.somarPorTipo(TipoTransacao.RECEITA);
            BigDecimal despesas = transacaoRepository.somarPorTipo(TipoTransacao.DESPESA);
            BigDecimal saldo = receitas.subtract(despesas);
            log.debug("Saldo calculado: {}", saldo);
            return ResponseEntity.ok(saldo);
        } catch (Exception e) {
            log.error("Erro ao calcular saldo: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/categorias")
    public ResponseEntity<List<CategoriaDTO>> listarCategorias() {
        List<CategoriaDTO> categorias = Arrays.stream(Categoria.values())
            .map(c -> new CategoriaDTO(c.name(), c.getDescricao()))
            .toList();
        return ResponseEntity.ok(categorias);
    }

    @PostMapping
    public ResponseEntity<Transacao> criar(@Valid @RequestBody Transacao transacao) {
        log.info("POST /api/transacoes - Criando nova transação: {}", transacao.getDescricao());
        try {
            Transacao nova = service.salvar(transacao);
            log.info("Transação criada com sucesso. ID: {}", nova.getId());
            return ResponseEntity.status(201).body(nova);
        } catch (Exception e) {
            log.error("Erro ao criar transação: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transacao> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody Transacao transacao) {
        log.info("PUT /api/transacoes/{} - Atualizando transação", id);
        try {
            return service.atualizar(id, transacao)
                    .map(t -> {
                        log.info("Transação atualizada com sucesso. ID: {}", id);
                        return ResponseEntity.ok(t);
                    })
                    .orElseGet(() -> {
                        log.warn("Transação não encontrada para atualização. ID: {}", id);
                        return ResponseEntity.notFound().build();
                    });
        } catch (Exception e) {
            log.error("Erro ao atualizar transação ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        log.info("DELETE /api/transacoes/{} - Deletando transação", id);
        try {
            if (service.deletar(id)) {
                log.info("Transação deletada com sucesso. ID: {}", id);
                return ResponseEntity.noContent().build();
            } else {
                log.warn("Transação não encontrada para deleção. ID: {}", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Erro ao deletar transação ID {}: {}", id, e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

}