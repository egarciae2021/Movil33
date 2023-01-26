package com.lue.pcsistel.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
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
@Table(name = "M_EMPL_RegCode", catalog = "", schema = "")
@XmlRootElement
public class MEmplRegCode implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    @Column(name = "ID")
    private Long id;
   
    @Size(max = 100)
    @Column(name = "REG_CODE", length = 100)
    private String regCode;
    

    @Basic(optional = false)
    @NotNull
    @Column(name = "CREATION_DATE", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;
    
    @Column(name = "UPDATION_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updationDate;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "expired", nullable = false)
    private boolean expired=Boolean.FALSE;
    
     @JoinColumns({
        @JoinColumn(name = "mEmpl_F_inCodCli", referencedColumnName = "F_inCodCli",insertable = true,updatable = false)
        ,@JoinColumn(name = "mEmpl_EMPL_P_vcCODEMP", referencedColumnName = "EMPL_P_vcCODEMP",insertable = true,updatable = false)})
    @ManyToOne(optional = false)
    private MEmpl mEmpl;

    public MEmplRegCode() {
    }
    
     public MEmplRegCode( String regCode, Date creationDate, Date updationDate, MEmpl mEmpl) {
        this.regCode = regCode;
        this.creationDate = creationDate;
        this.updationDate = updationDate;
        this.mEmpl = mEmpl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegCode() {
        return regCode;
    }

    public void setRegCode(String regCode) {
        this.regCode = regCode;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getUpdationDate() {
        return updationDate;
    }

    public void setUpdationDate(Date updationDate) {
        this.updationDate = updationDate;
    }

    public boolean isExpired() {
        return expired;
    }

    public void setExpired(boolean expired) {
        this.expired = expired;
    }

    public MEmpl getmEmpl() {
        return mEmpl;
    }

    public void setmEmpl(MEmpl mEmpl) {
        this.mEmpl = mEmpl;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 71 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final MEmplRegCode other = (MEmplRegCode) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "MEmpl_RegCode{" + "id=" + id + ", mEmpl=" + mEmpl + '}';
    }
    
}
