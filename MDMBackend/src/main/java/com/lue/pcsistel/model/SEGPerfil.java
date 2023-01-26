/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lue.pcsistel.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author lue
 */

@XmlRootElement
@NamedQueries({ @NamedQuery(name = "SEGPerfil.findAll", query = "SELECT s FROM SEGPerfil s"),
		@NamedQuery(name = "SEGPerfil.findByFinCodCli", query = "SELECT s FROM SEGPerfil s WHERE s.sEGPerfilPK.finCodCli = :finCodCli"),
		@NamedQuery(name = "SEGPerfil.findByPinCod", query = "SELECT s FROM SEGPerfil s WHERE s.sEGPerfilPK.pinCod = :pinCod"),
		@NamedQuery(name = "SEGPerfil.findByVcNom", query = "SELECT s FROM SEGPerfil s WHERE s.vcNom = :vcNom"),
		@NamedQuery(name = "SEGPerfil.findByIdTemporizador", query = "SELECT s FROM SEGPerfil s WHERE s.idTemporizador = :idTemporizador"),
		@NamedQuery(name = "SEGPerfil.findByFinCodTipDashMovil", query = "SELECT s FROM SEGPerfil s WHERE s.finCodTipDashMovil = :finCodTipDashMovil"),
		@NamedQuery(name = "SEGPerfil.findByFinCodTipDashEmpl", query = "SELECT s FROM SEGPerfil s WHERE s.finCodTipDashEmpl = :finCodTipDashEmpl"),
		@NamedQuery(name = "SEGPerfil.findByFinCodTipConsumo", query = "SELECT s FROM SEGPerfil s WHERE s.finCodTipConsumo = :finCodTipConsumo"),
		@NamedQuery(name = "SEGPerfil.findByFinCodTipGeneral", query = "SELECT s FROM SEGPerfil s WHERE s.finCodTipGeneral = :finCodTipGeneral"),
		@NamedQuery(name = "SEGPerfil.findByBtVig", query = "SELECT s FROM SEGPerfil s WHERE s.btVig = :btVig"),
		@NamedQuery(name = "SEGPerfil.findByCodigoPerfil", query = "SELECT s FROM SEGPerfil s WHERE s.codigoPerfil = :codigoPerfil") ,
		@NamedQuery(name = "SEGPerfil.findRoleByCliIdAndUserId", query = "SELECT s.vcNom FROM SEGPerfil s WHERE s.sEGPerfilPK.finCodCli=:finCodCli AND s.sEGPerfilPK.pinCod=:pinCod")

})
@Entity
@Table(name = "SEG_Perfil", catalog = "", schema = "")
public class SEGPerfil implements Serializable {

	private static final long serialVersionUID = 1L;
	@EmbeddedId
	protected SEGPerfilPK sEGPerfilPK;
	@Size(max = 35)
	@Column(name = "vcNom", length = 35)
	private String vcNom;
	@Column(name = "IdTemporizador")
	private Integer idTemporizador;
	@Basic(optional = false)
	@NotNull
	@Column(name = "F_inCodTip_DashMovil", nullable = false)
	private int finCodTipDashMovil;
	@Basic(optional = false)
	@NotNull
	@Column(name = "F_inCodTip_DashEmpl", nullable = false)
	private int finCodTipDashEmpl;
	@Basic(optional = false)
	@NotNull
	@Column(name = "F_inCodTip_Consumo", nullable = false)
	private int finCodTipConsumo;
	@Column(name = "F_inCodTip_General")
	private Integer finCodTipGeneral;
	@Column(name = "btVig")
	private Boolean btVig;
	@Size(max = 10)
	@Column(name = "CodigoPerfil", length = 10)
	private String codigoPerfil;

	@JoinColumns({ 
			@JoinColumn(name = "F_inCodCli", referencedColumnName = "F_inCodCli",insertable = false, updatable = false),
			@JoinColumn(name = "P_inCod", referencedColumnName = "P_inCod",insertable = false, updatable = false) })
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	private SEGUsuario segUsuario;

	
	/*@OneToOne(mappedBy = "segPerfil")
	private SEGPerfilUsuario  segPerfilUsuario;
	
	
	
	public SEGPerfilUsuario getSegPerfilUsuario() {
		return segPerfilUsuario;
	}

	public void setSegPerfilUsuario(SEGPerfilUsuario segPerfilUsuario) {
		this.segPerfilUsuario = segPerfilUsuario;
	}
*/
	public SEGPerfil() {
	}

	public SEGPerfil(SEGPerfilPK sEGPerfilPK) {
		this.sEGPerfilPK = sEGPerfilPK;
	}

	public SEGPerfil(SEGPerfilPK sEGPerfilPK, int finCodTipDashMovil, int finCodTipDashEmpl, int finCodTipConsumo) {
		this.sEGPerfilPK = sEGPerfilPK;
		this.finCodTipDashMovil = finCodTipDashMovil;
		this.finCodTipDashEmpl = finCodTipDashEmpl;
		this.finCodTipConsumo = finCodTipConsumo;
	}

	public SEGPerfil(int finCodCli, int pinCod) {
		this.sEGPerfilPK = new SEGPerfilPK(finCodCli, pinCod);
	}

	public SEGPerfilPK getSEGPerfilPK() {
		return sEGPerfilPK;
	}

	public void setSEGPerfilPK(SEGPerfilPK sEGPerfilPK) {
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

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (sEGPerfilPK != null ? sEGPerfilPK.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are
		// not set
		if (!(object instanceof SEGPerfil)) {
			return false;
		}
		SEGPerfil other = (SEGPerfil) object;
		if ((this.sEGPerfilPK == null && other.sEGPerfilPK != null)
				|| (this.sEGPerfilPK != null && !this.sEGPerfilPK.equals(other.sEGPerfilPK))) {
			return false;
		}
		return true;
	}

	public SEGUsuario getSegUsuario() {
		return segUsuario;
	}

	public void setSegUsuario(SEGUsuario segUsuario) {
		this.segUsuario = segUsuario;
	}

	 
}
