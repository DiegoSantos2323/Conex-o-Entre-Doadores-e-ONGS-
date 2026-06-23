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
@Table(name = "Doacao")
public class DoacaoEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String formaPagamento;
	private float valor;
	private String recibo;
	private LocalDate dataDoacao;
	
	@ManyToOne
	@JoinColumn(name = "camapanhaID")
	private CampanhaEntity campanha;
	
	@ManyToOne
	@JoinColumn(name = "usuarioID")
	private UsuarioEntity usuario;
	//Um doador pode fazer N doações
	
	@ManyToOne
	@JoinColumn(name = "ongID")
	private OngEntity ong;
	//Uma ONG pode receber N doações
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	public LocalDate getDataDoacao() {
		return dataDoacao;
	}

	public void setDataDoacao(LocalDate dataDoacao) {
		this.dataDoacao = dataDoacao;
	}

	public CampanhaEntity getCampanha() {
		return campanha;
	}

	public void setCampanha(CampanhaEntity campanha) {
		this.campanha = campanha;
	}


	public String getFormaPagamento() {
		return formaPagamento;
	}

	public void setFormaPagamento(String formaPagamento) {
		this.formaPagamento = formaPagamento;
	}

	public float getValor() {
		return valor;
	}

	public void setValor(float valor) {
		this.valor = valor;
	}

	public String getRecibo() {
		return recibo;
	}

	public void setRecibo(String recibo) {
		this.recibo = recibo;
	}

	public UsuarioEntity getUsuario() {
		return usuario;
	}

	public void setUsuario(UsuarioEntity usuario) {
		this.usuario = usuario;
	}

	public OngEntity getOng() {
		return ong;
	}

	public void setOng(OngEntity ong) {
		this.ong = ong;
	}
	
	

	
}
