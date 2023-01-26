package com.lue.pcsistel.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;


public class MOrgaDTO implements Serializable {
	private static final long serialVersionUID = 8831632539434738557L;
	protected MOrgaPKDTO mOrgaPK=new MOrgaPKDTO();
	private String oRGAvcCODORG;
	private String oRGAvcNOMORG;
	private String oRGAvcCORPER;
	private String oRGAvcCORJFT;
	private Date oRGAdaFECINI;
	private Date oRGAdaFECFIN;
	private boolean oRGAbtEST;
	private String oRGACodInt2;

	private GENClienteDTO gENCliente=new GENClienteDTO();
	private Collection<MEmplDTO> mEmplCollection=new ArrayList<MEmplDTO>();

	public MOrgaPKDTO getmOrgaPK() {
		return mOrgaPK;
	}

	public void setmOrgaPK(MOrgaPKDTO mOrgaPK) {
		this.mOrgaPK = mOrgaPK;
	}

	public String getoRGAvcCODORG() {
		return oRGAvcCODORG;
	}

	public void setoRGAvcCODORG(String oRGAvcCODORG) {
		this.oRGAvcCODORG = oRGAvcCODORG;
	}

	public String getoRGAvcNOMORG() {
		return oRGAvcNOMORG;
	}

	public void setoRGAvcNOMORG(String oRGAvcNOMORG) {
		this.oRGAvcNOMORG = oRGAvcNOMORG;
	}

	public String getoRGAvcCORPER() {
		return oRGAvcCORPER;
	}

	public void setoRGAvcCORPER(String oRGAvcCORPER) {
		this.oRGAvcCORPER = oRGAvcCORPER;
	}

	public String getoRGAvcCORJFT() {
		return oRGAvcCORJFT;
	}

	public void setoRGAvcCORJFT(String oRGAvcCORJFT) {
		this.oRGAvcCORJFT = oRGAvcCORJFT;
	}

	public Date getoRGAdaFECINI() {
		return oRGAdaFECINI;
	}

	public void setoRGAdaFECINI(Date oRGAdaFECINI) {
		this.oRGAdaFECINI = oRGAdaFECINI;
	}

	public Date getoRGAdaFECFIN() {
		return oRGAdaFECFIN;
	}

	public void setoRGAdaFECFIN(Date oRGAdaFECFIN) {
		this.oRGAdaFECFIN = oRGAdaFECFIN;
	}

	public boolean isoRGAbtEST() {
		return oRGAbtEST;
	}

	public void setoRGAbtEST(boolean oRGAbtEST) {
		this.oRGAbtEST = oRGAbtEST;
	}

	public String getoRGACodInt2() {
		return oRGACodInt2;
	}

	public void setoRGACodInt2(String oRGACodInt2) {
		this.oRGACodInt2 = oRGACodInt2;
	}

	public GENClienteDTO getgENCliente() {
		return gENCliente;
	}

	public void setgENCliente(GENClienteDTO gENCliente) {
		this.gENCliente = gENCliente;
	}

	public Collection<MEmplDTO> getmEmplCollection() {
		return mEmplCollection;
	}

	public void setmEmplCollection(Collection<MEmplDTO> mEmplCollection) {
		this.mEmplCollection = mEmplCollection;
	}

}
