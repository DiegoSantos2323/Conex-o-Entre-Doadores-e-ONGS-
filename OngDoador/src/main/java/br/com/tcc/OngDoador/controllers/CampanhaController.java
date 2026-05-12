package br.com.tcc.OngDoador.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.tcc.OngDoador.entity.CampanhaEntity;
import br.com.tcc.OngDoador.reposity.CampanhaRepository;
@RestController
@RequestMapping("/campanha")
public class CampanhaController  {

	@Autowired
	private CampanhaRepository repository;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List<CampanhaEntity> ListarTodos(){
		return repository.findAll();
	}//listar todos
	
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<CampanhaEntity> ListarPorId(@PathVariable Long id){
		return repository.findById(id);
	}//listar por id

	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	public CampanhaEntity Salvar(@RequestBody CampanhaEntity entity) {
		return repository.save(entity);
	}//salvar
	
	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public String deletar(@PathVariable Long id) {
		if(repository.existsById(id)) {
			repository.deleteById(id);
			return "Deletado";
		}
		return "Não Encontrado";
	}
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public CampanhaEntity Atualizar(@RequestBody CampanhaEntity entity, @PathVariable Long id ) {
		if(repository.existsById(id)) {
			entity.setId(id);
			return repository.save(entity);
		}
		return null;
	}//Salvar
	
}
	
	
	
	
	
