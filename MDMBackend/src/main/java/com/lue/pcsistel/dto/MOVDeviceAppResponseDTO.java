package com.lue.pcsistel.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MOVDeviceAppResponseDTO implements Serializable{
	private static final long serialVersionUID = 5589821762053234045L;
	@JsonProperty("app_id")
	private Integer id;
	private String appName;
	private String packageName;
	private Boolean blocked;
	private Boolean isAppConfig;
	private TimeConfig timeConfig;
	
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
	public TimeConfig getTimeConfig() {
		return timeConfig;
	}
	public void setTimeConfig(TimeConfig timeConfig) {
		this.timeConfig = timeConfig;
	}
	public Boolean getIsAppConfig() {
		return isAppConfig;
	}
	public void setIsAppConfig(Boolean isAppConfig) {
		this.isAppConfig = isAppConfig;
	}
	
	
	
}
