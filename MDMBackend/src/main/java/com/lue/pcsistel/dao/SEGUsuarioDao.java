package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.SEGUsuario;
import java.util.List;



public interface SEGUsuarioDao {

	SEGUsuario findById(int id);
	
	SEGUsuario findByUserName(String sso);
	
	void save(SEGUsuario user);
	
	void deleteByUserName(String sso);
	
	List<SEGUsuario> findAllUsers();

	List<SEGUsuario> findAllAdminUsers();

	Long countUsuarioEST();

	public Long countByIdAndvcUsu(Integer id, String userName);

	void updateSEGUsESTByPK(Integer pinCod);

	SEGUsuario findSEGUsuariByPK(Integer id);

	void updateSEGUsuari(SEGUsuario segUsuario);

	Integer findClientIdByUserName(String userName);

	List<SEGUsuario> findAllClientUsers();

	Long ifExistUserNameAndEmail(String userName, String email);

	void forgotPassword(String userName, String password);

	Long countUsuarioByClientFk(Integer clientfk);

	List<SEGUsuario> findAllClientUsersByCliId(Integer clientFk);

	void uploadImage(Integer id, byte[] bytes);

	byte[] findImageByUserPk(Integer id);


}

