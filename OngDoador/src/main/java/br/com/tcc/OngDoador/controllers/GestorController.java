package br.com.tcc.OngDoador.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.tcc.OngDoador.entity.GestorEntity;
import br.com.tcc.OngDoador.reposity.GestorRepository;

@RestController
@RequestMapping("/gestor")
@CrossOrigin("*")
public class GestorController {

	@Autowired
	private GestorRepository repository;

	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	@CrossOrigin("*")
	public List<GestorEntity> ListarTodos(){
		return repository.findAll();
	}//listartodos
	
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	@CrossOrigin("*")
	public Optional<GestorEntity> ListarPorId(@PathVariable Long id){
		return repository.findById(id);
	}//listar por id
	
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	@CrossOrigin("*")
	public GestorEntity Salvar(@RequestBody GestorEntity entity) {
		return repository.save(entity);
	}//Salvar
	
	@DeleteMapping("deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@CrossOrigin("*")
	public String Deletar(@PathVariable Long id) {
		if (repository.existsById(id)) {
			repository.deleteById(id);
			return "Deletado";
		}
		return "Não Encontrado";
	}//deletar
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	@CrossOrigin("*")
	public GestorEntity Atualizar(@RequestBody GestorEntity entity,@PathVariable Long id) {
		if(repository.existsById(id)) {
			entity.setId(id);
			return repository.save(entity);
		}
		return null;
	}//Atualizar
	
	
	
	
}

