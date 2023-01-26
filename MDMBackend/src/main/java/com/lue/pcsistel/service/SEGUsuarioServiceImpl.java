package com.lue.pcsistel.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lue.pcsistel.dao.SEGUsuarioDao;
import com.lue.pcsistel.dto.VerifyUserDettail;
import com.lue.pcsistel.dto.ForgotPassword;
import com.lue.pcsistel.dto.SEGUsuarioDTO;
import com.lue.pcsistel.model.SEGPerfil;
import com.lue.pcsistel.model.SEGPerfilPK;
import com.lue.pcsistel.model.SEGUsuario;
import com.lue.pcsistel.model.SEGUsuarioConfiguracion;
import com.lue.pcsistel.model.SEGUsuarioConfiguracionPK;
import com.lue.pcsistel.utils.BeanCopyUtils;

@Service("userService")
@Transactional
public class SEGUsuarioServiceImpl implements SEGUsuarioService {

	@Autowired
	private SEGUsuarioDao dao;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public SEGUsuario findById(int id) {
		return dao.findById(id);
	}

	public SEGUsuario findByUserName(String sso) {
		SEGUsuario user = dao.findByUserName(sso);
		return user;
	}

	public void saveUser(SEGUsuario user) {
		user.setVcPas(passwordEncoder.encode(user.getVcPas()));
		dao.save(user);
	}

	/*
	 * Since the method is running with Transaction, No need to call hibernate
	 * update explicitly. Just fetch the entity from db and update it with
	 * proper values within transaction. It will be updated in db once
	 * transaction ends.
	 */
	public void updateUser(SEGUsuario user) {

		SEGUsuario entity = dao.findById(user.getSEGUsuarioPK().getPinCod());
		if (entity != null) {

			entity.setVcUsu(user.getVcUsu());
			if (!user.getVcPas().equals(entity.getVcPas())) {
				entity.setVcPas(passwordEncoder.encode(user.getVcPas()));
			}
			// entity.setFirstName(user.getFirstName());
			// entity.setLastName(user.getLastName());
			// entity.setEmail(user.getEmail());
			// entity.setUserProfiles(user.getUserProfiles());
		}
	}

	public void deleteUserByUserName(String sso) {
		dao.deleteByUserName(sso);
	}

	public List<SEGUsuario> findAllUsers() {
		return dao.findAllUsers();
	}

	public boolean isUserSSOUnique(Integer id, String sso) {
		SEGUsuario user = findByUserName(sso);
		return (user == null || ((id != null) && (user.getSEGUsuarioPK().getPinCod() == id)));
	}

	@Override
	public void saveAdminUser(SEGUsuarioDTO segUsuarioDTO) {
		SEGUsuario segUsuario = BeanCopyUtils.segUsuarioDTOToSEGUsuario(segUsuarioDTO);
		segUsuario.setBtEst(false);
		segUsuario.setGuidAD("  ");
		segUsuario.setChatActivo(false);
		segUsuario.setCorreoBK("    ");
		segUsuario.setDtFecUltAcceso(new Date());
		Collection<SEGPerfil> segPerfils = new ArrayList<>(1);
		SEGPerfil segPerfil = new SEGPerfil();
		SEGPerfilPK segPerfilPK = new SEGPerfilPK();
		segPerfilPK.setPinCod(segUsuarioDTO.getsEGUsuarioPK().getPinCod());
		segPerfilPK.setFinCodCli(segUsuarioDTO.getsEGUsuarioPK().getFinCodCli());
		segPerfil.setSEGPerfilPK(segPerfilPK);
		segPerfil.setBtVig(true);
		segPerfil.setCodigoPerfil("Profile");
		segPerfil.setFinCodTipConsumo(0);
		segPerfil.setFinCodTipDashEmpl(1);
		segPerfil.setFinCodTipDashMovil(1);
		segPerfil.setFinCodTipGeneral(1);
		segPerfil.setIdTemporizador(-1);
		segPerfil.setVcNom("ADMIN");
		segPerfils.add(segPerfil);
		segUsuario.setDtFecAcceso(new Date());
		segUsuario.setDtFecIniActiv(new Date());
		segUsuario.setDtFecAcceso(new Date());

		segUsuario.setSegPerfils(segPerfils);

		Set<SEGUsuarioConfiguracion> segUsuarioConfiguracions = new HashSet<>(1);
		SEGUsuarioConfiguracion usuarioConfiguracion = new SEGUsuarioConfiguracion();
		SEGUsuarioConfiguracionPK segUsuarioConfiguracionPK = new SEGUsuarioConfiguracionPK();
		segUsuarioConfiguracionPK.setFinCodCli(segUsuarioDTO.getsEGUsuarioPK().getFinCodCli());
		segUsuarioConfiguracionPK.setFinCodUsu(segUsuarioDTO.getsEGUsuarioPK().getPinCod());
		usuarioConfiguracion.setSEGUsuarioConfiguracionPK(segUsuarioConfiguracionPK);
		segUsuarioConfiguracions.add(usuarioConfiguracion);

		segUsuario.setsEGUsuarioConfiguracions(segUsuarioConfiguracions);
		segUsuario.setVcPas(passwordEncoder.encode(segUsuarioDTO.getVcPas()));
		dao.save(segUsuario);
	}

	@Override
	public Long countByIdAndvcUsu(Integer id, String userName) {
		return dao.countByIdAndvcUsu(id, userName);

	}

	@Override
	public List<SEGUsuarioDTO> findAllAdminUsers() {
		List<SEGUsuarioDTO> segUsuarioDTOs = new ArrayList<>();
		for (SEGUsuario segUsuario : dao.findAllAdminUsers()) {
			segUsuarioDTOs.add(BeanCopyUtils.segUsuarioToSEGUsuarioDTO(segUsuario));
		}
		return segUsuarioDTOs;
	}

	@Override
	public void updateSEGUsESTByPK(Integer pinCod) {
		dao.updateSEGUsESTByPK(pinCod);

	}

	@Override
	public SEGUsuarioDTO findSEGUsuariByPK(Integer id) {
		return BeanCopyUtils.segUsuarioToSEGUsuarioDTO(dao.findSEGUsuariByPK(id));
	}

	@Override
	public void updateSEGUsuari(SEGUsuarioDTO segUsuarioDTO) {
		dao.updateSEGUsuari(BeanCopyUtils.segUsuarioDTOToSEGUsuario(segUsuarioDTO));
		
	}

	@Override
	public void saveClientUser(SEGUsuarioDTO segUsuarioDTO) {
		SEGUsuario segUsuario = BeanCopyUtils.segUsuarioDTOToSEGUsuario(segUsuarioDTO);
		segUsuario.setBtEst(false);
		segUsuario.setGuidAD("  ");
		segUsuario.setChatActivo(false);
		segUsuario.setCorreoBK("    ");
		segUsuario.setDtFecUltAcceso(new Date());
		Collection<SEGPerfil> segPerfils = new ArrayList<>(1);
		SEGPerfil segPerfil = new SEGPerfil();
		SEGPerfilPK segPerfilPK = new SEGPerfilPK();
		segPerfilPK.setPinCod(segUsuarioDTO.getsEGUsuarioPK().getPinCod());
		segPerfilPK.setFinCodCli(segUsuarioDTO.getsEGUsuarioPK().getFinCodCli());
		segPerfil.setSEGPerfilPK(segPerfilPK);
		segPerfil.setBtVig(true);
		segPerfil.setCodigoPerfil("Profile");
		segPerfil.setFinCodTipConsumo(0);
		segPerfil.setFinCodTipDashEmpl(1);
		segPerfil.setFinCodTipDashMovil(1);
		segPerfil.setFinCodTipGeneral(1);
		segPerfil.setIdTemporizador(-1);
		segPerfil.setVcNom("CLIENT");
		segPerfils.add(segPerfil);
		segUsuario.setDtFecAcceso(new Date());
		segUsuario.setDtFecIniActiv(new Date());
		segUsuario.setDtFecAcceso(new Date());

		segUsuario.setSegPerfils(segPerfils);

		Set<SEGUsuarioConfiguracion> segUsuarioConfiguracions = new HashSet<>(1);
		SEGUsuarioConfiguracion usuarioConfiguracion = new SEGUsuarioConfiguracion();
		SEGUsuarioConfiguracionPK segUsuarioConfiguracionPK = new SEGUsuarioConfiguracionPK();
		segUsuarioConfiguracionPK.setFinCodCli(segUsuarioDTO.getsEGUsuarioPK().getFinCodCli());
		segUsuarioConfiguracionPK.setFinCodUsu(segUsuarioDTO.getsEGUsuarioPK().getPinCod());
		usuarioConfiguracion.setSEGUsuarioConfiguracionPK(segUsuarioConfiguracionPK);
		segUsuarioConfiguracions.add(usuarioConfiguracion);

		segUsuario.setsEGUsuarioConfiguracions(segUsuarioConfiguracions);
		segUsuario.setVcPas(passwordEncoder.encode(segUsuarioDTO.getVcPas()));
		dao.save(segUsuario);
	}

	@Override
	public Integer findClientIdByUserName(String userName) {
		return dao.findClientIdByUserName(userName);
	}

	@Override
	public List<SEGUsuarioDTO> findAllClientUsers() {
		List<SEGUsuarioDTO> segUsuarioDTOs = new ArrayList<>();
		for (SEGUsuario segUsuario : dao.findAllClientUsers()) {
			segUsuarioDTOs.add(BeanCopyUtils.segUsuarioToSEGUsuarioDTO(segUsuario));
		}
		return segUsuarioDTOs;
	}

	@Override
	public Long ifExistUserNameAndEmail(VerifyUserDettail data) {
		Long count=0l;
		try{
			count=dao.ifExistUserNameAndEmail(data.getUserName(),data.getEmail());
		}catch(Exception e){
			e.printStackTrace();
		}
		return count;
	}

	
	@Override
	public void forgotPassword(ForgotPassword data) {
		dao.forgotPassword(data.getUserName(),passwordEncoder.encode(data.getPassword()));
		
	}

	@Override
	public List<SEGUsuarioDTO> findAllClientUsersByCliId(Integer clientFk) {
		List<SEGUsuarioDTO> segUsuarioDTOs = new ArrayList<>();
		for (SEGUsuario segUsuario : dao.findAllClientUsersByCliId(clientFk)) {
			segUsuarioDTOs.add(BeanCopyUtils.segUsuarioToSEGUsuarioDTO(segUsuario));
		}
		return segUsuarioDTOs;
	}

	@Override
	public void uploadImage(Integer id, byte[] bytes) {
		dao.uploadImage(id,bytes);
	}

	@Override
	public byte[] findImageByUserPk(Integer id) {
		return dao.findImageByUserPk(id);
	}
}
