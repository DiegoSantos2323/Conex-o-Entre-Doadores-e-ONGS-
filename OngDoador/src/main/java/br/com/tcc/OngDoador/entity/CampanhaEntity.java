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

	private LocalDate dataInicio;

	private LocalDate dataFim;

	private String status;

	private Integer vidasImpactadas;

	private String descricao;

	private String comDoacaoConseguimos;

	private Float arrecadado;

	private Float metaMensal;

	private Float progresso;

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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getVidasImpactadas() {
		return vidasImpactadas;
	}

	public void setVidasImpactadas(Integer vidasImpactadas) {
		this.vidasImpactadas = vidasImpactadas;
	}

	public String getComDoacaoConseguimos() {
		return comDoacaoConseguimos;
	}

	public void setComDoacaoConseguimos(String comDoacaoConseguimos) {
		this.comDoacaoConseguimos = comDoacaoConseguimos;
	}

	public Float getArrecadado() {
		return arrecadado;
	}

	public void setArrecadado(Float arrecadado) {
		this.arrecadado = arrecadado;
	}

	public Float getProgresso() {
		return progresso;
	}

	public void setProgresso(Float progresso) {
		this.progresso = progresso;
	}

	public void setMetaMensal(Float metaMensal) {
		this.metaMensal = metaMensal;
	}
	



	
}
