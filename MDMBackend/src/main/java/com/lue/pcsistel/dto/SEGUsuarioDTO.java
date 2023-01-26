package com.lue.pcsistel.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

public class SEGUsuarioDTO implements Serializable {
	private static final long serialVersionUID = 1428770571412152561L;
	protected SEGUsuarioPKDTO sEGUsuarioPK = new SEGUsuarioPKDTO();
	private String vcNom;
	private String vcUsu;
	private String vcPas;
	private String fvcCodInt;
	private String correo;
	private byte[] imImagen;
	private String guidAD;
	private Boolean btEst;
	private Boolean chatActivo;
	private String correoBK;
	private String claveTemporal;
	private String fvcCodSuc;
	private Date dtFecUltAcceso;
	private boolean btReinicia;
	private Date dtFecRei;
	private boolean btBloqueo;
	private Date dtFecAcceso;
	private Date dtFecBloqueo;
	private Integer inIntentos;
	private Integer inCodBloqueo;
	private Integer idTemporizador;
	private Date dtFecIniActiv;
	private Integer idTemporizadorPerfil;
	private Boolean btAutorizado;
	private String passDecrypted;
	private String image;
	

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	private Set<SEGPerfilDTO> segPerfils;
	private Set<SEGUsuarioConfiguracionDTO> sEGUsuarioConfiguracions;

	private MEmplDTO mEmpl = new MEmplDTO();
	private Collection<SEGUsuarioHistoricoDTO> sEGUsuarioHistoricoCollection = new ArrayList<>();

	public SEGUsuarioPKDTO getsEGUsuarioPK() {
		return sEGUsuarioPK;
	}

	public void setsEGUsuarioPK(SEGUsuarioPKDTO sEGUsuarioPK) {
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

	public boolean isBtReinicia() {
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

	public boolean isBtBloqueo() {
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

	public MEmplDTO getmEmpl() {
		return mEmpl;
	}

	public Set<SEGPerfilDTO> getSegPerfils() {
		return segPerfils;
	}

	public void setSegPerfils(Set<SEGPerfilDTO> segPerfils) {
		this.segPerfils = segPerfils;
	}

	public Set<SEGUsuarioConfiguracionDTO> getsEGUsuarioConfiguracions() {
		return sEGUsuarioConfiguracions;
	}

	public void setsEGUsuarioConfiguracions(Set<SEGUsuarioConfiguracionDTO> sEGUsuarioConfiguracions) {
		this.sEGUsuarioConfiguracions = sEGUsuarioConfiguracions;
	}

	public Collection<SEGUsuarioHistoricoDTO> getsEGUsuarioHistoricoCollection() {
		return sEGUsuarioHistoricoCollection;
	}

	public void setsEGUsuarioHistoricoCollection(Collection<SEGUsuarioHistoricoDTO> sEGUsuarioHistoricoCollection) {
		this.sEGUsuarioHistoricoCollection = sEGUsuarioHistoricoCollection;
	}

}
