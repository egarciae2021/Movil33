
package com.lue.pcsistel.dto;

import java.io.Serializable;
import java.util.Date;
/**
 *
 * @author lue
 */
public class SEGUsuarioHistoricoDTO implements Serializable {
	private static final long serialVersionUID = -6234604295755889073L;
	protected SEGUsuarioHistoricoPKDTO sEGUsuarioHistoricoPK=new SEGUsuarioHistoricoPKDTO();
	private Date daFecAut;
	private String accion;
	private String descripcion;
	private String ip;
	private String navegador;
	private String servidor;
	private SEGUsuarioDTO sEGUsuario;
	public SEGUsuarioHistoricoPKDTO getsEGUsuarioHistoricoPK() {
		return sEGUsuarioHistoricoPK;
	}
	public void setsEGUsuarioHistoricoPK(SEGUsuarioHistoricoPKDTO sEGUsuarioHistoricoPK) {
		this.sEGUsuarioHistoricoPK = sEGUsuarioHistoricoPK;
	}
	public Date getDaFecAut() {
		return daFecAut;
	}
	public void setDaFecAut(Date daFecAut) {
		this.daFecAut = daFecAut;
	}
	public String getAccion() {
		return accion;
	}
	public void setAccion(String accion) {
		this.accion = accion;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getNavegador() {
		return navegador;
	}
	public void setNavegador(String navegador) {
		this.navegador = navegador;
	}
	public String getServidor() {
		return servidor;
	}
	public void setServidor(String servidor) {
		this.servidor = servidor;
	}
	public SEGUsuarioDTO getsEGUsuario() {
		return sEGUsuario;
	}
	public void setsEGUsuario(SEGUsuarioDTO sEGUsuario) {
		this.sEGUsuario = sEGUsuario;
	}
	

}
