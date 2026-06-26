package br.com.tcc.OngDoador.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
@Entity
@Table(name = "Ong")
public class OngEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nomeFantasia;
	private String cnpj;
	private String areaAtuacao;
	private String emailOng;
	private String descricao;
	private String senhaOng;
	
	@OneToMany(mappedBy = "ong")
	private List<DoacaoEntity> doacoes;
	
	@OneToMany(mappedBy = "ong")
	private List<CampanhaEntity> campanhas;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomeFantasia() {
		return nomeFantasia;
	}

	public void setNomeFantasia(String nomeFantasia) {
		this.nomeFantasia = nomeFantasia;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getAreaAtuacao() {
		return areaAtuacao;
	}

	public void setAreaAtuacao(String areaAtuacao) {
		this.areaAtuacao = areaAtuacao;
	}

	public String getEmailOng() {
		return emailOng;
	}

	public void setEmailOng(String emailOng) {
		this.emailOng = emailOng;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public List<DoacaoEntity> getDoacoes() {
		return doacoes;
	}

	public void setDoacoes(List<DoacaoEntity> doacoes) {
		this.doacoes = doacoes;
	}

	public List<CampanhaEntity> getCampanhas() {
		return campanhas;
	}

	public void setCampanhas(List<CampanhaEntity> campanhas) {
		this.campanhas = campanhas;
	}

	public String getSenhaOng() {
		return senhaOng;
	}

	public void setSenhaOng(String senhaOng) {
		this.senhaOng = senhaOng;
	}


	
	
	
	
	
}
