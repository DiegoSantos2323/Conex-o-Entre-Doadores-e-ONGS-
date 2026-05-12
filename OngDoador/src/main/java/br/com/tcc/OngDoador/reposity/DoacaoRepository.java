package br.com.tcc.OngDoador.reposity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.tcc.OngDoador.entity.DoacaoEntity;
@Repository
public interface DoacaoRepository extends JpaRepository<DoacaoEntity, Long>{

}
