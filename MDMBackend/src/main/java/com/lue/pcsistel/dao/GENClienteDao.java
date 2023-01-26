package com.lue.pcsistel.dao;

import java.util.List;

import com.lue.pcsistel.model.GENCliente;

/**
 *
 * @author lue
 */
public interface GENClienteDao {

	GENCliente findById(Integer id);

	void save(GENCliente entity);

	void update(GENCliente entity);

	void delete(GENCliente entity);

	List<Object[]> getCliNameIsBtEST();

	GENCliente findByIdIsEST(Integer id);

	void deleteGENClientByPK(Integer id);

	byte[] getLogo(Integer id);

	List<Object[]> getClientId();

	Long countGenClientEST();

	List<GENCliente> findAllClientIsEST();

	Integer getClientIdById(int id);

	void updateClientLogo(byte[] logo, Integer clientPk);
}
