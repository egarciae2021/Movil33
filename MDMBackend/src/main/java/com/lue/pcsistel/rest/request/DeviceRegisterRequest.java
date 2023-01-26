package com.lue.pcsistel.rest.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author lue
 */
public class DeviceRegisterRequest {
    
	 @NotNull
	 @Size(min=6, message="Registation code should min 6 or max 6 digist")
    private String regCode;
    
	 @NotNull
    private String imeiNumber;
    
    private String gcmToken;
    
    private String deviceName;
    
    private String  deviceDesc;
    
    private String  deviceBrand;

    public String getRegCode() {
        return regCode;
    }

    public void setRegCode(String otpCode) {
        this.regCode = otpCode;
    }

    public String getImeiNumber() {
        return imeiNumber;
    }

    public void setImeiNumber(String imeiNumber) {
        this.imeiNumber = imeiNumber;
    }

    public String getGcmToken() {
        return gcmToken;
    }

    public void setGcmToken(String gcmToken) {
        this.gcmToken = gcmToken;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getDeviceDesc() {
        return deviceDesc;
    }

    public void setDeviceDesc(String deviceDesc) {
        this.deviceDesc = deviceDesc;
    }

    public String getDeviceBrand() {
        return deviceBrand;
    }

    public void setDeviceBrand(String deviceBrand) {
        this.deviceBrand = deviceBrand;
    }
    
    
    
}
