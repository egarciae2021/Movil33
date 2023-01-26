package com.lue.pcsistel.service;

import java.util.List;
import java.util.Map;

import com.lue.pcsistel.dto.GENClienteDTO;
import com.lue.pcsistel.model.GENCliente;

/**
 *
 * @author lue
 */
public interface GENClienteService {

	GENClienteDTO findById(Integer id);

	void save(GENCliente entity);

	void update(GENCliente entity);

	void delete(GENCliente entity);

	void saveClient(GENClienteDTO genClienteDTO);

	List<Object[]> getCliNameIsBtEST();

	GENClienteDTO findByIdIsEST(Integer id);

	void deleteGENClientByPK(Integer id);

	byte[] getLogo(Integer itemId);

	String getClientId();

	Map<String, Long> getAdminPanelDetails();

	List<GENClienteDTO> findAllClientIsEST();

	void updateGenClient(GENClienteDTO genClienteDTO);

	Integer getClientIdById(int id);

	Map<String, Long> clientPanelDetailsByCliId(Integer clientfk);

	void updateClientLogo(byte[] bytes, Integer clientPk);

	Integer countAllClient();

}
