package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.MOVDispositivo;

import java.util.List;

import org.springframework.stereotype.Repository;

/**
 *
 * @author lue
 */

@Repository("movDispositivoDao")
public class MOVDispositivoDaoImpl extends AbstractDao<Integer, MOVDispositivo> implements MOVDispositivoDao {

	@Override
	public MOVDispositivo findById(Integer id) {
		return getByKey(id);
	}

	@Override
	public void save(MOVDispositivo entity) {
		
		
		persist(entity);
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<MOVDispositivo> findAllDevByMemplPK(String mEmplPk) {
		return getSession().createNamedQuery("MOVDispositivo.findAllByMEmplPkAndbtVig")
				.setString("eMPLPvcCODEMP", mEmplPk).list();

	}

	@SuppressWarnings("deprecation")
	@Override
	public void deleteByDevicePk(String id) {
		getSession().createNamedQuery("MOVDispositivo.updatebtVig").setString("pvcCodIMEI", id).executeUpdate();
	}

	@SuppressWarnings("deprecation")
	@Override
	public MOVDispositivo findByDevicePk(String id) {

		return (MOVDispositivo) getSession().createNamedQuery("MOVDispositivo.findByPvcCodIMEIAndIsbtVig")
				.setString("pvcCodIMEI", id).getSingleResult();
	}//

	@Override
	public Long countMOVDispositivoEST() {
		return (Long) getSession().createNamedQuery("MOVDispositivo.countMOVDispositivoIsbtVig").getSingleResult();
	}

	@SuppressWarnings("deprecation")
	@Override
	public void updateMOVDispositivo(MOVDispositivo mOVDispositivo) {
		getSession().createNamedQuery("MOVDispositivo.updateDeviceDetailsByImei")
		.setBoolean("btVig", mOVDispositivo.getBtVig())
		.setInteger("pinCod", mOVDispositivo.getFinCodModDis().getPinCod())
		.setDate("dtFecIng", mOVDispositivo.getDtFecIng())
		.setString("pvcCodIMEI", mOVDispositivo.getMOVDispositivoPK().getPvcCodIMEI())
		.executeUpdate();
		
		
	}

	@SuppressWarnings("deprecation")
	@Override
	public MOVDispositivo findByPKAndFK(String pvcCodIMEI, int finCodCli) {
		return (MOVDispositivo) getSession().createNamedQuery("MOVDispositivo.findByPKFKMOVDispositivo")
				.setString("pvcCodIMEI", pvcCodIMEI).setInteger("finCodCli", finCodCli).getSingleResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<MOVDispositivo> findAllDevicesIsEST() {
		return getSession().createNamedQuery("MOVDispositivo.findAll").list();

	}

	@SuppressWarnings("deprecation")
	@Override
	public Long ifNotExistMOVDispositivoVcCodeEMEI(String imeiNumber) {
		return (Long) getSession().createNamedQuery("MOVDispositivo.countMOVDispositivoByIMEINumber")
				.setString("pvcCodIMEI", imeiNumber).getSingleResult();
	}

	@SuppressWarnings("deprecation")
	@Override
	public Long countMOVDispositivoByClientFk(Integer clientFk) {
		return (Long) getSession().createNamedQuery("MOVDispositivo.countMOVDispositivoByClientFk")
				.setInteger("finCodCli", clientFk).getSingleResult();
	}
	
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<MOVDispositivo> findAllDevicesByCliId(Integer clientFk) {
		return getSession().createNamedQuery("MOVDispositivo.findAllDevicesByCliId")
				.setInteger("finCodCli", clientFk).list();
	}

	
	@SuppressWarnings("deprecation")
	@Override
	public void updateGSMToken(String imei,String gcmToken) {
		getSession().createNamedQuery("MOVDispositivo.updategcmTokenByIEMI")
		.setString("pushToken", gcmToken)
		.setString("pvcCodIMEI", imei)
		.executeUpdate();
	}

	@SuppressWarnings("deprecation")
	@Override
	public void updateDispositivo(String imei, String authToken) {
		getSession().createNamedQuery("MOVDispositivo.updateauthTokenByIEMI")
		.setString("authToken", authToken)
		.setString("pvcCodIMEI", imei)
		.executeUpdate();
	}

	@SuppressWarnings("deprecation")
	@Override
	public String findGCMTokenByImei(String imeiNumber) {
		return (String) getSession().createNamedQuery("MOVDispositivo.findGCMTokenByImei")
				.setString("pvcCodIMEI", imeiNumber).getSingleResult();
	}

	
}
