package br.com.tcc.OngDoador.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

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

import br.com.tcc.OngDoador.entity.UsuarioEntity;
import br.com.tcc.OngDoador.reposity.UsuarioRepository;

@RestController
@RequestMapping("/usuario")
@CrossOrigin("*")
public class UsuarioController {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	@CrossOrigin("*")
	public List<UsuarioEntity> ListarTodos(){
		return usuarioRepository.findAll();
	}//Listar Todos
	
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	@CrossOrigin("*")
	public Optional<UsuarioEntity> ListarPorId(@PathVariable Long id){
		return usuarioRepository.findById(id);
	}//Listar por id
	
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	@CrossOrigin("*")
	public UsuarioEntity Salvar( @RequestBody @Valid UsuarioEntity entity) {
		entity.setSenha(encoder.encode(entity.getSenha()));//criptografando a senha;
		
		if(usuarioRepository.existsByEmail(entity.getEmail())) {
		    throw new RuntimeException("E-mail já cadastrado.");
		}
		if(usuarioRepository.existsByCpf(entity.getCpf())) {
		    throw new RuntimeException("CPF já cadastrado.");
		}
		return usuarioRepository.save(entity);
	}//Salvar
	
	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@CrossOrigin("*")
	public String Deletar(@PathVariable Long id) {
		if(usuarioRepository.existsById(id)) {
			usuarioRepository.deleteById(id);
			return "Deletado";
		}
		return "Não Encontrado";
		
	}//Deletar
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	
	public UsuarioEntity Atualizar(@RequestBody UsuarioEntity entity, @PathVariable Long id) {
		if(usuarioRepository.existsById(id)) {
			entity.setId(id);
			return usuarioRepository.save(entity);
		}
		return null;
	}//Atualizar
	
	@GetMapping("/login")

	public ResponseEntity<UsuarioEntity> login(@RequestBody UsuarioEntity usuarioLogin){
		
		Optional<UsuarioEntity> usuario = 
				usuarioRepository.findByEmail(usuarioLogin.getEmail());
		
		if(usuario.isPresent()) {
			UsuarioEntity usuarioEncontrado = usuario.get();
			
			if(encoder.matches(usuarioLogin.getSenha(),
					usuarioEncontrado.getSenha())) {
				return ResponseEntity.ok(usuarioEncontrado);
			}
		}
		return ResponseEntity.status(401).build();
	}
	
	
}
