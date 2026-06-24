package br.com.tcc.OngDoador.reposity;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import br.com.tcc.OngDoador.entity.UsuarioEntity;
@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long>{

	Optional<UsuarioEntity> findByEmail(String email);
	boolean existsByEmail(String email);
	boolean existsByCpf(String cpf);
	
}
