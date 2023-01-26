package com.lue.pcsistel.dto;

import java.io.Serializable;
import java.util.Collection;

public class MOVEstadoDTO implements Serializable {
	private static final long serialVersionUID = -4077669040437510253L;
	private Integer pinCod;
	private String vcNom;
	private Boolean btDef;
	private Integer inMod;
	private boolean btVig;
	private Integer inOrd;
	private Collection<MOVLineaDTO> mOVLineaCollection;
	private Collection<MOVDispositivoDTO> mOVDispositivoCollection;

	public Integer getPinCod() {
		return pinCod;
	}

	public void setPinCod(Integer pinCod) {
		this.pinCod = pinCod;
	}

	public String getVcNom() {
		return vcNom;
	}

	public void setVcNom(String vcNom) {
		this.vcNom = vcNom;
	}

	public Boolean getBtDef() {
		return btDef;
	}

	public void setBtDef(Boolean btDef) {
		this.btDef = btDef;
	}

	public Integer getInMod() {
		return inMod;
	}

	public void setInMod(Integer inMod) {
		this.inMod = inMod;
	}

	public boolean isBtVig() {
		return btVig;
	}

	public void setBtVig(boolean btVig) {
		this.btVig = btVig;
	}

	public Integer getInOrd() {
		return inOrd;
	}

	public void setInOrd(Integer inOrd) {
		this.inOrd = inOrd;
	}

	public Collection<MOVLineaDTO> getmOVLineaCollection() {
		return mOVLineaCollection;
	}

	public void setmOVLineaCollection(Collection<MOVLineaDTO> mOVLineaCollection) {
		this.mOVLineaCollection = mOVLineaCollection;
	}

	public Collection<MOVDispositivoDTO> getmOVDispositivoCollection() {
		return mOVDispositivoCollection;
	}

	public void setmOVDispositivoCollection(Collection<MOVDispositivoDTO> mOVDispositivoCollection) {
		this.mOVDispositivoCollection = mOVDispositivoCollection;
	}

}
