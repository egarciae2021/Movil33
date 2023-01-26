package com.lue.pcsistel.service;

import com.lue.pcsistel.model.MOVModeloDispositivo;
import com.lue.pcsistel.rest.request.DeviceRegisterRequest;

/**
 *
 * @author lue
 */
public interface MOVModeloDispositivoService {
 
     MOVModeloDispositivo findById(Integer id);

	 Integer save(MOVModeloDispositivo entity); 

	 void update(MOVModeloDispositivo entity); 

	 void delete(MOVModeloDispositivo entity);

	 Integer findModelPk(String deviceName);

	Integer saveDeviceModel(DeviceRegisterRequest request);
}
