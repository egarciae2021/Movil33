package com.lue.pcsistel.firebase.controller;

import java.util.concurrent.CompletableFuture;
import com.lue.pcsistel.service.MOVDispositivoService;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lue.pcsistel.firebase.AndroidPushNotificationsService;
import com.lue.pcsistel.firebase.FirebaseResponse;
import com.lue.pcsistel.firebase.utils.DateUtils;

@Controller
@RequestMapping("/firebase/")
public class FirebaseController {

	@Autowired
	private AndroidPushNotificationsService pushNotificationsService;

	@Autowired
	private MOVDispositivoService movDispositivoService;

	@RequestMapping(value = "remontreset", method = RequestMethod.POST)
	public @ResponseBody String remontReset(HttpServletRequest req, @RequestBody String imeiNumber) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			//String testServer="AAAAfPcWicM:APA91bHTL8y4m3rE5kBQOFIw0n3CSIgjr3VBg9TyPaWGXipAf8IqDfEVIl8niPzUF-LpJwqfn04X_8FujLOdi3A2yF2tSXJP2gsSn5F-XG6WEL0m1z6TSdIs0IBDSxe41dt2J9wBsfoTdDL3Gnj4hgjJvGlzaqQ7nQ";
			//String testGCMToken="fX3QC6o9j0U:APA91bHdX4WDm684dnkeUZ2TXOEr1ggFLHm5DADcTwNSuH3GVbcs10sNGwxyIrtIIfHjqEDFEVmhsUOgvCuBJYBMCRJvvqWQLGruCPiHOvJEKIcwfCNk_g5i5dkuEG9zX2lj3bISFTGh";
			JSONObject body = new JSONObject();
			//System.out.println(" ====gcm token===="+movDispositivoService.findGCMTokenByImei(imeiNumber));
			body.put("to",movDispositivoService.findGCMTokenByImei(imeiNumber));
			//body.put("to",testGCMToken);
			body.put("priority", "high");
			// body.put("dry_run", true);
			
			JSONObject payload = new JSONObject();
			payload.put("user_id", "1");
			payload.put("data_param_1", "remote_reset");

			JSONObject data = new JSONObject();
			data.put("image", "");
			data.put("is_background", "false");
			data.put("payload", payload);
			data.put("title", "Remote Reset by admin");
			data.put("message", "MDMServices Admin");
			data.put("timestamp", DateUtils.getCurrentDate());
			body.put("data", data);
			HttpEntity<String> request = new HttpEntity<>(body.toString());
			CompletableFuture<FirebaseResponse> pushNotification = pushNotificationsService.send(request);
			CompletableFuture.allOf(pushNotification).join();
			try {
				FirebaseResponse firebaseResponse = pushNotification.get();
				if (firebaseResponse.getSuccess() == 1) {
					System.out.println("push notification sent ok!"+"        "+firebaseResponse + "  " + HttpStatus.OK);
				} else {
					System.out.println("error sending push notifications: " + firebaseResponse.toString());
				}
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}

			return "success";
		} else {
			return "<h1>Session expired! Please try again. <a href='login'>login</a> </h1>";
		}

	}// close remontReset method

	@RequestMapping(value = "factoryreset", method = RequestMethod.POST)
	public @ResponseBody String factoryReset(HttpServletRequest req ,@RequestBody String imeiNumber) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			JSONObject body = new JSONObject();
			body.put("to",movDispositivoService.findGCMTokenByImei(imeiNumber));
			body.put("priority", "high");
			// body.put("dry_run", true);
				
			JSONObject payload = new JSONObject();
			payload.put("user_id", "1");
			payload.put("data_param_1", "factory_reset");

			JSONObject data = new JSONObject();
			data.put("image", "");
			data.put("is_background", "false");
			data.put("payload", payload);
			data.put("title", "Factory Reset by admin");
			data.put("message", "MDMServices Admin");
			data.put("timestamp", DateUtils.getCurrentDate());
			body.put("data", data);
			HttpEntity<String> request = new HttpEntity<>(body.toString());
			CompletableFuture<FirebaseResponse> pushNotification = pushNotificationsService.send(request);
			CompletableFuture.allOf(pushNotification).join();
			try {
				FirebaseResponse firebaseResponse = pushNotification.get();
				if (firebaseResponse.getSuccess() == 1) {
					System.out.println("push notification sent ok!"+"        "+firebaseResponse + "  " + HttpStatus.OK);
				} else {
					System.out.println("error sending push notifications: " + firebaseResponse.toString());
				}
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
			return "success";
		} else {
			return "<h1>Session expired! Please try again. <a href='login'>login</a> </h1>";
		}
	}// close factoryReset method

	@RequestMapping(value = "backup", method = RequestMethod.POST)
	public @ResponseBody String backup(HttpServletRequest req, @RequestBody String imeiNumber) {

		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			JSONObject body = new JSONObject();
			body.put("to",movDispositivoService.findGCMTokenByImei(imeiNumber));
			body.put("priority", "high");
			// body.put("dry_run", true);

			JSONObject payload = new JSONObject();
			payload.put("user_id", "1");
			payload.put("data_param_1", "backup");

			JSONObject data = new JSONObject();
			data.put("image", "");
			data.put("is_background", "false");
			data.put("payload", payload);
			data.put("title", "Backup by admin");
			data.put("message", "MDMServices Admin");
			data.put("timestamp", DateUtils.getCurrentDate());
			body.put("data", data);
			HttpEntity<String> request = new HttpEntity<>(body.toString());
			CompletableFuture<FirebaseResponse> pushNotification = pushNotificationsService.send(request);
			CompletableFuture.allOf(pushNotification).join();
			try {
				FirebaseResponse firebaseResponse = pushNotification.get();
				if (firebaseResponse.getSuccess() == 1) {
					System.out.println("push notification sent ok!"+"        "+firebaseResponse + "  " + HttpStatus.OK);
				} else {
					System.out.println("error sending push notifications: " + firebaseResponse.toString());
				}
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
			return "success";
		} else {
			return "<h1>Session expired! Please try again. <a href='login'>login</a> </h1>";
		}
	}// close backup method
	
	@RequestMapping(value = "blocked", method = RequestMethod.POST)
	public @ResponseBody String blocked(HttpServletRequest req, @RequestBody String imeiNumber) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			JSONObject body = new JSONObject();
			body.put("to",movDispositivoService.findGCMTokenByImei(imeiNumber));
			body.put("priority", "high");
			// body.put("dry_run", true);

			JSONObject payload = new JSONObject();
			payload.put("user_id", "1");
			payload.put("data_param_1", "block_status");

			JSONObject data = new JSONObject();
			data.put("image", "");
			data.put("is_background", "false");
			data.put("payload", payload);
			data.put("title", "Backup by admin");
			data.put("message", "MDMServices Admin");
			data.put("timestamp", DateUtils.getCurrentDate());
			body.put("data", data);
			HttpEntity<String> request = new HttpEntity<>(body.toString());
			CompletableFuture<FirebaseResponse> pushNotification = pushNotificationsService.send(request);
			CompletableFuture.allOf(pushNotification).join();
			try {
				FirebaseResponse firebaseResponse = pushNotification.get();
				if (firebaseResponse.getSuccess() == 1) {
					System.out.println("push notification sent ok!"+"        "+firebaseResponse + "  " + HttpStatus.OK);
				} else {
					System.out.println("error sending push notifications: " + firebaseResponse.toString());
				}
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
			return "success";
		} else {
			return "<h1>Session expired! Please try again. <a href='login'>login</a> </h1>";
		}
	}// close blocked method
	
	@RequestMapping(value = "timeblocked", method = RequestMethod.POST)
	public @ResponseBody String timeBlocked(HttpServletRequest req, @RequestBody String imeiNumber) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			JSONObject body = new JSONObject();
			body.put("to",movDispositivoService.findGCMTokenByImei(imeiNumber.replace('"', ' ').trim()));
			body.put("priority", "high");
			// body.put("dry_run", true);

			JSONObject payload = new JSONObject();
			payload.put("user_id", "1");
			payload.put("data_param_1", "block_status");

			JSONObject data = new JSONObject();
			data.put("image", "");
			data.put("is_background", "false");
			data.put("payload", payload);
			data.put("title", "Time Blocked by admin");
			data.put("message", "MDMServices Admin");
			data.put("timestamp", DateUtils.getCurrentDate());
			body.put("data", data);
			HttpEntity<String> request = new HttpEntity<>(body.toString());
			CompletableFuture<FirebaseResponse> pushNotification = pushNotificationsService.send(request);
			CompletableFuture.allOf(pushNotification).join();
			try {
				FirebaseResponse firebaseResponse = pushNotification.get();
				if (firebaseResponse.getSuccess() == 1) {
					System.out.println("push notification sent ok!"+"        "+firebaseResponse + "  " + HttpStatus.OK);
				} else {
					System.out.println("error sending push notifications: " + firebaseResponse.toString());
				}
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
			return "success";
		} else {
			return "<h1>Session expired! Please try again. <a href='login'>login</a> </h1>";
		}
	}// close timeBlocked method
}
