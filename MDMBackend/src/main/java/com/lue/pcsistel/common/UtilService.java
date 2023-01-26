package com.lue.pcsistel.common;

import java.util.StringTokenizer;
import org.springframework.security.crypto.codec.Base64;

/**
 *
 * @author lue
 */
public class UtilService {

    public static String encodeKey(int clientId, String imei) {
        String str = clientId + "***" + imei;
        String encryptStr = Encryptor.encrypt(str);
        byte[] byteArray = Base64.encode(encryptStr.getBytes());
        return (new String(byteArray));
    }

    public static String getClientIdFromUserKey(String userKey) {
        String decryptStr = getDecryptStringFromUserKey(userKey);
        StringTokenizer st = new StringTokenizer(decryptStr, "***");
        return st.nextToken();
    }

    public static String getIMEIFromUserKey(String userKey) {
        String decryptStr = getDecryptStringFromUserKey(userKey);
        StringTokenizer st = new StringTokenizer(decryptStr, "***");
        st.nextToken();
        return st.nextToken();
    }

    public static String getDecryptStringFromUserKey(String userKey) {
        byte[] byteArray = Base64.decode(userKey.getBytes());
        String decodedString = new String(byteArray);
        return Encryptor.decrypt(decodedString);
    }
}
