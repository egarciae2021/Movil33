package com.lue.pcsistel.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.GenericGenerator;

/**
 *
 * @author lue
 */
@Entity
@Table(name = "MOV_DEVICELOCATION", catalog = "", schema = "")
@XmlRootElement
public class MOVDeviceLocation implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
	@GenericGenerator(strategy="increment", name="genMOVDeviceLoc")
	@GeneratedValue(generator="genMOVDeviceLoc")
	@Column(name="ID")
	private Integer id;

    
    @Basic(optional = false)
    @NotNull
    @Column(name = "CREATION_DATE", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;
   
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "LATITUDE",nullable = false)
    private Double latitude;
    @Column(name = "LONGITUDE", nullable = false)
    private Double longitude;
    
   @JoinColumns({
        @JoinColumn(name = "F_inCodCli", referencedColumnName = "F_inCodCli",insertable = true,updatable = false)
        , @JoinColumn(name = "F_vcCodIMEI", referencedColumnName = "P_vcCodIMEI",insertable = true,updatable = false)})
    @ManyToOne(optional = false)
    private MOVDispositivo mOVDevice;
   
    public MOVDeviceLocation() {
    }

    public MOVDeviceLocation(Integer id, Date creationDate, Double latitude, Double longitude, MOVDispositivo mOVDevice) {
        this.id = id;
        this.creationDate = creationDate;
        this.latitude = latitude;
        this.longitude = longitude;
        this.mOVDevice = mOVDevice;
    }

    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public MOVDispositivo getmOVDevice() {
        return mOVDevice;
    }

    public void setmOVDevice(MOVDispositivo mOVDevice) {
        this.mOVDevice = mOVDevice;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 67 * hash + Objects.hashCode(this.id);
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
        final MOVDeviceLocation other = (MOVDeviceLocation) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "MOVDeviceLocation{" + "id=" + id + ", creationDate=" + creationDate + ", latitude=" + latitude + ", longitude=" + longitude + ", mOVDevice=" + mOVDevice + '}';
    }

  
}
