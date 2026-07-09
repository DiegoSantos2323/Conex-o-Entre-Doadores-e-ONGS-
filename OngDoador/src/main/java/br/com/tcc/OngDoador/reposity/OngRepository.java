package br.com.tcc.OngDoador.reposity;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.tcc.OngDoador.entity.OngEntity;

@Repository
public interface OngRepository extends JpaRepository<OngEntity, Long>{

	List<OngEntity> findByNomeFantasiaContainingIgnoreCase(String nomeFantasia);
	
	Optional<OngEntity> findByEmailOng(String emailOng);
	
	OngEntity findFirstByOrderByIdDesc();
	
}
