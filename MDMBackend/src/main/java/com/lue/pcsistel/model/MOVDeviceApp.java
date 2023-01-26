package com.lue.pcsistel.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@NamedQueries({
		@NamedQuery(name = "MOVDeviceApp.findAll", query = "SELECT d FROM MOVDeviceApp d"),
		@NamedQuery(name = "MOVDeviceApp.findAllByIEME", query = "SELECT a FROM MOVDeviceApp  as a join a.dispositivo as d where d.mOVDispositivoPK.pvcCodIMEI=:pvcCodIMEI"),
		@NamedQuery(name = "MOVDeviceApp.updateApplicationBlocked", query = "UPDATE  MOVDeviceApp a SET a.blocked=:blocked, modifiedDate=CURRENT_TIMESTAMP() WHERE a.id=:id") ,
		@NamedQuery(name = "MOVDeviceApp.updateInstallationBlocked", query = "UPDATE  MOVDeviceApp a SET a.blockInstallation=:blockInstallation, modifiedDate=CURRENT_TIMESTAMP() WHERE a.id=:id") ,
		@NamedQuery(name = "MOVDeviceApp.updateUninstallationBlocked", query = "UPDATE  MOVDeviceApp a SET a.blockUninstallation=:blockUninstallation, modifiedDate=CURRENT_TIMESTAMP() WHERE a.id=:id"),
		@NamedQuery(name = "MOVDeviceApp.updateApplicationBlockedTime", query = "UPDATE  MOVDeviceApp a SET a.starTime=:starTime, a.endTime=:endTime, modifiedDate=CURRENT_TIMESTAMP() WHERE a.id=:id"),
		@NamedQuery(name = "MOVDeviceApp.findDeviceListByBlockedNotNullByIMEI", query = "SELECT a FROM  MOVDeviceApp a  WHERE a.blocked=1 AND a.dispositivo.mOVDispositivoPK.pvcCodIMEI=:pvcCodIMEI"),
		@NamedQuery(name = "MOVDeviceApp.findAllByIEME2", query = "SELECT a FROM  MOVDeviceApp a  WHERE a.dispositivo.mOVDispositivoPK.pvcCodIMEI=:pvcCodIMEI"),
		@NamedQuery(name = "MOVDeviceApp.findAppPackageNameExist", query = "SELECT count(*) FROM  MOVDeviceApp a  WHERE a.packageName=:packageName AND a.dispositivo.mOVDispositivoPK.pvcCodIMEI=:pvcCodIMEI")
})
@Entity
@Table(name = "MOV_DEVICEAPP", catalog = "", schema = "")
public class MOVDeviceApp {

	@Id
	@GenericGenerator(strategy = "increment", name = "genMOVDeviceApp")
	@GeneratedValue(generator = "genMOVDeviceApp")
	@Column(name = "id")
	private Integer id;

	@Column(name = "AppName")
	private String appName;

	@Column(name = "Packagename")
	private String packageName;

	@Column(name = "Blocked")
	private Boolean blocked;
	
	@Column(name="Block_Installation")
	private Boolean blockInstallation;
	
	@Column(name="Block_Uninstallation")
	private Boolean blockUninstallation;
	
	@Column(name = "Star_Time")
	private String starTime;
	
	@Column(name = "End_Time")
	private String endTime;
	
	@Column(name = "Created_Date")
	private Date createdDate;
	
	@Column(name = "Modified_Date")
	private Date modifiedDate;

	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinColumns({
			@JoinColumn(name = "F_Deviceid", referencedColumnName = "F_inCodCli", insertable = true, updatable = false),
			@JoinColumn(name = "Deviceid", referencedColumnName = "P_vcCodIMEI", insertable = true, updatable = false) })
	private MOVDispositivo dispositivo;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public String getPackageName() {
		return packageName;
	}

	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	public Boolean getBlocked() {
		return blocked;
	}

	public void setBlocked(Boolean blocked) {
		this.blocked = blocked;
	}

	public String getStarTime() {
		return starTime;
	}

	public void setStarTime(String starTime) {
		this.starTime = starTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public MOVDispositivo getDispositivo() {
		return dispositivo;
	}

	public void setDispositivo(MOVDispositivo dispositivo) {
		this.dispositivo = dispositivo;
	}

	public Boolean getBlockInstallation() {
		return blockInstallation;
	}

	public void setBlockInstallation(Boolean blockInstallation) {
		this.blockInstallation = blockInstallation;
	}

	public Boolean getBlockUninstallation() {
		return blockUninstallation;
	}

	public void setBlockUninstallation(Boolean blockUninstallation) {
		this.blockUninstallation = blockUninstallation;
	}


}
