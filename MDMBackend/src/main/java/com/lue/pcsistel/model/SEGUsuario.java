package com.lue.pcsistel.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author lue
 */
@Entity
@Table(name = "SEG_Usuario", catalog = "", schema = "")
@XmlRootElement
@NamedQueries({ @NamedQuery(name = "SEGUsuario.findAll", query = "SELECT s FROM SEGUsuario s"),
		@NamedQuery(name = "SEGUsuario.findByFinCodCli", query = "SELECT s FROM SEGUsuario s WHERE s.sEGUsuarioPK.finCodCli = :finCodCli"),
		@NamedQuery(name = "SEGUsuario.findByPinCod", query = "SELECT s FROM SEGUsuario s WHERE s.sEGUsuarioPK.pinCod = :pinCod"),
		@NamedQuery(name = "SEGUsuario.findByVcNom", query = "SELECT s FROM SEGUsuario s WHERE s.vcNom = :vcNom"),
		@NamedQuery(name = "SEGUsuario.findByVcUsu", query = "SELECT s FROM SEGUsuario s WHERE s.vcUsu = :vcUsu"),
		@NamedQuery(name = "SEGUsuario.findByVcPas", query = "SELECT s FROM SEGUsuario s WHERE s.vcPas = :vcPas"),
		@NamedQuery(name = "SEGUsuario.findByFvcCodInt", query = "SELECT s FROM SEGUsuario s WHERE s.fvcCodInt = :fvcCodInt"),
		@NamedQuery(name = "SEGUsuario.findByCorreo", query = "SELECT s FROM SEGUsuario s WHERE s.correo = :correo"),
		@NamedQuery(name = "SEGUsuario.findByGuidAD", query = "SELECT s FROM SEGUsuario s WHERE s.guidAD = :guidAD"),
		@NamedQuery(name = "SEGUsuario.findByBtEst", query = "SELECT s FROM SEGUsuario s WHERE s.btEst = :btEst"),
		@NamedQuery(name = "SEGUsuario.findByChatActivo", query = "SELECT s FROM SEGUsuario s WHERE s.chatActivo = :chatActivo"),
		@NamedQuery(name = "SEGUsuario.findByCorreoBK", query = "SELECT s FROM SEGUsuario s WHERE s.correoBK = :correoBK"),
		@NamedQuery(name = "SEGUsuario.findByClaveTemporal", query = "SELECT s FROM SEGUsuario s WHERE s.claveTemporal = :claveTemporal"),
		@NamedQuery(name = "SEGUsuario.findByFvcCodSuc", query = "SELECT s FROM SEGUsuario s WHERE s.fvcCodSuc = :fvcCodSuc"),
		@NamedQuery(name = "SEGUsuario.findByDtFecUltAcceso", query = "SELECT s FROM SEGUsuario s WHERE s.dtFecUltAcceso = :dtFecUltAcceso"),
		@NamedQuery(name = "SEGUsuario.findByBtReinicia", query = "SELECT s FROM SEGUsuario s WHERE s.btReinicia = :btReinicia"),
		@NamedQuery(name = "SEGUsuario.findByDtFecRei", query = "SELECT s FROM SEGUsuario s WHERE s.dtFecRei = :dtFecRei"),
		@NamedQuery(name = "SEGUsuario.findByBtBloqueo", query = "SELECT s FROM SEGUsuario s WHERE s.btBloqueo = :btBloqueo"),
		@NamedQuery(name = "SEGUsuario.findByDtFecAcceso", query = "SELECT s FROM SEGUsuario s WHERE s.dtFecAcceso = :dtFecAcceso"),
		@NamedQuery(name = "SEGUsuario.findByDtFecBloqueo", query = "SELECT s FROM SEGUsuario s WHERE s.dtFecBloqueo = :dtFecBloqueo"),
		@NamedQuery(name = "SEGUsuario.findByInIntentos", query = "SELECT s FROM SEGUsuario s WHERE s.inIntentos = :inIntentos"),
		@NamedQuery(name = "SEGUsuario.findByInCodBloqueo", query = "SELECT s FROM SEGUsuario s WHERE s.inCodBloqueo = :inCodBloqueo"),
		@NamedQuery(name = "SEGUsuario.findByIdTemporizador", query = "SELECT s FROM SEGUsuario s WHERE s.idTemporizador = :idTemporizador"),
		@NamedQuery(name = "SEGUsuario.findByDtFecIniActiv", query = "SELECT s FROM SEGUsuario s WHERE s.dtFecIniActiv = :dtFecIniActiv"),
		@NamedQuery(name = "SEGUsuario.findByIdTemporizadorPerfil", query = "SELECT s FROM SEGUsuario s WHERE s.idTemporizadorPerfil = :idTemporizadorPerfil"),
		@NamedQuery(name = "SEGUsuario.findByBtAutorizado", query = "SELECT s FROM SEGUsuario s WHERE s.btAutorizado = :btAutorizado"),
		@NamedQuery(name = "SEGUsuario.findByPassDecrypted", query = "SELECT s FROM SEGUsuario s WHERE s.passDecrypted = :passDecrypted"),
		@NamedQuery(name = "SEGUsuario.countSEGUsuarioIsbtEst", query = "SELECT  count(*) FROM SEGUsuario s "),
		@NamedQuery(name = "SEGUsuario.countByIdAndvcUsu", query = "SELECT count(*) FROM SEGUsuario s WHERE s.sEGUsuarioPK.pinCod=:pinCod OR s.vcUsu=:vcUsu"),
		@NamedQuery(name = "SEGUsuario.findAllByAdminClientId", query = "SELECT s FROM SEGUsuario s WHERE s.sEGUsuarioPK.finCodCli=2"),
		@NamedQuery(name = "SEGUsuario.findSEGUsuAndSEGProfiByVcUsu", query = "SELECT s FROM SEGUsuario as s join s.segPerfils as p WHERE  s.sEGUsuarioPK.pinCod=p.sEGPerfilPK.pinCod and s.vcUsu = :vcUsu"),
		@NamedQuery(name = "SEGUsuario.updateSEGUsESTByPK", query = "update SEGUsuario s set s.btEst=false where s.sEGUsuarioPK.pinCod=:pinCod"),
		@NamedQuery(name = "SEGUsuario.findClientIdByUserName", query = "SELECT s.sEGUsuarioPK.finCodCli FROM SEGUsuario s WHERE s.vcUsu = :vcUsu"),
		@NamedQuery(name = "SEGUsuario.findAllClientUsersNotEqulyAdminCliId", query = "SELECT s FROM SEGUsuario s WHERE s.sEGUsuarioPK.finCodCli!=2"),
		@NamedQuery(name = "SEGUsuario.ifExistUserNameAndEmail", query = "SELECT count(*) FROM SEGUsuario s WHERE s.vcUsu=:vcUsu and s.correo=:correo"),
		@NamedQuery(name = "SEGUsuario.forgotPassword", query = "update SEGUsuario s set s.vcPas=:vcPas where s.vcUsu=:vcUsu"),
		@NamedQuery(name = "SEGUsuario.countUsuarioByClientFk", query = "SELECT count(*) FROM SEGUsuario s WHERE s.sEGUsuarioPK.finCodCli=:finCodCli"),
		@NamedQuery(name = "SEGUsuario.findAllClientUsersByCliId", query = "SELECT s FROM SEGUsuario s WHERE s.sEGUsuarioPK.finCodCli=:finCodCli"),

		@NamedQuery(name = "SEGUsuario.uploadImage", query = "update SEGUsuario s set s.imImagen=:imImagen where s.sEGUsuarioPK.pinCod = :pinCod"),
		@NamedQuery(name = "SEGUsuario.findImageByUserPk", query = "SELECT s.imImagen=:imImagen FROM SEGUsuario s  where s.sEGUsuarioPK.pinCod = :pinCod"),
		@NamedQuery(name = "SEGUsuario.updateMEmpleByUserPK", query = "update SEGUsuario s set s.mEmpl.mEmplPK.eMPLPvcCODEMP=:eMPLPvcCODEMP where s.vcUsu=:vcUsu"),
})//
public class SEGUsuario implements Serializable {

	private static final long serialVersionUID = 1L;
	@EmbeddedId
	protected SEGUsuarioPK sEGUsuarioPK;
	@Column(name = "vcNom", length = 100)
	private String vcNom;
	@Column(name = "vcUsu", length = 30)
	private String vcUsu;
	@Column(name = "vcPas", length = 200)
	private String vcPas;
	@Column(name = "F_vcCodInt", length = 250)
	private String fvcCodInt;
	@Column(name = "Correo", length = 250)
	private String correo;
	@Lob
	@Column(name = "imImagen")
	private byte[] imImagen;
	@Column(name = "GuidAD", length = 36)
	private String guidAD;
	@Column(name = "btEst")
	private Boolean btEst;
	@Column(name = "ChatActivo")
	private Boolean chatActivo;
	@Column(name = "CorreoBK", length = 250)
	private String correoBK;
	@Column(name = "ClaveTemporal", length = 10)
	private String claveTemporal;
	@Column(name = "F_vcCodSuc", length = 50)
	private String fvcCodSuc;
	@Column(name = "dtFecUltAcceso")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dtFecUltAcceso;
	@Basic(optional = false)
	@NotNull
	@Column(name = "btReinicia", nullable = false)
	private boolean btReinicia;
	@Column(name = "dtFecRei")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dtFecRei;
	@Basic(optional = false)
	@NotNull
	@Column(name = "btBloqueo", nullable = false)
	private boolean btBloqueo;
	@Column(name = "dtFecAcceso")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dtFecAcceso;
	@Column(name = "dtFecBloqueo")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dtFecBloqueo;
	@Column(name = "inIntentos")
	private Integer inIntentos;
	@Column(name = "inCodBloqueo")
	private Integer inCodBloqueo;
	@Column(name = "IdTemporizador")
	private Integer idTemporizador;
	@Column(name = "dtFecIniActiv")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dtFecIniActiv;
	@Column(name = "IdTemporizadorPerfil")
	private Integer idTemporizadorPerfil;
	@Column(name = "btAutorizado")
	private Boolean btAutorizado;
	@Size(max = 200)
	@Column(name = "PassDecrypted", length = 200)
	private String passDecrypted;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "segUsuario")
	private Collection<SEGPerfil> segPerfils;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "sEGUsuario")
	private Collection<SEGUsuarioConfiguracion> sEGUsuarioConfiguracions;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "sEGUsuario")
	private Collection<SEGUsuarioHistorico> sEGUsuarioHistoricoCollection;

	//F_vcCodEmp
	@JoinColumns({
			@JoinColumn(name = "F_inCodCli", referencedColumnName = "F_inCodCli", insertable = false, updatable = false),
			@JoinColumn(name = "F_vcCodEmp", referencedColumnName = "EMPL_P_vcCODEMP", insertable = false, updatable = false) })
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	private MEmpl mEmpl;

	public SEGUsuario() {
	}

	public SEGUsuario(SEGUsuarioPK sEGUsuarioPK) {
		this.sEGUsuarioPK = sEGUsuarioPK;
	}

	public SEGUsuario(SEGUsuarioPK sEGUsuarioPK, boolean btReinicia, boolean btBloqueo) {
		this.sEGUsuarioPK = sEGUsuarioPK;
		this.btReinicia = btReinicia;
		this.btBloqueo = btBloqueo;
	}

	public Collection<SEGPerfil> getSegPerfils() {
		return segPerfils;
	}

	public void setSegPerfils(Collection<SEGPerfil> segPerfils) {
		this.segPerfils = segPerfils;
	}

	public Collection<SEGUsuarioConfiguracion> getsEGUsuarioConfiguracions() {
		return sEGUsuarioConfiguracions;
	}

	public void setsEGUsuarioConfiguracions(Collection<SEGUsuarioConfiguracion> sEGUsuarioConfiguracions) {
		this.sEGUsuarioConfiguracions = sEGUsuarioConfiguracions;
	}

	public SEGUsuario(int finCodCli, int pinCod) {
		this.sEGUsuarioPK = new SEGUsuarioPK(finCodCli, pinCod);
	}

	public SEGUsuarioPK getSEGUsuarioPK() {
		return sEGUsuarioPK;
	}

	public void setSEGUsuarioPK(SEGUsuarioPK sEGUsuarioPK) {
		this.sEGUsuarioPK = sEGUsuarioPK;
	}

	public String getVcNom() {
		return vcNom;
	}

	public void setVcNom(String vcNom) {
		this.vcNom = vcNom;
	}

	public String getVcUsu() {
		return vcUsu;
	}

	public void setVcUsu(String vcUsu) {
		this.vcUsu = vcUsu;
	}

	public String getVcPas() {
		return vcPas;
	}

	public void setVcPas(String vcPas) {
		this.vcPas = vcPas;
	}

	public String getFvcCodInt() {
		return fvcCodInt;
	}

	public void setFvcCodInt(String fvcCodInt) {
		this.fvcCodInt = fvcCodInt;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public byte[] getImImagen() {
		return imImagen;
	}

	public void setImImagen(byte[] imImagen) {
		this.imImagen = imImagen;
	}

	public String getGuidAD() {
		return guidAD;
	}

	public void setGuidAD(String guidAD) {
		this.guidAD = guidAD;
	}

	public Boolean getBtEst() {
		return btEst;
	}

	public void setBtEst(Boolean btEst) {
		this.btEst = btEst;
	}

	public Boolean getChatActivo() {
		return chatActivo;
	}

	public void setChatActivo(Boolean chatActivo) {
		this.chatActivo = chatActivo;
	}

	public String getCorreoBK() {
		return correoBK;
	}

	public void setCorreoBK(String correoBK) {
		this.correoBK = correoBK;
	}

	public String getClaveTemporal() {
		return claveTemporal;
	}

	public void setClaveTemporal(String claveTemporal) {
		this.claveTemporal = claveTemporal;
	}

	public String getFvcCodSuc() {
		return fvcCodSuc;
	}

	public void setFvcCodSuc(String fvcCodSuc) {
		this.fvcCodSuc = fvcCodSuc;
	}

	public Date getDtFecUltAcceso() {
		return dtFecUltAcceso;
	}

	public void setDtFecUltAcceso(Date dtFecUltAcceso) {
		this.dtFecUltAcceso = dtFecUltAcceso;
	}

	public boolean getBtReinicia() {
		return btReinicia;
	}

	public void setBtReinicia(boolean btReinicia) {
		this.btReinicia = btReinicia;
	}

	public Date getDtFecRei() {
		return dtFecRei;
	}

	public void setDtFecRei(Date dtFecRei) {
		this.dtFecRei = dtFecRei;
	}

	public boolean getBtBloqueo() {
		return btBloqueo;
	}

	public void setBtBloqueo(boolean btBloqueo) {
		this.btBloqueo = btBloqueo;
	}

	public Date getDtFecAcceso() {
		return dtFecAcceso;
	}

	public void setDtFecAcceso(Date dtFecAcceso) {
		this.dtFecAcceso = dtFecAcceso;
	}

	public Date getDtFecBloqueo() {
		return dtFecBloqueo;
	}

	public void setDtFecBloqueo(Date dtFecBloqueo) {
		this.dtFecBloqueo = dtFecBloqueo;
	}

	public Integer getInIntentos() {
		return inIntentos;
	}

	public void setInIntentos(Integer inIntentos) {
		this.inIntentos = inIntentos;
	}

	public Integer getInCodBloqueo() {
		return inCodBloqueo;
	}

	public void setInCodBloqueo(Integer inCodBloqueo) {
		this.inCodBloqueo = inCodBloqueo;
	}

	public Integer getIdTemporizador() {
		return idTemporizador;
	}

	public void setIdTemporizador(Integer idTemporizador) {
		this.idTemporizador = idTemporizador;
	}

	public Date getDtFecIniActiv() {
		return dtFecIniActiv;
	}

	public void setDtFecIniActiv(Date dtFecIniActiv) {
		this.dtFecIniActiv = dtFecIniActiv;
	}

	public Integer getIdTemporizadorPerfil() {
		return idTemporizadorPerfil;
	}

	public void setIdTemporizadorPerfil(Integer idTemporizadorPerfil) {
		this.idTemporizadorPerfil = idTemporizadorPerfil;
	}

	public Boolean getBtAutorizado() {
		return btAutorizado;
	}

	public void setBtAutorizado(Boolean btAutorizado) {
		this.btAutorizado = btAutorizado;
	}

	public String getPassDecrypted() {
		return passDecrypted;
	}

	public void setPassDecrypted(String passDecrypted) {
		this.passDecrypted = passDecrypted;
	}

	public MEmpl getMEmpl() {
		return mEmpl;
	}

	public void setMEmpl(MEmpl mEmpl) {
		this.mEmpl = mEmpl;
	}

	@XmlTransient
	public Collection<SEGUsuarioHistorico> getSEGUsuarioHistoricoCollection() {
		return sEGUsuarioHistoricoCollection;
	}

	public void setSEGUsuarioHistoricoCollection(Collection<SEGUsuarioHistorico> sEGUsuarioHistoricoCollection) {
		this.sEGUsuarioHistoricoCollection = sEGUsuarioHistoricoCollection;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (sEGUsuarioPK != null ? sEGUsuarioPK.hashCode() : 0);
		return hash;
	}

	public void setsEGUsuarioConfiguracions(Set<SEGUsuarioConfiguracion> sEGUsuarioConfiguracions) {
		this.sEGUsuarioConfiguracions = sEGUsuarioConfiguracions;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are
		// not set
		if (!(object instanceof SEGUsuario)) {
			return false;
		}
		SEGUsuario other = (SEGUsuario) object;
		if ((this.sEGUsuarioPK == null && other.sEGUsuarioPK != null)
				|| (this.sEGUsuarioPK != null && !this.sEGUsuarioPK.equals(other.sEGUsuarioPK))) {
			return false;
		}
		return true;
	}

}
