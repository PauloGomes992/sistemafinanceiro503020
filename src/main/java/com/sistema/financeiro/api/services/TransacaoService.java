package com.sistema.financeiro.api.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sistema.financeiro.api.models.transacao.*;

@Service
@Transactional
public class TransacaoService {

    private static final Logger log = LoggerFactory.getLogger(TransacaoService.class);
    
    private final TransacaoRepository repository;

    public TransacaoService(TransacaoRepository repository) {
        this.repository = repository;
    }

    public Transacao salvar(Transacao transacao) {
        log.info("Salvando transação: {}", transacao.getDescricao());
        try {
            Transacao salva = repository.save(transacao);
            log.info("Transação salva com sucesso. ID: {}", salva.getId());
            return salva;
        } catch (Exception e) {
            log.error("Erro ao salvar transação: {}", e.getMessage(), e);
            throw new RuntimeException("Erro ao salvar transação", e);
        }
    }

    @Transactional(readOnly = true)
    public List<Transacao> listarTodas() {
        log.debug("Listando todas as transações");
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Transacao> buscarPorId(Long id) {
        log.debug("Buscando transação com ID: {}", id);
        Optional<Transacao> transacao = repository.findById(id);
        if (transacao.isEmpty()) {
            log.warn("Transação não encontrada com ID: {}", id);
        }
        return transacao;
    }

    public Optional<Transacao> atualizar(Long id, Transacao atualizada) {
        log.info("Atualizando transação ID: {}", id);
        try {
            return repository.findById(id).map(t -> {
                t.setDescricao(atualizada.getDescricao());
                t.setValor(atualizada.getValor());
                t.setTipo(atualizada.getTipo());
                t.setCategoria(atualizada.getCategoria());
                t.setData(atualizada.getData());
                Transacao salva = repository.save(t);
                log.info("Transação atualizada com sucesso. ID: {}", id);
                return salva;
            });
        } catch (Exception e) {
            log.error("Erro ao atualizar transação ID {}: {}", id, e.getMessage(), e);
            throw new RuntimeException("Erro ao atualizar transação", e);
        }
    }

    public boolean deletar(Long id) {
        log.info("Tentando deletar transação ID: {}", id);
        try {
            if (repository.existsById(id)) {
                repository.deleteById(id);
                log.info("Transação deletada com sucesso. ID: {}", id);
                return true;
            }
            log.warn("Tentativa de deletar transação inexistente. ID: {}", id);
            return false;
        } catch (Exception e) {
            log.error("Erro ao deletar transação ID {}: {}", id, e.getMessage(), e);
            throw new RuntimeException("Erro ao deletar transação", e);
        }
    }

    public BigDecimal calcularSaldo() {
        List<Transacao> transacoes = repository.findAll();
        BigDecimal saldo = BigDecimal.ZERO;

        for (Transacao t : transacoes) {
            if (t.getTipo() == TipoTransacao.RECEITA) {
                saldo = saldo.add(t.getValor());
            } else if (t.getTipo() == TipoTransacao.DESPESA) {
                saldo = saldo.subtract(t.getValor());
            }
        }

        return saldo;
    }
}
