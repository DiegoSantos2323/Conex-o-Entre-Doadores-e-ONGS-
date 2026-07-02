package br.com.tcc.OngDoador.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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
	private String logo;
	private LocalDate dataFundacao;
	private String telefone;

	@OneToMany(mappedBy = "ong")
	private List<DoacaoEntity> doacoes;
	
	@OneToMany(mappedBy = "ong")
	private List<CampanhaEntity> campanhas;

	@OneToOne(mappedBy = "ong")
	private GestorEntity gestor;
	
	
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

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public LocalDate getDataFundacao() {
		return dataFundacao;
	}

	public void setDataFundacao(LocalDate dataFundacao) {
		this.dataFundacao = dataFundacao;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public GestorEntity getGestor() {
		return gestor;
	}

	public void setGestor(GestorEntity gestor) {
		this.gestor = gestor;
	}



	
	
	
	
	
}
