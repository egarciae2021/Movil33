/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lue.pcsistel.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 *
 * @author lue
 */
@Embeddable
public class SEGUsuarioConfiguracionPK implements Serializable {
	private static final long serialVersionUID = 2611540526438585356L;
	@Basic(optional = false)
    @Column(name = "F_inCodCli")
    private int finCodCli;
    @Basic(optional = false)
    @Column(name = "F_inCodUsu")
    private int finCodUsu;

    public SEGUsuarioConfiguracionPK() {
    }

    public SEGUsuarioConfiguracionPK(int finCodCli, int finCodUsu) {
        this.finCodCli = finCodCli;
        this.finCodUsu = finCodUsu;
    }

    public int getFinCodCli() {
        return finCodCli;
    }

    public void setFinCodCli(int finCodCli) {
        this.finCodCli = finCodCli;
    }

    public int getFinCodUsu() {
        return finCodUsu;
    }

    public void setFinCodUsu(int finCodUsu) {
        this.finCodUsu = finCodUsu;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) finCodCli;
        hash += (int) finCodUsu;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof SEGUsuarioConfiguracionPK)) {
            return false;
        }
        SEGUsuarioConfiguracionPK other = (SEGUsuarioConfiguracionPK) object;
        if (this.finCodCli != other.finCodCli) {
            return false;
        }
        if (this.finCodUsu != other.finCodUsu) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.SEGUsuarioConfiguracionPK[ finCodCli=" + finCodCli + ", finCodUsu=" + finCodUsu + " ]";
    }
    
}
