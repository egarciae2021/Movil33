
package com.lue.pcsistel.model;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author lue
 */
@Entity
@Table(name = "MOV_Estado", catalog = "", schema = "")
@XmlRootElement
@NamedQueries({
      @NamedQuery(name = "MOVEstado.findAll", query = "SELECT m FROM MOVEstado m")
    , @NamedQuery(name = "MOVEstado.findByPinCod", query = "SELECT m FROM MOVEstado m WHERE m.pinCod = :pinCod")
    , @NamedQuery(name = "MOVEstado.findByVcNom", query = "SELECT m FROM MOVEstado m WHERE m.vcNom = :vcNom")
    , @NamedQuery(name = "MOVEstado.findByBtDef", query = "SELECT m FROM MOVEstado m WHERE m.btDef = :btDef")
    , @NamedQuery(name = "MOVEstado.findByInMod", query = "SELECT m FROM MOVEstado m WHERE m.inMod = :inMod")
    , @NamedQuery(name = "MOVEstado.findByBtVig", query = "SELECT m FROM MOVEstado m WHERE m.btVig = :btVig")
    , @NamedQuery(name = "MOVEstado.findByInOrd", query = "SELECT m FROM MOVEstado m WHERE m.inOrd = :inOrd")})
public class MOVEstado implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "P_inCod", nullable = false)
    private Integer pinCod;
    @Size(max = 50)
    @Column(name = "vcNom", length = 50)
    private String vcNom;
    @Column(name = "btDef")
    private Boolean btDef;
    @Column(name = "inMod")
    private Integer inMod;
    @Basic(optional = false)
    @NotNull
    @Column(name = "btVig", nullable = false)
    private boolean btVig;
    @Column(name = "inOrd")
    private Integer inOrd;
    @OneToMany(mappedBy = "finCodEst")
    private Collection<MOVLinea> mOVLineaCollection;
    @OneToMany(mappedBy = "finEst",cascade=CascadeType.ALL)
    private Collection<MOVDispositivo> mOVDispositivoCollection;

    public MOVEstado() {
    }

    public MOVEstado(Integer pinCod) {
        this.pinCod = pinCod;
    }

    public MOVEstado(Integer pinCod, boolean btVig) {
        this.pinCod = pinCod;
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

    public boolean getBtVig() {
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

    @XmlTransient
    public Collection<MOVLinea> getMOVLineaCollection() {
        return mOVLineaCollection;
    }

    public void setMOVLineaCollection(Collection<MOVLinea> mOVLineaCollection) {
        this.mOVLineaCollection = mOVLineaCollection;
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
        if (!(object instanceof MOVEstado)) {
            return false;
        }
        MOVEstado other = (MOVEstado) object;
        if ((this.pinCod == null && other.pinCod != null) || (this.pinCod != null && !this.pinCod.equals(other.pinCod))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.MOVEstado[ pinCod=" + pinCod + " ]";
    }
    
}
