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

import br.com.tcc.OngDoador.entity.OngEntity;
import br.com.tcc.OngDoador.reposity.OngRepository;

@RestController
@RequestMapping("/ong")
public class OngController {

	@Autowired
	private OngRepository ongRepository;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List<OngEntity> ListarTodos(){
		return ongRepository.findAll();
	}//Listar Todos
	
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<OngEntity> ListarPorId(@PathVariable Long id){
		return ongRepository.findById(id);
	}//Listar Por id
	
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	public OngEntity Salvar(@RequestBody OngEntity entity) {
		return ongRepository.save(entity);
	}//salvar
	
	@DeleteMapping("deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public String Deletar(@PathVariable Long id) {
		if (ongRepository.existsById(id)) {
			ongRepository.deleteById(id);
			return "Deletado";
		}
		return "Não Encontrado";
	}//deletar
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public OngEntity Atualizar(@RequestBody OngEntity entity, @PathVariable Long id) {
		if(ongRepository.existsById(id)) {
			entity.setId(id);
			return ongRepository.save(entity);
		}
		return null;
	}//Atualizar
	
	
	
	
	
}
