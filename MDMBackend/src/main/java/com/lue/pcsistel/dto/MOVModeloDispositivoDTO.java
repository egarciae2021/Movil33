package com.lue.pcsistel.dto;

import java.io.Serializable;
import java.util.Collection;
/**
 *
 * @author lue
 */
public class MOVModeloDispositivoDTO implements Serializable {

	private static final long serialVersionUID = -680927845959393922L;
	private Integer pinCod;
	private String vcNom;
	private String vcDes;
	private byte[] imIma;
	private boolean btVig;
	private Integer inEst;
	private Integer finCodTipSer;
	private String picTipMod;
	private Boolean btSopLin;
	private String vcTipoChip;
	private Boolean btMosEnSol;
	private String vcMarcaModelo;
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
	public String getVcDes() {
		return vcDes;
	}
	public void setVcDes(String vcDes) {
		this.vcDes = vcDes;
	}
	public byte[] getImIma() {
		return imIma;
	}
	public void setImIma(byte[] imIma) {
		this.imIma = imIma;
	}
	public boolean isBtVig() {
		return btVig;
	}
	public void setBtVig(boolean btVig) {
		this.btVig = btVig;
	}
	public Integer getInEst() {
		return inEst;
	}
	public void setInEst(Integer inEst) {
		this.inEst = inEst;
	}
	public Integer getFinCodTipSer() {
		return finCodTipSer;
	}
	public void setFinCodTipSer(Integer finCodTipSer) {
		this.finCodTipSer = finCodTipSer;
	}
	public String getPicTipMod() {
		return picTipMod;
	}
	public void setPicTipMod(String picTipMod) {
		this.picTipMod = picTipMod;
	}
	public Boolean getBtSopLin() {
		return btSopLin;
	}
	public void setBtSopLin(Boolean btSopLin) {
		this.btSopLin = btSopLin;
	}
	public String getVcTipoChip() {
		return vcTipoChip;
	}
	public void setVcTipoChip(String vcTipoChip) {
		this.vcTipoChip = vcTipoChip;
	}
	public Boolean getBtMosEnSol() {
		return btMosEnSol;
	}
	public void setBtMosEnSol(Boolean btMosEnSol) {
		this.btMosEnSol = btMosEnSol;
	}
	public String getVcMarcaModelo() {
		return vcMarcaModelo;
	}
	public void setVcMarcaModelo(String vcMarcaModelo) {
		this.vcMarcaModelo = vcMarcaModelo;
	}
	public Collection<MOVDispositivoDTO> getmOVDispositivoCollection() {
		return mOVDispositivoCollection;
	}
	public void setmOVDispositivoCollection(Collection<MOVDispositivoDTO> mOVDispositivoCollection) {
		this.mOVDispositivoCollection = mOVDispositivoCollection;
	}

	
	
}
