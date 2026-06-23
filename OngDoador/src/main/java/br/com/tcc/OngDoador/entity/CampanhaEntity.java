package br.com.tcc.OngDoador.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import javax.persistence.ManyToOne;
import javax.persistence.Table;
@Entity
@Table(name ="Campanha")
public class CampanhaEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nomeCampanha;
	private String causa;
	private String descricao;
	private float metaMensal;
	private LocalDate dataInicio;
	private LocalDate dataFim;
	
	@ManyToOne
	@JoinColumn(name = "ongID")
	private OngEntity ong;
	//Uma ong pode criar N campanhas

	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomeCampanha() {
		return nomeCampanha;
	}

	public void setNomeCampanha(String nomeCampanha) {
		this.nomeCampanha = nomeCampanha;
	}

	public String getCausa() {
		return causa;
	}

	public void setCausa(String causa) {
		this.causa = causa;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public float getMetaMensal() {
		return metaMensal;
	}

	public void setMetaMensal(float metaMensal) {
		this.metaMensal = metaMensal;
	}

	public OngEntity getOng() {
		return ong;
	}

	public void setOng(OngEntity ong) {
		this.ong = ong;
	}

	public LocalDate getDataFim() {
		return dataFim;
	}

	public void setDataFim(LocalDate dataFim) {
		this.dataFim = dataFim;
	}

	public LocalDate getDataInicio() {
		return dataInicio;
	}

	public void setDataInicio(LocalDate dataInicio) {
		this.dataInicio = dataInicio;
	}
	



	
}
