package br.com.tcc.OngDoador.reposity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.tcc.OngDoador.entity.GestorEntity;
@Repository
public interface GestorRepository extends JpaRepository<GestorEntity, Long>{

	Optional<GestorEntity> findByEmailGestor(String emailGestor);
	
}
