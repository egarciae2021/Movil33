package com.lue.pcsistel.rest.api;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.lue.pcsistel.rest.request.DeviceLocation;
import com.lue.pcsistel.rest.request.DeviceRegisterRequest;
import com.lue.pcsistel.rest.request.UploadAppRequest;
import com.lue.pcsistel.rest.response.DeviceRegisterResponse;
import com.lue.pcsistel.rest.response.GenericResponse;
import com.lue.pcsistel.service.MOVDispositivoService;

/**
 *
 * @author Nitesh
 */
@RestController
@RequestMapping("/rest")
public class DeviceController {

    @Autowired
    private MOVDispositivoService movDispositivoService;

    
    @RequestMapping(value = "/device/register", method = RequestMethod.POST)
    @ResponseBody
    public DeviceRegisterResponse register(@RequestBody DeviceRegisterRequest request) {
    	DeviceRegisterResponse response=new DeviceRegisterResponse();
    	response.setStatus(400);
    	if(request.getRegCode().length()<6){
    		response.setMessage("Código de registro, sólo 06 dígitos.");
    		return response;
    	}
    	if(request.getImeiNumber().length()<14){
    		response.setMessage("IMEI mínimo 14 dígitos");
    		return response;
    	}
    	if(request.getDeviceName().length()<3){
    		response.setMessage("Nombre de dispositivo, mínimo 03 dígitos");
    		return response;
    	}
    	return movDispositivoService.saveDevice(request);
    }

    @RequestMapping(value = "/device/uploadapp", method = RequestMethod.POST)
    @ResponseBody
    public GenericResponse uploadApps(@RequestHeader("Auth-Token") String token, @RequestBody UploadAppRequest request) {

        GenericResponse response = new GenericResponse();
        try{
        	response= movDispositivoService.uploadApps(token,request);
        }catch(RuntimeException e){
        	e.getMessage();
        }
        return response;
    }
    
    
    @RequestMapping(value = "/device/deviceapplist", method = RequestMethod.GET)
    @ResponseBody
    public GenericResponseAppList deviceAppList(@RequestHeader("Auth-Token") String token) {

        return movDispositivoService.deviceAppList(token);
    }
    
    @RequestMapping(value = "/device/gcmtokenupdate", method = RequestMethod.POST)
    @ResponseBody
    public GenericResponse updateGCMToken(@RequestHeader("Auth-Token") String token, @RequestBody String gcmToken) {
    	return movDispositivoService.updateGCMToken(token,gcmToken);
        
    }
    

    @RequestMapping(value = "/device/test", method = RequestMethod.GET)
    @ResponseBody
    public GenericResponse test(@RequestHeader("Auth-Token") String token) {

        GenericResponse gr = new GenericResponse();
        gr.setMessage("Success " + token);
        gr.setStatus(200);
        return gr;
    }

//    @RequestMapping(value = "/device/genRegCode/{id}", method = RequestMethod.GET)
//    @ResponseBody
//    public GenericResponse genRegCode(@PathVariable("id") Long id) {
//        MEmplPK pk = new MEmplPK(1, "E001");
//        MEmpl empl = new MEmpl(pk);
//        MEmplRegCode regCode = new MEmplRegCode("123456", new Date(), new Date(), empl);
//        mEmplRegCodeService.save(regCode);
//        GenericResponse gr = new GenericResponse();
//        gr.setMessage("Success");
//        gr.setStatus(200);
//        return gr;
//    }
    
    
    @RequestMapping(value = "/device/uploadLocation", method = RequestMethod.POST)
    @ResponseBody
    public GenericResponse uploadLocation(@RequestHeader("Auth-Token") String token, @RequestBody DeviceLocation deviceLocation) {
        GenericResponse response =null;
        response=movDispositivoService.uploadLocation(token,deviceLocation);
        return response;
    }
}
