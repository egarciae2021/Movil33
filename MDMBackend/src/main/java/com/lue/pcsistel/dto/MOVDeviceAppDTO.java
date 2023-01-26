package com.lue.pcsistel.dto;

import java.util.Date;


public class MOVDeviceAppDTO {
	private Integer id;
	private String appName;
	private String packageName;
	private Boolean blocked;
	private String starTime;
	private String endTime;
	private Date createdDate;
	private Date modifiedDate;
	private MOVDispositivoDTO dispositivo;
	private Boolean blockInstallation;
	private Boolean blockUninstallation;
	
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

	public MOVDispositivoDTO getDispositivo() {
		return dispositivo;
	}

	public void setDispositivo(MOVDispositivoDTO dispositivo) {
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
