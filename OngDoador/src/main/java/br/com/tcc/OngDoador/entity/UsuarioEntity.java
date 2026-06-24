package br.com.tcc.OngDoador.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name = "Usuario")
public class UsuarioEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	 public UsuarioEntity() {
	    }


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Por favor, informe seu nome completo.")
	@Size(min = 3, max = 100 ,
	message = "O nome completo deve conter entre 3 e 100 caracteres.")
	private String nomeCompleto;
	
	@NotBlank(message = "Por favor, informe o CPF.")
	private String cpf;
	
	@NotBlank(message = "Por favor, informe o e-mail.")
	@Email(message = "Por favor, informe um e-mail válido.")
	private String email;
	
	@NotBlank(message = "Por favor, informe uma senha.")
	@Size(min = 8 ,max = 30, message = "A senha deve conter entre 8 e 30 caracteres.")		
	private String senha;
	
	@NotBlank(message = "Por favor, informe o CEP.")
	private String cepUsuario;
	
	@NotBlank
	(message = "Por favor, informe a cidade.")
	private String cidade;
	
	@NotBlank
	(message = "Por favor, informe o estado.")
	private String estado;
	
	@NotBlank
	(message = "Por favor, informe o bairro.")
	private String bairro;
	
	@NotBlank
	(message = "Por favor, informe o logradouro.")
	private String logradouro;
	
	@NotBlank
	private String numero;
	
	private boolean doadorAnonimo;
	
	
	
	@OneToMany(mappedBy = "usuario")
	@JsonIgnore
	private List<DoacaoEntity> doacao;
	
	
	public List<DoacaoEntity> getDoacao() {
		return doacao;
	}
	public void setDoacao(List<DoacaoEntity> doacao) {
		this.doacao = doacao;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNomeCompleto() {
		return nomeCompleto;
	}
	public void setNomeCompleto(String nomeCompleto) {
		this.nomeCompleto = nomeCompleto;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCidade() {
		return cidade;
	}
	public void setCidade(String cidade) {
		this.cidade = cidade;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getBairro() {
		return bairro;
	}
	public void setBairro(String bairro) {
		this.bairro = bairro;
	}
	
	public String getNumero() {
		return numero;
	}
	public void setNumero(String numero) {
		this.numero = numero;
	}
	public boolean isDoadorAnonimo() {
		return doadorAnonimo;
	}
	public void setDoadorAnonimo(boolean doadorAnonimo) {
		this.doadorAnonimo = doadorAnonimo;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	public String getCepUsuario() {
		return cepUsuario;
	}
	public void setCepUsuario(String cepUsuario) {
		this.cepUsuario = cepUsuario;
	}
	public String getLogradouro() {
		return logradouro;
	}
	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	
	
	
	
	



}
