package com.lue.pcsistel.rest.response;

/**
 *
 * @author lue
 */
public class DeviceRegisterResponse extends GenericResponse{
    
    private String authToken;
    
    private int clientId;
    
    private String imei;

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public String getImei() {
        return imei;
    }

    public void setImei(String imei) {
        this.imei = imei;
    }
    
    
}
