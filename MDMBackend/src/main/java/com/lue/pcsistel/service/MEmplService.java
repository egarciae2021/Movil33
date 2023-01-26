package com.lue.pcsistel.service;

import java.util.List;

import com.lue.pcsistel.dto.MEmplDTO;
import com.lue.pcsistel.model.MEmpl;
import com.lue.pcsistel.model.MEmplPK;

/**
 *
 * @author lue
 */
public interface MEmplService {

	MEmpl findById(MEmplPK id);

	void save(MEmpl entity);

	void update(MEmpl entity);

	void delete(MEmpl entity);

	List<MEmplDTO> findAllByMOrgaPK(Integer id);

	MEmplDTO findByMEmplId(String mEmplId);

	void detleteByMEmplPk(String mEmplId);

	MEmplDTO findMEmplByPK(String id);

	List<MEmplDTO> findAllIsEST();

	void updateMEmpl(MEmplDTO emplDTO);

	Boolean addNewAdminMempl(MEmplDTO emplDTO);

	List<MEmplDTO> findAll();

	Long saveMEmpl(MEmplDTO emplDTO);

	String getMEmplIdById(String id);

	List<Object[]> findAllAdminEmplIsEST(Integer clientId, Integer mOrga);

	String findMEmplIdAndNameByMorgaId(Integer id);

	List<MEmplDTO> findAllMEmplByCliId(Integer attribute);

	MEmplDTO findMEmplByPKAndCliId(String id, Integer attribute);


}
