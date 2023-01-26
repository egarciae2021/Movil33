package com.lue.pcsistel.rest.request;

/**
 *
 * @author lue
 */
public class UploadApp {
    
    private String appName;
    
    private String appPackage;

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getAppPackage() {
        return appPackage;
    }

    public void setAppPackage(String appPackage) {
        this.appPackage = appPackage;
    }
    
}
