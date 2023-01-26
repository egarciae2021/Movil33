package com.lue.pcsistel.dto;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

public class GENPaisDTO implements Serializable {

	private static final long serialVersionUID = 4897512995577470119L;
	private Integer pinCodPai;
    private String vcNomPai;
    private byte[] imImaPai;
    private Date dtFecIni;
    private Date dtFecFin;
    private Boolean btEst;
    private Collection<GENCulturaDTO> gENCulturaCollection;
	public Integer getPinCodPai() {
		return pinCodPai;
	}
	public void setPinCodPai(Integer pinCodPai) {
		this.pinCodPai = pinCodPai;
	}
	public String getVcNomPai() {
		return vcNomPai;
	}
	public void setVcNomPai(String vcNomPai) {
		this.vcNomPai = vcNomPai;
	}
	public byte[] getImImaPai() {
		return imImaPai;
	}
	public void setImImaPai(byte[] imImaPai) {
		this.imImaPai = imImaPai;
	}
	public Date getDtFecIni() {
		return dtFecIni;
	}
	public void setDtFecIni(Date dtFecIni) {
		this.dtFecIni = dtFecIni;
	}
	public Date getDtFecFin() {
		return dtFecFin;
	}
	public void setDtFecFin(Date dtFecFin) {
		this.dtFecFin = dtFecFin;
	}
	public Boolean getBtEst() {
		return btEst;
	}
	public void setBtEst(Boolean btEst) {
		this.btEst = btEst;
	}
	public Collection<GENCulturaDTO> getgENCulturaCollection() {
		return gENCulturaCollection;
	}
	public void setgENCulturaCollection(Collection<GENCulturaDTO> gENCulturaCollection) {
		this.gENCulturaCollection = gENCulturaCollection;
	}

   
}
