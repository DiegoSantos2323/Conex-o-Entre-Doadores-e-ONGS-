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

import br.com.tcc.OngDoador.entity.GestorEntity;
import br.com.tcc.OngDoador.reposity.GestorRepository;

@RestController
@RequestMapping("/gestor")
@CrossOrigin("*")
public class GestorController {

	@Autowired
	private GestorRepository repository;

	 @Autowired
	    private BCryptPasswordEncoder encoder;
	
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
	    public GestorEntity Salvar(
	            @RequestBody GestorEntity entity) {

	        // criptografa senha
	        String senhaCriptografada =
	                encoder.encode(entity.getSenha());

	        entity.setSenha(senhaCriptografada);

	        // primeiro acesso
	        entity.setSenhaTemporaria(true);

	        return repository.save(entity);

	    }

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
	
	  @PostMapping("/login")
	    public ResponseEntity<?> login(
	            @RequestBody GestorEntity gestorLogin) {
	          //Procura gestor pelo email
	 
	        Optional<GestorEntity> gestor =
	                repository.findByEmailGestor(
	                        gestorLogin.getEmailGestor());
	        /*
	         * Se encontrou o gestor
	         */

	        if (gestor.isPresent()) {

	            GestorEntity gestorEncontrado =
	                    gestor.get();
	            /*
	             * Verifica senha digitada
	             */
	            boolean senhaCorreta =
	                    encoder.matches(
	                            gestorLogin.getSenha(),
	                            gestorEncontrado.getSenha());
	            /*
	             * Se senha correta
	             */
	            if (senhaCorreta) {
	                /*
	                 * Verifica se ainda é senha temporária
	                 */
	                if (gestorEncontrado
	                        .getSenhaTemporaria()) {
	                    /*
	                     * Retorna mensagem especial
	                     * para obrigar troca de senha
	                     */

	                    return ResponseEntity.ok(
	                            "PRIMEIRO_ACESSO");
	                }
	                /*
	                 * Login normal
	                 */
	                return ResponseEntity.ok(
	                        gestorEncontrado);
	            }
	        }
	        /*
	         * Email ou senha incorretos
	         */
	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body("Email ou senha inválidos");
	        
	    }
	//login
	
	  
	  	@PutMapping("/alterarsenha/{id}")
	    @ResponseStatus(HttpStatus.OK)
	    public ResponseEntity<String> alterarSenha (@PathVariable Long id, @RequestBody GestorEntity entity) {

	        Optional<GestorEntity> gestorOptional =repository.findById(id);
	        /*
	         * Verifica se gestor existe
	         */
	        if (gestorOptional.isPresent()) {

	            GestorEntity gestor =  gestorOptional.get();
	                  
	            /*
	             * Criptografa nova senha
	             */
	            String novaSenhaCriptografada = encoder.encode(entity.getSenha());
	            
	            /*
	             * Salva nova senha
	             */
	            gestor.setSenha(novaSenhaCriptografada);
	     
	            /*
	             * FALSE = senha definitiva
	             */
	            gestor.setSenhaTemporaria(false);
	            /*
	             * Atualiza no banco
	             */
	           repository.save(gestor);
	            return ResponseEntity.ok("Senha alterada com sucesso");	                   
	        }
	        return ResponseEntity
	                .status(HttpStatus.NOT_FOUND)
	                .body("Gestor não encontrado");
	    }
	//alterar senha
	
}

