package com.lue.pcsistel.model;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import org.hibernate.annotations.GenericGenerator;

/**
 *
 * @author lue
 */
@Entity
@Table(name = "MOV_ModeloDispositivo", catalog = "", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MOVModeloDispositivo.findAll", query = "SELECT m FROM MOVModeloDispositivo m")
    , @NamedQuery(name = "MOVModeloDispositivo.findByPinCod", query = "SELECT m FROM MOVModeloDispositivo m WHERE m.pinCod = :pinCod")
    , @NamedQuery(name = "MOVModeloDispositivo.findByVcNom", query = "SELECT m FROM MOVModeloDispositivo m WHERE m.vcNom = :vcNom")
    , @NamedQuery(name = "MOVModeloDispositivo.findByVcDes", query = "SELECT m FROM MOVModeloDispositivo m WHERE m.vcDes = :vcDes")
    , @NamedQuery(name = "MOVModeloDispositivo.findByBtVig", query = "SELECT m FROM MOVModeloDispositivo m WHERE m.btVig = :btVig")
    , @NamedQuery(name = "MOVModeloDispositivo.findByInEst", query = "SELECT m FROM MOVModeloDispositivo m WHERE m.inEst = :inEst")
    , @NamedQuery(name = "MOVModeloDispositivo.findByFinCodTipSer", query = "SELECT m FROM MOVModeloDispositivo m WHERE m.finCodTipSer = :finCodTipSer")
    , @NamedQuery(name = "MOVModeloDispositivo.findByPicTipMod", query = "SELECT m FROM MOVModeloDispositivo m WHERE m.picTipMod = :picTipMod")
    , @NamedQuery(name = "MOVModeloDispositivo.findByBtSopLin", query = "SELECT m FROM MOVModeloDispositivo m WHERE m.btSopLin = :btSopLin")
    , @NamedQuery(name = "MOVModeloDispositivo.findByVcTipoChip", query = "SELECT m FROM MOVModeloDispositivo m WHERE m.vcTipoChip = :vcTipoChip")
    , @NamedQuery(name = "MOVModeloDispositivo.findByBtMosEnSol", query = "SELECT m FROM MOVModeloDispositivo m WHERE m.btMosEnSol = :btMosEnSol")
    , @NamedQuery(name = "MOVModeloDispositivo.findByVcMarcaModelo", query = "SELECT m FROM MOVModeloDispositivo m WHERE m.vcMarcaModelo = :vcMarcaModelo")
    , @NamedQuery(name = "MOVModeloDispositivo.findPinCodByvcNomModelo", query = "SELECT m.pinCod FROM MOVModeloDispositivo m WHERE m.vcNom = :vcNom")})


public class MOVModeloDispositivo implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
   // @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    @GenericGenerator(name="generator", strategy="increment")
    @GeneratedValue(generator="generator")
    @Column(name = "P_inCod", nullable = false)
    private Integer pinCod;
    @Basic(optional = false)
    @Column(name = "vcNom",  length = 100)
    private String vcNom;
    @Column(name = "vcDes", length = 2147483647)
    private String vcDes;
    @Lob
    @Column(name = "imIma")
    private byte[] imIma;
    @Basic(optional = false)
    @Column(name = "btVig")
    private boolean btVig;
    @Column(name = "inEst")
    private Integer inEst;
    @Column(name = "F_inCodTipSer")
    private Integer finCodTipSer;
    @Column(name = "picTipMod", length = 35)
    private String picTipMod;
    @Column(name = "btSopLin")
    private Boolean btSopLin;
    @Column(name = "vcTipoChip", length = 5)
    private String vcTipoChip;
    @Column(name = "btMosEnSol")
    private Boolean btMosEnSol;
    @Column(name = "vcMarcaModelo", length = 50)
    private String vcMarcaModelo;
    
    @OneToMany(mappedBy = "finCodModDis")
    private Collection<MOVDispositivo> mOVDispositivoCollection;

    public MOVModeloDispositivo() {
    }

    public MOVModeloDispositivo(Integer pinCod) {
        this.pinCod = pinCod;
    }

    public MOVModeloDispositivo(Integer pinCod, String vcNom, boolean btVig) {
        this.pinCod = pinCod;
        this.vcNom = vcNom;
        this.btVig = btVig;
    }

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

    public boolean getBtVig() {
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

    @XmlTransient
    public Collection<MOVDispositivo> getMOVDispositivoCollection() {
        return mOVDispositivoCollection;
    }

    public void setMOVDispositivoCollection(Collection<MOVDispositivo> mOVDispositivoCollection) {
        this.mOVDispositivoCollection = mOVDispositivoCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (pinCod != null ? pinCod.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MOVModeloDispositivo)) {
            return false;
        }
        MOVModeloDispositivo other = (MOVModeloDispositivo) object;
        if ((this.pinCod == null && other.pinCod != null) || (this.pinCod != null && !this.pinCod.equals(other.pinCod))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.MOVModeloDispositivo[ pinCod=" + pinCod + " ]";
    }
    
}
