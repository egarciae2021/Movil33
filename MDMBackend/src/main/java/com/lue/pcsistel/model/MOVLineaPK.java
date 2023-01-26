package com.lue.pcsistel.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author lue
 */
@Embeddable
public class MOVLineaPK implements Serializable {
	private static final long serialVersionUID = 2551497834759979837L;
	@Basic(optional = false)
    @NotNull
    @Column(name = "F_inCodCli", nullable = false)
    private int finCodCli;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "P_vcNum", nullable = false, length = 20)
    private String pvcNum;

    public MOVLineaPK() {
    }

    public MOVLineaPK(int finCodCli, String pvcNum) {
        this.finCodCli = finCodCli;
        this.pvcNum = pvcNum;
    }

    public int getFinCodCli() {
        return finCodCli;
    }

    public void setFinCodCli(int finCodCli) {
        this.finCodCli = finCodCli;
    }

    public String getPvcNum() {
        return pvcNum;
    }

    public void setPvcNum(String pvcNum) {
        this.pvcNum = pvcNum;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) finCodCli;
        hash += (pvcNum != null ? pvcNum.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MOVLineaPK)) {
            return false;
        }
        MOVLineaPK other = (MOVLineaPK) object;
        if (this.finCodCli != other.finCodCli) {
            return false;
        }
        if ((this.pvcNum == null && other.pvcNum != null) || (this.pvcNum != null && !this.pvcNum.equals(other.pvcNum))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.MOVLineaPK[ finCodCli=" + finCodCli + ", pvcNum=" + pvcNum + " ]";
    }
    
}
