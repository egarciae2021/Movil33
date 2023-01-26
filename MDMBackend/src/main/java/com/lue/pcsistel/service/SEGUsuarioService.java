package com.lue.pcsistel.service;

import com.lue.pcsistel.dto.VerifyUserDettail;
import com.lue.pcsistel.dto.ForgotPassword;
import com.lue.pcsistel.dto.SEGUsuarioDTO;
import com.lue.pcsistel.model.SEGUsuario;
import java.util.List;



public interface SEGUsuarioService {
	
	SEGUsuario findById(int id);
	
	SEGUsuario findByUserName(String sso);
	
	void saveUser(SEGUsuario user);
	
	void updateUser(SEGUsuario user);
	
	void deleteUserByUserName(String sso);

	List<SEGUsuario> findAllUsers(); 
	
	boolean isUserSSOUnique(Integer id, String sso);

	void saveAdminUser(SEGUsuarioDTO segUsuarioDTO);

	Long countByIdAndvcUsu(Integer id, String userName);

	List<SEGUsuarioDTO> findAllAdminUsers();

	void updateSEGUsESTByPK(Integer pinCod);

	SEGUsuarioDTO findSEGUsuariByPK(Integer id);

	void updateSEGUsuari(SEGUsuarioDTO segUsuarioDTO);

	void saveClientUser(SEGUsuarioDTO segUsuarioDTO);

	Integer findClientIdByUserName(String userName);

	List<SEGUsuarioDTO> findAllClientUsers();

	Long ifExistUserNameAndEmail(VerifyUserDettail fromJson);

	void forgotPassword(ForgotPassword fromJson);

	List<SEGUsuarioDTO> findAllClientUsersByCliId(Integer clientFk);

	void uploadImage(Integer id, byte[] bytes);

	byte[] findImageByUserPk(Integer id);



}