package com.lue.pcsistel.firebase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

@Component
public class AndroidPushNotificationsService {

	@Autowired
	private RestTemplate restTemplate;

	private static final String FIREBASE_SERVER_KEY = "AAAAfPcWicM:APA91bHTL8y4m3rE5kBQOFIw0n3CSIgjr3VBg9TyPaWGXipAf8IqDfEVIl8niPzUF-LpJwqfn04X_8FujLOdi3A2yF2tSXJP2gsSn5F-XG6WEL0m1z6TSdIs0IBDSxe41dt2J9wBsfoTdDL3Gnj4hgjJvGlzaqQ7nQ";
	private static final String FIREBASE_SERVER_URL = "https://fcm.googleapis.com/fcm/send";
	// @Async

	public CompletableFuture<FirebaseResponse> send(HttpEntity<String> entity) {
		ArrayList<ClientHttpRequestInterceptor> interceptors = new ArrayList<>();
		interceptors.add(new HeaderRequestInterceptor("Authorization", "key=" + FIREBASE_SERVER_KEY));
		interceptors.add(new HeaderRequestInterceptor("Content-Type", "application/json"));
		restTemplate.setInterceptors(interceptors);
			
		FirebaseResponse firebaseResponse = restTemplate.postForObject(FIREBASE_SERVER_URL, entity,
				FirebaseResponse.class);
		return CompletableFuture.completedFuture(firebaseResponse);
	}

	
}
