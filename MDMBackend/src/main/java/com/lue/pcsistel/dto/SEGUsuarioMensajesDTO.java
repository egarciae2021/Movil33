package com.lue.pcsistel.dto;

import java.io.Serializable;

/**
 *
 * @author lue
 */
public class SEGUsuarioMensajesDTO implements Serializable {
	private static final long serialVersionUID = 7337676869939850999L;
	private Integer idMensaje;
	private String vcCodMensaje;
	private String vcMensaje;

	public Integer getIdMensaje() {
		return idMensaje;
	}

	public void setIdMensaje(Integer idMensaje) {
		this.idMensaje = idMensaje;
	}

	public String getVcCodMensaje() {
		return vcCodMensaje;
	}

	public void setVcCodMensaje(String vcCodMensaje) {
		this.vcCodMensaje = vcCodMensaje;
	}

	public String getVcMensaje() {
		return vcMensaje;
	}

	public void setVcMensaje(String vcMensaje) {
		this.vcMensaje = vcMensaje;
	}

}
