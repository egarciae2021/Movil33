package com.lue.pcsistel.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

public class GENClienteDTO implements Serializable {
	private static final long serialVersionUID = -2828251663055594792L;
	private Integer pinCodCli;
	private String vcNomCli;
	private Integer btEst;
	private String vcRuc;
	private String vcDireccion;
	private byte[] imLogo;
	private Collection<MOrgaDTO> mOrgaCollection=new ArrayList<>();
	private GENCulturaDTO inIdCultura=new GENCulturaDTO();
	private String image;
	

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Integer getPinCodCli() {
		return pinCodCli;
	}

	public void setPinCodCli(Integer pinCodCli) {
		this.pinCodCli = pinCodCli;
	}

	public String getVcNomCli() {
		return vcNomCli;
	}

	public void setVcNomCli(String vcNomCli) {
		this.vcNomCli = vcNomCli;
	}

	public Integer getBtEst() {
		return btEst;
	}

	public void setBtEst(Integer btEst) {
		this.btEst = btEst;
	}

	public String getVcRuc() {
		return vcRuc;
	}

	public void setVcRuc(String vcRuc) {
		this.vcRuc = vcRuc;
	}

	public String getVcDireccion() {
		return vcDireccion;
	}

	public void setVcDireccion(String vcDireccion) {
		this.vcDireccion = vcDireccion;
	}

	public byte[] getImLogo() {
		return imLogo;
	}

	public void setImLogo(byte[] imLogo) {
		this.imLogo = imLogo;
	}

	public Collection<MOrgaDTO> getmOrgaCollection() {
		return mOrgaCollection;
	}

	public void setmOrgaCollection(Collection<MOrgaDTO> mOrgaCollection) {
		this.mOrgaCollection = mOrgaCollection;
	}

	public GENCulturaDTO getInIdCultura() {
		return inIdCultura;
	}

	public void setInIdCultura(GENCulturaDTO inIdCultura) {
		this.inIdCultura = inIdCultura;
	}

}
