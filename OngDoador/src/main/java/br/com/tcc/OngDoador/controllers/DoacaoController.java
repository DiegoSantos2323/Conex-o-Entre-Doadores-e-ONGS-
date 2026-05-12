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

import br.com.tcc.OngDoador.entity.DoacaoEntity;
import br.com.tcc.OngDoador.reposity.DoacaoRepository;

@RestController
@RequestMapping("/doacao")
public class DoacaoController {

	@Autowired
	private DoacaoRepository repository;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List<DoacaoEntity> ListarTodos(){
		return repository.findAll();
	}//ListarTodos

	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<DoacaoEntity> ListaPorId(@PathVariable Long id){
		return repository.findById(id);
	}//Listar Por id
	
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	public DoacaoEntity Salvar(@RequestBody DoacaoEntity entity) {
		return repository.save(entity);
	}//salvar
	
	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public String Deletar(@PathVariable Long id) {
		if(repository.existsById(id)) {
			repository.deleteById(id);
			return "Deletado";
		}
		return "Não Encontrado";
	}//Deletar
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public DoacaoEntity Atualizar(@RequestBody DoacaoEntity entity,@PathVariable Long id) {
		if(repository.existsById(id)) {
			entity.setId(id);
			return repository.save(entity);
		}
		return null;
	}//Salvar
	
}
