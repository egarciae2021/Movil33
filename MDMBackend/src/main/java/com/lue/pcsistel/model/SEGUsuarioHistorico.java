
package com.lue.pcsistel.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author lue
 */
@Entity
@Table(name = "SEG_UsuarioHistorico", catalog = "", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "SEGUsuarioHistorico.findAll", query = "SELECT s FROM SEGUsuarioHistorico s")
    , @NamedQuery(name = "SEGUsuarioHistorico.findByFinCodCli", query = "SELECT s FROM SEGUsuarioHistorico s WHERE s.sEGUsuarioHistoricoPK.finCodCli = :finCodCli")
    , @NamedQuery(name = "SEGUsuarioHistorico.findByPinId", query = "SELECT s FROM SEGUsuarioHistorico s WHERE s.sEGUsuarioHistoricoPK.pinId = :pinId")
    , @NamedQuery(name = "SEGUsuarioHistorico.findByDaFecAut", query = "SELECT s FROM SEGUsuarioHistorico s WHERE s.daFecAut = :daFecAut")
    , @NamedQuery(name = "SEGUsuarioHistorico.findByAccion", query = "SELECT s FROM SEGUsuarioHistorico s WHERE s.accion = :accion")
    , @NamedQuery(name = "SEGUsuarioHistorico.findByDescripcion", query = "SELECT s FROM SEGUsuarioHistorico s WHERE s.descripcion = :descripcion")
    , @NamedQuery(name = "SEGUsuarioHistorico.findByIp", query = "SELECT s FROM SEGUsuarioHistorico s WHERE s.ip = :ip")
    , @NamedQuery(name = "SEGUsuarioHistorico.findByNavegador", query = "SELECT s FROM SEGUsuarioHistorico s WHERE s.navegador = :navegador")
    , @NamedQuery(name = "SEGUsuarioHistorico.findByServidor", query = "SELECT s FROM SEGUsuarioHistorico s WHERE s.servidor = :servidor")})
public class SEGUsuarioHistorico implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected SEGUsuarioHistoricoPK sEGUsuarioHistoricoPK;
    @Basic(optional = false)
    @NotNull
    @Column(name = "daFecAut", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date daFecAut;
    @Size(max = 25)
    @Column(name = "Accion", length = 25)
    private String accion;
    @Size(max = 50)
    @Column(name = "Descripcion", length = 50)
    private String descripcion;
    @Size(max = 25)
    @Column(name = "IP", length = 25)
    private String ip;
    @Size(max = 50)
    @Column(name = "Navegador", length = 50)
    private String navegador;
    @Size(max = 250)
    @Column(name = "Servidor", length = 250)
    private String servidor;
    @JoinColumns({
        @JoinColumn(name = "F_inCodCli", referencedColumnName = "F_inCodCli",insertable = false,updatable = false)
        , @JoinColumn(name = "F_inCodUsu", referencedColumnName = "P_inCod",insertable = false,updatable = false)})
    @ManyToOne(optional = false)
    private SEGUsuario sEGUsuario;

    public SEGUsuarioHistorico() {
    }

    public SEGUsuarioHistorico(SEGUsuarioHistoricoPK sEGUsuarioHistoricoPK) {
        this.sEGUsuarioHistoricoPK = sEGUsuarioHistoricoPK;
    }

    public SEGUsuarioHistorico(SEGUsuarioHistoricoPK sEGUsuarioHistoricoPK, Date daFecAut) {
        this.sEGUsuarioHistoricoPK = sEGUsuarioHistoricoPK;
        this.daFecAut = daFecAut;
    }

    public SEGUsuarioHistorico(int finCodCli, int pinId) {
        this.sEGUsuarioHistoricoPK = new SEGUsuarioHistoricoPK(finCodCli, pinId);
    }

    public SEGUsuarioHistoricoPK getSEGUsuarioHistoricoPK() {
        return sEGUsuarioHistoricoPK;
    }

    public void setSEGUsuarioHistoricoPK(SEGUsuarioHistoricoPK sEGUsuarioHistoricoPK) {
        this.sEGUsuarioHistoricoPK = sEGUsuarioHistoricoPK;
    }

    public Date getDaFecAut() {
        return daFecAut;
    }

    public void setDaFecAut(Date daFecAut) {
        this.daFecAut = daFecAut;
    }

    public String getAccion() {
        return accion;
    }

    public void setAccion(String accion) {
        this.accion = accion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getNavegador() {
        return navegador;
    }

    public void setNavegador(String navegador) {
        this.navegador = navegador;
    }

    public String getServidor() {
        return servidor;
    }

    public void setServidor(String servidor) {
        this.servidor = servidor;
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
        hash += (sEGUsuarioHistoricoPK != null ? sEGUsuarioHistoricoPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof SEGUsuarioHistorico)) {
            return false;
        }
        SEGUsuarioHistorico other = (SEGUsuarioHistorico) object;
        if ((this.sEGUsuarioHistoricoPK == null && other.sEGUsuarioHistoricoPK != null) || (this.sEGUsuarioHistoricoPK != null && !this.sEGUsuarioHistoricoPK.equals(other.sEGUsuarioHistoricoPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.SEGUsuarioHistorico[ sEGUsuarioHistoricoPK=" + sEGUsuarioHistoricoPK + " ]";
    }
    
}
