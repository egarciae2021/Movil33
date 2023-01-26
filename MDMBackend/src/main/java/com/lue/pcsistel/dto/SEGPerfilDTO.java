/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lue.pcsistel.dto;

import java.io.Serializable;

/**
 *
 * @author lue
 */
public class SEGPerfilDTO implements Serializable {
	private static final long serialVersionUID = 7433523717127373171L;
	protected SEGPerfilPKDTO sEGPerfilPK;
	private String vcNom;
	private Integer idTemporizador;
	private int finCodTipDashMovil;
	private int finCodTipDashEmpl;
	private int finCodTipConsumo;
	private Integer finCodTipGeneral;
	private Boolean btVig;
	private String codigoPerfil;
	private SEGUsuarioDTO segUsuario;
	public SEGPerfilPKDTO getsEGPerfilPK() {
		return sEGPerfilPK;
	}
	public void setsEGPerfilPK(SEGPerfilPKDTO sEGPerfilPK) {
		this.sEGPerfilPK = sEGPerfilPK;
	}
	public String getVcNom() {
		return vcNom;
	}
	public void setVcNom(String vcNom) {
		this.vcNom = vcNom;
	}
	public Integer getIdTemporizador() {
		return idTemporizador;
	}
	public void setIdTemporizador(Integer idTemporizador) {
		this.idTemporizador = idTemporizador;
	}
	public int getFinCodTipDashMovil() {
		return finCodTipDashMovil;
	}
	public void setFinCodTipDashMovil(int finCodTipDashMovil) {
		this.finCodTipDashMovil = finCodTipDashMovil;
	}
	public int getFinCodTipDashEmpl() {
		return finCodTipDashEmpl;
	}
	public void setFinCodTipDashEmpl(int finCodTipDashEmpl) {
		this.finCodTipDashEmpl = finCodTipDashEmpl;
	}
	public int getFinCodTipConsumo() {
		return finCodTipConsumo;
	}
	public void setFinCodTipConsumo(int finCodTipConsumo) {
		this.finCodTipConsumo = finCodTipConsumo;
	}
	public Integer getFinCodTipGeneral() {
		return finCodTipGeneral;
	}
	public void setFinCodTipGeneral(Integer finCodTipGeneral) {
		this.finCodTipGeneral = finCodTipGeneral;
	}
	public Boolean getBtVig() {
		return btVig;
	}
	public void setBtVig(Boolean btVig) {
		this.btVig = btVig;
	}
	public String getCodigoPerfil() {
		return codigoPerfil;
	}
	public void setCodigoPerfil(String codigoPerfil) {
		this.codigoPerfil = codigoPerfil;
	}
	public SEGUsuarioDTO getSegUsuario() {
		return segUsuario;
	}
	public void setSegUsuario(SEGUsuarioDTO segUsuario) {
		this.segUsuario = segUsuario;
	}
	


}
