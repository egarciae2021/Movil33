package com.lue.pcsistel.common;

import de.bytefish.fcmjava.client.FcmClient;
import de.bytefish.fcmjava.model.options.FcmMessageOptions;
import de.bytefish.fcmjava.requests.data.DataUnicastMessage;
import java.time.Duration;

/**
 *
 * @author lue
 */
public class FCMMessageSender {

    public static void sendProductPostMessage(final String tokens,PushNotificationPayLoad payLoad ) {

        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                FcmClient client = new FcmClient(new FCMClientSettings());

                FcmMessageOptions options = FcmMessageOptions.builder()
                        .setTimeToLive(Duration.ofHours(1))
                        .build();

//                NotificationMulticastMessage notiMulCastMessage = new NotificationMulticastMessage(options, tokens, payload);
                DataUnicastMessage dataMulCastMessage = new DataUnicastMessage(options,tokens,payLoad);
                client.send(dataMulCastMessage);
            }
        });
        t.start();

    }

   

//    public static void main(String[] args) {
//
//        //
 
/*//         String token ="fl_aJZYEOrE:APA91bGWLXKwPMOSAks60mI-03VaU6nQT-uXwx7luuIMFmCHf5_OFHoS0khyncHV4jhKVVJv1uKB9eKsel8W5b0ftGnicsgvz0G_sryWV_Dqm70QORyWw479x1dX05Ci-oF7SYQSe4oO";
      PushNotificationPayLoad pnp=new PushNotificationPayLoad();
      pnp.setTitle("Remote Reset");
      pnp.setAction("Remote reset of the key");*/
      
   

//    }
}
