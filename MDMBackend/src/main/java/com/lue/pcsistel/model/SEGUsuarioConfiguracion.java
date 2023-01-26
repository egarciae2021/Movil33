
package com.lue.pcsistel.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author lue
 */
@Entity
@Table(name = "SEG_UsuarioConfiguracion", catalog = "", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "SEGUsuarioConfiguracion.findAll", query = "SELECT s FROM SEGUsuarioConfiguracion s")
    , @NamedQuery(name = "SEGUsuarioConfiguracion.findByFinCodCli", query = "SELECT s FROM SEGUsuarioConfiguracion s WHERE s.sEGUsuarioConfiguracionPK.finCodCli = :finCodCli")
    , @NamedQuery(name = "SEGUsuarioConfiguracion.findByFinCodUsu", query = "SELECT s FROM SEGUsuarioConfiguracion s WHERE s.sEGUsuarioConfiguracionPK.finCodUsu = :finCodUsu")
    , @NamedQuery(name = "SEGUsuarioConfiguracion.findByFinCodIdi", query = "SELECT s FROM SEGUsuarioConfiguracion s WHERE s.finCodIdi = :finCodIdi")
    , @NamedQuery(name = "SEGUsuarioConfiguracion.findByVcSimDec", query = "SELECT s FROM SEGUsuarioConfiguracion s WHERE s.vcSimDec = :vcSimDec")
    , @NamedQuery(name = "SEGUsuarioConfiguracion.findByDcNumDec", query = "SELECT s FROM SEGUsuarioConfiguracion s WHERE s.dcNumDec = :dcNumDec")
    , @NamedQuery(name = "SEGUsuarioConfiguracion.findByVcSimSepMil", query = "SELECT s FROM SEGUsuarioConfiguracion s WHERE s.vcSimSepMil = :vcSimSepMil")
    , @NamedQuery(name = "SEGUsuarioConfiguracion.findByVcSimNeg", query = "SELECT s FROM SEGUsuarioConfiguracion s WHERE s.vcSimNeg = :vcSimNeg")
    , @NamedQuery(name = "SEGUsuarioConfiguracion.findByVcHorCor", query = "SELECT s FROM SEGUsuarioConfiguracion s WHERE s.vcHorCor = :vcHorCor")
    , @NamedQuery(name = "SEGUsuarioConfiguracion.findByVcHorLar", query = "SELECT s FROM SEGUsuarioConfiguracion s WHERE s.vcHorLar = :vcHorLar")
    , @NamedQuery(name = "SEGUsuarioConfiguracion.findByVcSimAM", query = "SELECT s FROM SEGUsuarioConfiguracion s WHERE s.vcSimAM = :vcSimAM")
    , @NamedQuery(name = "SEGUsuarioConfiguracion.findByVcSimPM", query = "SELECT s FROM SEGUsuarioConfiguracion s WHERE s.vcSimPM = :vcSimPM")
    , @NamedQuery(name = "SEGUsuarioConfiguracion.findByVcFecCor", query = "SELECT s FROM SEGUsuarioConfiguracion s WHERE s.vcFecCor = :vcFecCor")
    , @NamedQuery(name = "SEGUsuarioConfiguracion.findByVcFecLar", query = "SELECT s FROM SEGUsuarioConfiguracion s WHERE s.vcFecLar = :vcFecLar")
    , @NamedQuery(name = "SEGUsuarioConfiguracion.findByVcTem", query = "SELECT s FROM SEGUsuarioConfiguracion s WHERE s.vcTem = :vcTem")})
public class SEGUsuarioConfiguracion implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected SEGUsuarioConfiguracionPK sEGUsuarioConfiguracionPK;
    @Column(name = "F_inCodIdi")
    private Integer finCodIdi;
    @Size(max = 1)
    @Column(name = "vcSimDec", length = 1)
    private String vcSimDec;
    @Column(name = "dcNumDec")
    private Integer dcNumDec;
    @Size(max = 1)
    @Column(name = "vcSimSepMil", length = 1)
    private String vcSimSepMil;
    @Size(max = 1)
    @Column(name = "vcSimNeg", length = 1)
    private String vcSimNeg;
    @Size(max = 15)
    @Column(name = "vcHorCor", length = 15)
    private String vcHorCor;
    @Size(max = 15)
    @Column(name = "vcHorLar", length = 15)
    private String vcHorLar;
    @Size(max = 10)
    @Column(name = "vcSimAM", length = 10)
    private String vcSimAM;
    @Size(max = 10)
    @Column(name = "vcSimPM", length = 10)
    private String vcSimPM;
    @Size(max = 15)
    @Column(name = "vcFecCor", length = 15)
    private String vcFecCor;
    @Size(max = 30)
    @Column(name = "vcFecLar", length = 30)
    private String vcFecLar;
    @Size(max = 50)
    @Column(name = "vcTem", length = 50)
    private String vcTem;
    
    @JoinColumns({ 
		@JoinColumn(name = "F_inCodCli", referencedColumnName = "F_inCodCli",insertable = false, updatable = false),
		@JoinColumn(name = "F_inCodUsu", referencedColumnName = "P_inCod",insertable = false, updatable = false) })
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private SEGUsuario sEGUsuario;

    public SEGUsuarioConfiguracion() {
    }

    public SEGUsuarioConfiguracion(SEGUsuarioConfiguracionPK sEGUsuarioConfiguracionPK) {
        this.sEGUsuarioConfiguracionPK = sEGUsuarioConfiguracionPK;
    }

    public SEGUsuarioConfiguracion(int finCodCli, int finCodUsu) {
        this.sEGUsuarioConfiguracionPK = new SEGUsuarioConfiguracionPK(finCodCli, finCodUsu);
    }

    public SEGUsuarioConfiguracionPK getSEGUsuarioConfiguracionPK() {
        return sEGUsuarioConfiguracionPK;
    }

    public void setSEGUsuarioConfiguracionPK(SEGUsuarioConfiguracionPK sEGUsuarioConfiguracionPK) {
        this.sEGUsuarioConfiguracionPK = sEGUsuarioConfiguracionPK;
    }

    public Integer getFinCodIdi() {
        return finCodIdi;
    }

    public void setFinCodIdi(Integer finCodIdi) {
        this.finCodIdi = finCodIdi;
    }

    public String getVcSimDec() {
        return vcSimDec;
    }

    public void setVcSimDec(String vcSimDec) {
        this.vcSimDec = vcSimDec;
    }

    public Integer getDcNumDec() {
        return dcNumDec;
    }

    public void setDcNumDec(Integer dcNumDec) {
        this.dcNumDec = dcNumDec;
    }

    public String getVcSimSepMil() {
        return vcSimSepMil;
    }

    public void setVcSimSepMil(String vcSimSepMil) {
        this.vcSimSepMil = vcSimSepMil;
    }

    public String getVcSimNeg() {
        return vcSimNeg;
    }

    public void setVcSimNeg(String vcSimNeg) {
        this.vcSimNeg = vcSimNeg;
    }

    public String getVcHorCor() {
        return vcHorCor;
    }

    public void setVcHorCor(String vcHorCor) {
        this.vcHorCor = vcHorCor;
    }

    public String getVcHorLar() {
        return vcHorLar;
    }

    public void setVcHorLar(String vcHorLar) {
        this.vcHorLar = vcHorLar;
    }

    public String getVcSimAM() {
        return vcSimAM;
    }

    public void setVcSimAM(String vcSimAM) {
        this.vcSimAM = vcSimAM;
    }

    public String getVcSimPM() {
        return vcSimPM;
    }

    public void setVcSimPM(String vcSimPM) {
        this.vcSimPM = vcSimPM;
    }

    public String getVcFecCor() {
        return vcFecCor;
    }

    public void setVcFecCor(String vcFecCor) {
        this.vcFecCor = vcFecCor;
    }

    public String getVcFecLar() {
        return vcFecLar;
    }

    public void setVcFecLar(String vcFecLar) {
        this.vcFecLar = vcFecLar;
    }

    public String getVcTem() {
        return vcTem;
    }

    public void setVcTem(String vcTem) {
        this.vcTem = vcTem;
    }

    public SEGUsuario getSEGUsuario() {
        return sEGUsuario;
    }

    public void setSEGUsuario(SEGUsuario sEGUsuario) {
        this.sEGUsuario = sEGUsuario;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (sEGUsuarioConfiguracionPK != null ? sEGUsuarioConfiguracionPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof SEGUsuarioConfiguracion)) {
            return false;
        }
        SEGUsuarioConfiguracion other = (SEGUsuarioConfiguracion) object;
        if ((this.sEGUsuarioConfiguracionPK == null && other.sEGUsuarioConfiguracionPK != null) || (this.sEGUsuarioConfiguracionPK != null && !this.sEGUsuarioConfiguracionPK.equals(other.sEGUsuarioConfiguracionPK))) {
            return false;
        }
        return true;
    }

   
}
