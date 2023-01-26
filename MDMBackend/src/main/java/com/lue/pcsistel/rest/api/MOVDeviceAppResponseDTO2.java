package com.lue.pcsistel.rest.api;

import java.io.Serializable;

public class MOVDeviceAppResponseDTO2 implements Serializable {
	private static final long serialVersionUID = -1292347011135659835L;
	private Integer id;
	private String appName;
	private String packageName;
	private Boolean blocked;
	private Boolean isAppConfig;

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

	public Boolean getIsAppConfig() {
		return isAppConfig;
	}

	public void setIsAppConfig(Boolean isAppConfig) {
		this.isAppConfig = isAppConfig;
	}

}
