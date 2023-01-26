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
import javax.validation.constraints.Size;

/**
 *
 * @author lue
 */
@Embeddable
public class MEmplPK implements Serializable {

	private static final long serialVersionUID = 2053097552681554224L;
	@Basic(optional = false)
    @Column(name = "F_inCodCli", nullable = false)
    private int finCodCli;
    @Basic(optional = false)
  
    @Size(min = 1, max = 25)
    @Column(name = "EMPL_P_vcCODEMP", length = 25)
    private String eMPLPvcCODEMP;

    public MEmplPK() {
    }

    public MEmplPK(int finCodCli, String eMPLPvcCODEMP) {
        this.finCodCli = finCodCli;
        this.eMPLPvcCODEMP = eMPLPvcCODEMP;
    }

    public int getFinCodCli() {
        return finCodCli;
    }

    public void setFinCodCli(int finCodCli) {
        this.finCodCli = finCodCli;
    }

    public String getEMPLPvcCODEMP() {
        return eMPLPvcCODEMP;
    }

    public void setEMPLPvcCODEMP(String eMPLPvcCODEMP) {
        this.eMPLPvcCODEMP = eMPLPvcCODEMP;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) finCodCli;
        hash += (eMPLPvcCODEMP != null ? eMPLPvcCODEMP.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MEmplPK)) {
            return false;
        }
        MEmplPK other = (MEmplPK) object;
        if (this.finCodCli != other.finCodCli) {
            return false;
        }
        if ((this.eMPLPvcCODEMP == null && other.eMPLPvcCODEMP != null) || (this.eMPLPvcCODEMP != null && !this.eMPLPvcCODEMP.equals(other.eMPLPvcCODEMP))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.MEmplPK[ finCodCli=" + finCodCli + ", eMPLPvcCODEMP=" + eMPLPvcCODEMP + " ]";
    }
    
}
