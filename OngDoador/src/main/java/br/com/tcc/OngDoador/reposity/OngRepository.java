package br.com.tcc.OngDoador.reposity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.tcc.OngDoador.entity.OngEntity;
@Repository
public interface OngRepository extends JpaRepository<OngEntity, Long>{

}
