package com.lue.pcsistel.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author lue
 */
@Entity
@Table(name = "SEG_Usuario_Mensajes", catalog = "", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "SEGUsuarioMensajes.findAll", query = "SELECT s FROM SEGUsuarioMensajes s")
    , @NamedQuery(name = "SEGUsuarioMensajes.findByIdMensaje", query = "SELECT s FROM SEGUsuarioMensajes s WHERE s.idMensaje = :idMensaje")
    , @NamedQuery(name = "SEGUsuarioMensajes.findByVcCodMensaje", query = "SELECT s FROM SEGUsuarioMensajes s WHERE s.vcCodMensaje = :vcCodMensaje")
    , @NamedQuery(name = "SEGUsuarioMensajes.findByVcMensaje", query = "SELECT s FROM SEGUsuarioMensajes s WHERE s.vcMensaje = :vcMensaje")})
public class SEGUsuarioMensajes implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "IdMensaje", nullable = false)
    private Integer idMensaje;
    @Size(max = 10)
    @Column(name = "vcCodMensaje", length = 10)
    private String vcCodMensaje;
    @Size(max = 200)
    @Column(name = "vcMensaje", length = 200)
    private String vcMensaje;

    public SEGUsuarioMensajes() {
    }

    public SEGUsuarioMensajes(Integer idMensaje) {
        this.idMensaje = idMensaje;
    }

    public Integer getIdMensaje() {
        return idMensaje;
    }

    public void setIdMensaje(Integer idMensaje) {
        this.idMensaje = idMensaje;
    }

    public String getVcCodMensaje() {
        return vcCodMensaje;
    }

    public void setVcCodMensaje(String vcCodMensaje) {
        this.vcCodMensaje = vcCodMensaje;
    }

    public String getVcMensaje() {
        return vcMensaje;
    }

    public void setVcMensaje(String vcMensaje) {
        this.vcMensaje = vcMensaje;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idMensaje != null ? idMensaje.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof SEGUsuarioMensajes)) {
            return false;
        }
        SEGUsuarioMensajes other = (SEGUsuarioMensajes) object;
        if ((this.idMensaje == null && other.idMensaje != null) || (this.idMensaje != null && !this.idMensaje.equals(other.idMensaje))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.SEGUsuarioMensajes[ idMensaje=" + idMensaje + " ]";
    }
    
}
