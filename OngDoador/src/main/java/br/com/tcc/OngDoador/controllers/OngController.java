package br.com.tcc.OngDoador.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

import br.com.tcc.OngDoador.entity.OngEntity;
import br.com.tcc.OngDoador.reposity.OngRepository;

@RestController
@RequestMapping("/ong")
@CrossOrigin("*")
public class OngController {

	@Autowired
	private OngRepository ongRepository;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	@CrossOrigin("*")
	public List<OngEntity> ListarTodos(){
		return ongRepository.findAll();
	}//Listar Todos
	
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	@CrossOrigin("*")
	public Optional<OngEntity> ListarPorId(@PathVariable Long id){
		return ongRepository.findById(id);
	}//Listar Por id
	
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	@CrossOrigin("*")
	public OngEntity Salvar(@RequestBody OngEntity entity) {
		return ongRepository.save(entity);
	}//salvar
	
	@DeleteMapping("deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@CrossOrigin("*")
	public String Deletar(@PathVariable Long id) {
		if (ongRepository.existsById(id)) {
			ongRepository.deleteById(id);
			return "Deletado";
		}
		return "Não Encontrado";
	}//deletar
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	@CrossOrigin("*")
	public OngEntity Atualizar(@RequestBody OngEntity entity, @PathVariable Long id) {
		if(ongRepository.existsById(id)) {
			entity.setId(id);
			return ongRepository.save(entity);
		}
		return null;
	}//Atualizar
	
	
	@GetMapping("/buscarnome/{nomeFantasia}")
	@ResponseStatus(HttpStatus.OK)
	@CrossOrigin("*")
	List<OngEntity> BuscarNome(@PathVariable String nomeFantasia){
		return ongRepository.findByNomeFantasiaContainingIgnoreCase( nomeFantasia);
	}//buscar por nome
	
	@GetMapping("/login")
	@CrossOrigin("*")
	public ResponseEntity<OngEntity> login(@RequestBody OngEntity ongLogin){
		
		Optional<OngEntity> ong = 
				ongRepository.findByEmailOng(ongLogin.getEmailOng());
		
		if(ong.isPresent()) {
			OngEntity OngEncontrada = ong.get();
			
			if(encoder.matches(ongLogin.getEmailOng(),
					OngEncontrada.getEmailOng())) {
				return ResponseEntity.ok(OngEncontrada);
			}
		}
		return ResponseEntity.status(401).build();
	}
	
	
}
	

