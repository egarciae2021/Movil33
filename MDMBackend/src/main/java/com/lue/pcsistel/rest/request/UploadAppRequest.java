package com.lue.pcsistel.rest.request;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author lue
 */
public class UploadAppRequest {
    
    private List<UploadApp> apps=new ArrayList<UploadApp>();

    public List<UploadApp> getApps() {
        return apps;
    }

    public void setApps(List<UploadApp> apps) {
        this.apps = apps;
    }
    
}
