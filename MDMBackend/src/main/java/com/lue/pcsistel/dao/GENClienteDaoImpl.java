package com.lue.pcsistel.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.lue.pcsistel.model.GENCliente;

/**
 *
 * @author lue
 */

@Repository("genClienteDao")
public class GENClienteDaoImpl extends AbstractDao<Integer, GENCliente> implements GENClienteDao {

	@Override
	public GENCliente findById(Integer id) {
		return getByKey(id);
	}

	@Override
	public void save(GENCliente entity) {
		persist(entity);
	}

	@SuppressWarnings({ "unchecked" })
	@Override
	public List<Object[]> getCliNameIsBtEST() {
		return getSession().getNamedQuery("GENCliente.findvcNomCliISbtEst").list();
	}

	@SuppressWarnings("deprecation")
	@Override
	public GENCliente findByIdIsEST(Integer id) {

		return (GENCliente) getSession().getNamedQuery("GENCliente.findByPinCodCliisEst").setInteger("pinCodCli", id)
				.getSingleResult();
	}

	@SuppressWarnings("deprecation")
	@Override
	public void deleteGENClientByPK(Integer id) {
		getSession().getNamedQuery("GENCliente.updategenCliISbtEst").setInteger("pinCodCli", id).executeUpdate();
	}

	@SuppressWarnings("deprecation")
	@Override
	public byte[] getLogo(Integer id) {
		return (byte[]) getSession().getNamedQuery("GENCliente.findLogById").setInteger("pinCodCli", id)
				.getSingleResult();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> getClientId() {
		return getSession().getNamedQuery("GENCliente.findpinCodCli").list();
	}

	@Override
	public Long countGenClientEST() {
		return (Long) getSession().getNamedQuery("GENCliente.countgenClientIsEST").getSingleResult();
	}

	@SuppressWarnings({ "unchecked" })
	@Override
	public List<GENCliente> findAllClientIsEST() {
		return getSession().getNamedQuery("GENCliente.findAll").list();
				//.setInteger("btEst", 1).list();
	}

	@SuppressWarnings("deprecation")
	@Override
	public Integer getClientIdById(int id) {
		Integer idValue=0;
		try{
			idValue=(Integer) getSession().getNamedQuery("GENCliente.findClientIDById")
			.setInteger("pinCodCli", id).getSingleResult();
		}catch(Exception e){
			idValue=0;
		}
		return idValue;
	}

	@SuppressWarnings("deprecation")
	@Override
	public void updateClientLogo(byte[] logo, Integer clientPk) {
		getSession().getNamedQuery("GENCliente.updateClientLogo")
		.setInteger("pinCodCli", clientPk)
		.setBinary("imLogo", logo)
		.executeUpdate();
		
		
	}

}
