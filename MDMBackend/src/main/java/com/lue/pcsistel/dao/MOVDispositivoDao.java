package com.lue.pcsistel.dao;

import java.util.List;

import com.lue.pcsistel.model.MOVDispositivo;

/**
 *
 * @author lue
 */
public interface MOVDispositivoDao {

	MOVDispositivo findById(Integer id);

	void save(MOVDispositivo entity);

	void update(MOVDispositivo entity);

	void delete(MOVDispositivo entity);

	List<MOVDispositivo> findAllDevByMemplPK(String mEmplPk);

	void deleteByDevicePk(String id);

	MOVDispositivo findByDevicePk(String id);

	Long countMOVDispositivoEST();

	void updateMOVDispositivo(MOVDispositivo mOVDispositivo);

	MOVDispositivo findByPKAndFK(String pvcCodIMEI, int finCodCli);

	List<MOVDispositivo> findAllDevicesIsEST();

	Long ifNotExistMOVDispositivoVcCodeEMEI(String imeiNumber);

	Long countMOVDispositivoByClientFk(Integer clientfk);

	List<MOVDispositivo> findAllDevicesByCliId(Integer clientFk);

	void updateGSMToken( String imei,String gcmToken);


	void updateDispositivo(String imei, String authToken);

	String findGCMTokenByImei(String imeiNumber);

}
