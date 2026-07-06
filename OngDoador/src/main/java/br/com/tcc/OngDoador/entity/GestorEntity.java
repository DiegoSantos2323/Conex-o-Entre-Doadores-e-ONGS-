package br.com.tcc.OngDoador.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Gestor")
public class GestorEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nomeGestor;
	private String cpf;
	private String emailGestor;
	private String telefone;
	private String cargoGestor;
	
	@OneToOne
	@JoinColumn(name = "ongID")
	@JsonIgnore
	private OngEntity ong;
	//Uma ong tem 1 gestor

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getEmailGestor() {
		return emailGestor;
	}

	public void setEmailGestor(String emailGestor) {
		this.emailGestor = emailGestor;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}


	public OngEntity getOng() {
		return ong;
	}

	public void setOng(OngEntity ong) {
		this.ong = ong;
	}

	public String getCargoGestor() {
		return cargoGestor;
	}

	public void setCargoGestor(String cargoGestor) {
		this.cargoGestor = cargoGestor;
	}

	public String getNomeGestor() {
		return nomeGestor;
	}

	public void setNomeGestor(String nomeGestor) {
		this.nomeGestor = nomeGestor;
	}



	
	
}
