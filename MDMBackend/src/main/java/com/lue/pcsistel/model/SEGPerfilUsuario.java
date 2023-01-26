/*package com.lue.pcsistel.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

*//**
 *
 * @author lue
 *//*
@Entity
@Table(name = "SEG_PerfilUsuario", catalog = "", schema = "")
public class SEGPerfilUsuario implements Serializable {
	private static final long serialVersionUID = 103476909320660477L;

	@Id
	@GenericGenerator(strategy = "increment", name = "SEGPerfilUsuarioId")
	@GeneratedValue(generator = "SEGPerfilUsuarioId")
	@Column(name = "id")
	private Long id;
	
	@OneToOne
	@JoinColumns({
		@JoinColumn(name = "F_ClientId", referencedColumnName = "F_inCodCli", insertable = true, updatable = false),
		@JoinColumn(name = "F_userId", referencedColumnName = "P_inCod", insertable = true, updatable = false) })
	private SEGUsuario segUsuario;
	
	
	
	@OneToOne
	@JoinColumns({
		@JoinColumn(name = "F_ClientId", referencedColumnName = "F_inCodCli", insertable = false, updatable = false),
		@JoinColumn(name = "F_Role", referencedColumnName = "P_inCod", insertable = false, updatable = false) })
	private SEGPerfil segPerfil;

	
	
	public SEGPerfil getSegPerfil() {
		return segPerfil;
	}

	public void setSegPerfil(SEGPerfil segPerfil) {
		this.segPerfil = segPerfil;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public SEGUsuario getSegUsuario() {
		return segUsuario;
	}

	public void setSegUsuario(SEGUsuario segUsuario) {
		this.segUsuario = segUsuario;
	}
	
	
	
	
}
*/