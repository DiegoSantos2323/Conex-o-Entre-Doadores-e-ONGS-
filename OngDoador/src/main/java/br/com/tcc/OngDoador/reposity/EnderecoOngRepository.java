package br.com.tcc.OngDoador.reposity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.tcc.OngDoador.entity.EnderecoOngEntity;
@Repository
public interface EnderecoOngRepository extends JpaRepository<EnderecoOngEntity, Long>{

	EnderecoOngEntity findByOngId(Long id);
	List<EnderecoOngEntity> findByCidadeAndEstado(String cidade, String estado);
	
}
