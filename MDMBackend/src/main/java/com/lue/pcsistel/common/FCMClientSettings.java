package com.lue.pcsistel.common;

import de.bytefish.fcmjava.http.options.IFcmClientSettings;

/**
 *
 * @author lue
 */
public class FCMClientSettings implements IFcmClientSettings{
    
        private static final String FCM_URL="";
        private static final String FCM_KEY="";
    
           public String getFcmUrl() {
                return FCM_URL;
              }

              public String getApiKey() {
                  return FCM_KEY;
              }
    
}
