package com.lue.pcsistel.service;

import java.util.List;

import com.lue.pcsistel.dto.MOVDispositivoDTO;
import com.lue.pcsistel.model.MOVDispositivo;
import com.lue.pcsistel.rest.api.GenericResponseAppList;
import com.lue.pcsistel.rest.request.DeviceLocation;
import com.lue.pcsistel.rest.request.DeviceRegisterRequest;
import com.lue.pcsistel.rest.request.UploadAppRequest;
import com.lue.pcsistel.rest.response.DeviceRegisterResponse;
import com.lue.pcsistel.rest.response.GenericResponse;

/**
 *
 * @author lue
 */
public interface MOVDispositivoService {
    
      MOVDispositivo findById(Integer id);

	 void save( MOVDispositivo entity); 

	 void update( MOVDispositivo entity); 

	 void delete( MOVDispositivo entity);

	List<MOVDispositivoDTO> findAllDevByMemplPK(String mEmplPk);

	void deleteByDevicePk(String id);

	MOVDispositivoDTO findByDevicePk(String id);

	void updateMOVDispositivo(MOVDispositivoDTO dispositivoDTO);
	MOVDispositivo findDeviceByImei(String imei);

	GenericResponse uploadApps(String token, UploadAppRequest request);

	GenericResponse uploadLocation(String token, DeviceLocation deviceLocation);

	List<MOVDispositivoDTO> findAllDevicesIsEST();

	boolean ifNotExistMOVDispositivoVcCodeEMEI(String imeiNumber);

	List<MOVDispositivoDTO> findAllDevicesByCliId(Integer attribute);

	GenericResponseAppList deviceAppList(String token);

	DeviceRegisterResponse saveDevice(DeviceRegisterRequest request);

	GenericResponse updateGCMToken(String token,String gcmToken);

	String findGCMTokenByImei(String imeiNumber);

}
