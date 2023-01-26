
package com.lue.pcsistel.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
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
@Table(name = "GEN_Pais", catalog = "", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "GENPais.findAll", query = "SELECT g FROM GENPais g")
    , @NamedQuery(name = "GENPais.findByPinCodPai", query = "SELECT g FROM GENPais g WHERE g.pinCodPai = :pinCodPai")
    , @NamedQuery(name = "GENPais.findByVcNomPai", query = "SELECT g FROM GENPais g WHERE g.vcNomPai = :vcNomPai")
    , @NamedQuery(name = "GENPais.findByDtFecIni", query = "SELECT g FROM GENPais g WHERE g.dtFecIni = :dtFecIni")
    , @NamedQuery(name = "GENPais.findByDtFecFin", query = "SELECT g FROM GENPais g WHERE g.dtFecFin = :dtFecFin")
    , @NamedQuery(name = "GENPais.findByBtEst", query = "SELECT g FROM GENPais g WHERE g.btEst = :btEst")})
public class GENPais implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "P_inCodPai", nullable = false)
    private Integer pinCodPai;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "vcNomPai", nullable = false, length = 50)
    private String vcNomPai;
    @Lob
    @Column(name = "imImaPai")
    private byte[] imImaPai;
    @Column(name = "dtFecIni")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dtFecIni;
    @Column(name = "dtFecFin")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dtFecFin;
    @Column(name = "btEst")
    private Boolean btEst;
    @OneToMany(mappedBy = "finCodPai")
    private Collection<GENCultura> gENCulturaCollection;

    public GENPais() {
    }

    public GENPais(Integer pinCodPai) {
        this.pinCodPai = pinCodPai;
    }

    public GENPais(Integer pinCodPai, String vcNomPai) {
        this.pinCodPai = pinCodPai;
        this.vcNomPai = vcNomPai;
    }

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

    @XmlTransient
    public Collection<GENCultura> getGENCulturaCollection() {
        return gENCulturaCollection;
    }

    public void setGENCulturaCollection(Collection<GENCultura> gENCulturaCollection) {
        this.gENCulturaCollection = gENCulturaCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (pinCodPai != null ? pinCodPai.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof GENPais)) {
            return false;
        }
        GENPais other = (GENPais) object;
        if ((this.pinCodPai == null && other.pinCodPai != null) || (this.pinCodPai != null && !this.pinCodPai.equals(other.pinCodPai))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.GENPais[ pinCodPai=" + pinCodPai + " ]";
    }
    
}
