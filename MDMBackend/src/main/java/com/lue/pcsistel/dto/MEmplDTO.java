package com.lue.pcsistel.dto;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

public class MEmplDTO implements Serializable {
	private static final long serialVersionUID = 4945244584906880179L;
	protected MEmplPKDTO mEmplPK=new MEmplPKDTO();
	private String eMPLvcNOMEMP;
	private String eMPLvcUBIFIS;
	private String eMPLvcCORPER;
	private String eMPLvcCORJFT;
	private Date eMPLdaFECINI;
	private Date eMPLdaFECFIN;
	private boolean eMPLbtEST;
	private String eMPLCodInt2;
	
	private Collection<MOVLineaDTO> mOVLineaCollection;
	private Collection<SEGUsuarioDTO> sEGUsuarioCollection;
	private Collection<MOVDispositivoDTO> mOVDispositivoCollection;
	private MOrgaDTO mOrga=new MOrgaDTO();
	
	private int eMPLFinCODGRUORI;
	
	//private String currentDate;

	
	public MEmplPKDTO getmEmplPK() {
		return mEmplPK;
	}

	public void setmEmplPK(MEmplPKDTO mEmplPK) {
		this.mEmplPK = mEmplPK;
	}

	public String geteMPLvcNOMEMP() {
		return eMPLvcNOMEMP;
	}

	public void seteMPLvcNOMEMP(String eMPLvcNOMEMP) {
		this.eMPLvcNOMEMP = eMPLvcNOMEMP;
	}
	
	public int geteMPLFinCODGRUORI() {
		return eMPLFinCODGRUORI;
	}

	public void seteMPLFinCODGRUORI(int eMPLFinCODGRUORI) {
		this.eMPLFinCODGRUORI = eMPLFinCODGRUORI;
	}

	public String geteMPLvcUBIFIS() {
		return eMPLvcUBIFIS;
	}

	public void seteMPLvcUBIFIS(String eMPLvcUBIFIS) {
		this.eMPLvcUBIFIS = eMPLvcUBIFIS;
	}

	public String geteMPLvcCORPER() {
		return eMPLvcCORPER;
	}

	public void seteMPLvcCORPER(String eMPLvcCORPER) {
		this.eMPLvcCORPER = eMPLvcCORPER;
	}

	public String geteMPLvcCORJFT() {
		return eMPLvcCORJFT;
	}

	public void seteMPLvcCORJFT(String eMPLvcCORJFT) {
		this.eMPLvcCORJFT = eMPLvcCORJFT;
	}

	public Date geteMPLdaFECINI() {
		return eMPLdaFECINI;
	}

	public void seteMPLdaFECINI(Date eMPLdaFECINI) {
		this.eMPLdaFECINI = eMPLdaFECINI;
	}

	public Date geteMPLdaFECFIN() {
		return eMPLdaFECFIN;
	}

	public void seteMPLdaFECFIN(Date eMPLdaFECFIN) {
		this.eMPLdaFECFIN = eMPLdaFECFIN;
	}

	public boolean iseMPLbtEST() {
		return eMPLbtEST;
	}

	public void seteMPLbtEST(boolean eMPLbtEST) {
		this.eMPLbtEST = eMPLbtEST;
	}

	public String geteMPLCodInt2() {
		return eMPLCodInt2;
	}

	public void seteMPLCodInt2(String eMPLCodInt2) {
		this.eMPLCodInt2 = eMPLCodInt2;
	}

	public Collection<MOVLineaDTO> getmOVLineaCollection() {
		return mOVLineaCollection;
	}

	public void setmOVLineaCollection(Collection<MOVLineaDTO> mOVLineaCollection) {
		this.mOVLineaCollection = mOVLineaCollection;
	}

	public Collection<SEGUsuarioDTO> getsEGUsuarioCollection() {
		return sEGUsuarioCollection;
	}

	public void setsEGUsuarioCollection(Collection<SEGUsuarioDTO> sEGUsuarioCollection) {
		this.sEGUsuarioCollection = sEGUsuarioCollection;
	}

	public Collection<MOVDispositivoDTO> getmOVDispositivoCollection() {
		return mOVDispositivoCollection;
	}

	public void setmOVDispositivoCollection(Collection<MOVDispositivoDTO> mOVDispositivoCollection) {
		this.mOVDispositivoCollection = mOVDispositivoCollection;
	}

	public MOrgaDTO getmOrga() {
		return mOrga;
	}

	public void setmOrga(MOrgaDTO mOrga) {
		this.mOrga = mOrga;
	}

}
