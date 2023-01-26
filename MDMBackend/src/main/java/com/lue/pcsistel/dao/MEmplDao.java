package com.lue.pcsistel.dao;

import java.util.List;

import com.lue.pcsistel.model.MEmpl;
import com.lue.pcsistel.model.MEmplPK;

/**
 *
 * @author lue
 */
public interface MEmplDao {
   
     MEmpl findById(MEmplPK id);

	 Boolean save(MEmpl entity); 

	 void update(MEmpl entity); 

	 void delete(MEmpl entity);

	public List<MEmpl> findAdd();

	List<MEmpl> findAllByMOrgaPK(Integer id);

	MEmpl findByIdMEmpl(String emplId);

	void detleteByMEmplPk(String mEmplId);

	List<MEmpl> findAllIsEST();

	Long countMEmpl();
	
	public void saveOrUpdate(MEmpl mEmpl);

	List<MEmpl> findAll();

	String getMEmplIdById(String id);

	void saveMEmpl(MEmpl mEmplDTOToMEmpl);

	List<Object[]> findAllAdminEmplIsEST(Integer clientId, Integer mOrga);

	List<Object[]> findMEmplIdAndNameByMorgaId(Integer id);

	Long countMEmplByClientFk(Integer clientfk);

	List<MEmpl> findAllMEmplByCliId(Integer clientId);

	MEmpl findMEmplByPKAndCliId(String id, Integer clientFk);

         
        
}
