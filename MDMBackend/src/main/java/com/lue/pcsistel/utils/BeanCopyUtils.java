package com.lue.pcsistel.utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.BeanUtils;

import com.lue.pcsistel.dto.GENClienteDTO;
import com.lue.pcsistel.dto.GENCulturaDTO;
import com.lue.pcsistel.dto.GENPaisDTO;
import com.lue.pcsistel.dto.MEmplDTO;
import com.lue.pcsistel.dto.MEmplPKDTO;
import com.lue.pcsistel.dto.MOVDeviceAppDTO;
import com.lue.pcsistel.dto.MOVDeviceAppResponseDTO;
import com.lue.pcsistel.dto.MOVDispositivoDTO;
import com.lue.pcsistel.dto.MOVDispositivoPKDTO;
import com.lue.pcsistel.dto.MOVEstadoDTO;
import com.lue.pcsistel.dto.MOVLineaDTO;
import com.lue.pcsistel.dto.MOVModeloDispositivoDTO;
import com.lue.pcsistel.dto.MOrgaDTO;
import com.lue.pcsistel.dto.MOrgaPKDTO;
import com.lue.pcsistel.dto.SEGPerfilDTO;
import com.lue.pcsistel.dto.SEGPerfilPKDTO;
import com.lue.pcsistel.dto.SEGUsuarioDTO;
import com.lue.pcsistel.dto.SEGUsuarioHistoricoDTO;
import com.lue.pcsistel.dto.SEGUsuarioHistoricoPKDTO;
import com.lue.pcsistel.dto.SEGUsuarioPKDTO;
import com.lue.pcsistel.model.GENCliente;
import com.lue.pcsistel.model.GENCultura;
import com.lue.pcsistel.model.GENPais;
import com.lue.pcsistel.model.MEmpl;
import com.lue.pcsistel.model.MEmplPK;
import com.lue.pcsistel.model.MOVDeviceApp;
import com.lue.pcsistel.model.MOVDispositivo;
import com.lue.pcsistel.model.MOVDispositivoPK;
import com.lue.pcsistel.model.MOVEstado;
import com.lue.pcsistel.model.MOVLinea;
import com.lue.pcsistel.model.MOVModeloDispositivo;
import com.lue.pcsistel.model.MOrga;
import com.lue.pcsistel.model.MOrgaPK;
import com.lue.pcsistel.model.SEGPerfil;
import com.lue.pcsistel.model.SEGPerfilPK;
import com.lue.pcsistel.model.SEGUsuario;
import com.lue.pcsistel.model.SEGUsuarioHistorico;
import com.lue.pcsistel.model.SEGUsuarioHistoricoPK;
import com.lue.pcsistel.model.SEGUsuarioPK;

import sun.misc.BASE64Encoder;

public class BeanCopyUtils {
	public static MOrgaDTO mOrgaToMOrgaDTO(MOrga mOrga) {
		MOrgaDTO dto = new MOrgaDTO();
		MOrgaPKDTO mOrgaPKDTO = new MOrgaPKDTO();
		GENClienteDTO genClienteDTO = new GENClienteDTO();
		Collection<MEmplDTO> collectionDTO = new ArrayList<>();

		BeanUtils.copyProperties(mOrga, dto);

		GENCliente genCliente = mOrga.getGENCliente();
		BeanUtils.copyProperties(genCliente, genClienteDTO);
		dto.setgENCliente(genClienteDTO);

		MOrgaPK mOrgaPK = mOrga.getMOrgaPK();
		BeanUtils.copyProperties(mOrgaPK, mOrgaPKDTO);
		dto.setmOrgaPK(mOrgaPKDTO);

		Collection<MEmpl> collection = mOrga.getMEmplCollection();
		for (MEmpl mEmpl : collection) {
			MEmplDTO mEmplDTO = new MEmplDTO();
			BeanUtils.copyProperties(mEmpl, mEmplDTO);
			collectionDTO.add(mEmplDTO);
		}
		dto.setmEmplCollection(collectionDTO);
		return dto;
	}

	public static MEmplDTO mEmplToMEmplDTO(MEmpl mEmpl) {

		MEmplDTO mEmplDTO = new MEmplDTO();
		if (mEmpl != null) {
			MEmplPKDTO mEmplPKDTO = new MEmplPKDTO();
			MOrgaDTO mOrgaDTO = new MOrgaDTO();
			Collection<MOVDispositivoDTO> movDispositivoDTOs = new ArrayList<>();
			Collection<MOVLineaDTO> movLineaDTOs = new ArrayList<>();
			Collection<SEGUsuarioDTO> segUsuarioDTOs = new ArrayList<>();
			MOrgaPKDTO orgaPKDTO = new MOrgaPKDTO();

			BeanUtils.copyProperties(mEmpl, mEmplDTO);

			MEmplPK mEmplPK = mEmpl.getMEmplPK();

			BeanUtils.copyProperties(mEmplPK, mEmplPKDTO);
			mEmplDTO.setmEmplPK(mEmplPKDTO);

			MOrga mOrga = mEmpl.getMOrga();
			BeanUtils.copyProperties(mOrga, mOrgaDTO);
			mEmplDTO.setmOrga(mOrgaDTO);

			MOrgaPK mOrgaPK = mOrga.getMOrgaPK();
			BeanUtils.copyProperties(mOrgaPK, orgaPKDTO);
			mOrgaDTO.setmOrgaPK(orgaPKDTO);

			Collection<MOVDispositivo> movDispositivos = mEmpl.getMOVDispositivoCollection();
			for (MOVDispositivo movDispositivo : movDispositivos) {
				MOVDispositivoDTO dispositivoDTO = new MOVDispositivoDTO();
				BeanUtils.copyProperties(movDispositivo, dispositivoDTO);
				movDispositivoDTOs.add(dispositivoDTO);
			}
			mEmplDTO.setmOVDispositivoCollection(movDispositivoDTOs);

			Collection<MOVLinea> movLineas = mEmpl.getMOVLineaCollection();
			for (MOVLinea movLinea : movLineas) {
				MOVLineaDTO movLineaDTO = new MOVLineaDTO();
				BeanUtils.copyProperties(movLinea, movLineaDTO);
				movLineaDTOs.add(movLineaDTO);
			}
			mEmplDTO.setmOVLineaCollection(movLineaDTOs);

			Collection<SEGUsuario> segUsuarios = mEmpl.getSEGUsuarioCollection();
			for (SEGUsuario segUsuario : segUsuarios) {
				SEGUsuarioDTO segUsuarioDTO = new SEGUsuarioDTO();
				BeanUtils.copyProperties(segUsuario, segUsuarioDTO);
				segUsuarioDTOs.add(segUsuarioDTO);
			}
			mEmplDTO.setsEGUsuarioCollection(segUsuarioDTOs);
		}
		return mEmplDTO;
	}

	public static MOrga mOrgaDTOToMOrga(MOrgaDTO mOrgaDTO) {
		MOrga mOrga = new MOrga();
		GENCliente genCliente = new GENCliente();
		Collection<MEmpl> collectionEmpl = new ArrayList<>();
		MOrgaPK mOrgaPK = new MOrgaPK();
		BeanUtils.copyProperties(mOrgaDTO, mOrga);
		GENClienteDTO genClienteDTO = mOrgaDTO.getgENCliente();

		BeanUtils.copyProperties(genClienteDTO, genCliente);

		mOrga.setGENCliente(genCliente);

		Collection<MEmplDTO> mEmplDTOs = mOrgaDTO.getmEmplCollection();
		if (mEmplDTOs != null) {
			for (MEmplDTO mEmplDTO : mEmplDTOs) {
				MEmpl mEmpl = new MEmpl();
				BeanUtils.copyProperties(mEmplDTO, mEmpl);
				collectionEmpl.add(mEmpl);
			}
		}
		mOrga.setMEmplCollection(collectionEmpl);

		MOrgaPKDTO mOrgaPKDTO = mOrgaDTO.getmOrgaPK();
		BeanUtils.copyProperties(mOrgaPKDTO, mOrgaPK);
		mOrga.setMOrgaPK(mOrgaPK);

		return mOrga;
	}

	public static MOVDispositivoDTO mOVDispositivoToMOVDispositivoDTO(MOVDispositivo dispositivo) {
		MOVDispositivoDTO dispositivoDTO = new MOVDispositivoDTO();

		try {
			MOVModeloDispositivoDTO movModeloDispositivoDTO = new MOVModeloDispositivoDTO();
			MOVEstadoDTO movEstadoDTO = new MOVEstadoDTO();
			MOVDispositivoPKDTO movDispositivoPKDTO = new MOVDispositivoPKDTO();
			Collection<MOVLineaDTO> movLineaDTOs = new ArrayList<>();

			BeanUtils.copyProperties(dispositivo, dispositivoDTO);

			MOVModeloDispositivo modeloDispositivo = dispositivo.getFinCodModDis();

			BeanUtils.copyProperties(modeloDispositivo, movModeloDispositivoDTO);
			dispositivoDTO.setFinCodModDis(movModeloDispositivoDTO);
			
			MEmplDTO mEmplDTO = new MEmplDTO();
			MEmpl mEmpl = dispositivo.getMEmpl();
			BeanUtils.copyProperties(mEmpl, mEmplDTO);
			dispositivoDTO.setmEmpl(mEmplDTO);

			MOVEstado movEstado = dispositivo.getFinEst();
			if (movEstado != null) {
				BeanUtils.copyProperties(movEstado, movEstadoDTO);
				dispositivoDTO.setFinEst(movEstadoDTO);
			}
			MOVDispositivoPK dispositivoPK = dispositivo.getMOVDispositivoPK();
			movDispositivoPKDTO.setFinCodCli(dispositivoPK.getFinCodCli());
			movDispositivoPKDTO.setPvcCodIMEI(dispositivoPK.getPvcCodIMEI());
			dispositivoDTO.setmOVDispositivoPK(movDispositivoPKDTO);

			
//			Collection<MOVLinea> movLineas = dispositivo.getMOVLineaCollection();
//			for (MOVLinea movLinea : movLineas) {
//				MOVLineaDTO movLineaDTO = new MOVLineaDTO();
//				BeanUtils.copyProperties(movLinea, movLineaDTO);
//				movLineaDTOs.add(movLineaDTO);
//			}
			dispositivoDTO.setmOVLineaCollection(movLineaDTOs);
		} catch (Exception e) {

		}

		return dispositivoDTO;
	}// mOVDispositivoToMOVDispositivoDTO

	public static GENCulturaDTO genCulturaToGENCulturaDTO(GENCultura cultura) {
		GENCulturaDTO culturaDTO = new GENCulturaDTO();

		Collection<GENClienteDTO> genClienteDTOs = new ArrayList<>();
		GENPaisDTO genPaisDTO = new GENPaisDTO();

		BeanUtils.copyProperties(cultura, culturaDTO);

		Collection<GENCliente> genClientes = cultura.getGENClienteCollection();
		for (GENCliente genCliente : genClientes) {
			GENClienteDTO clienteDTO = new GENClienteDTO();
			BeanUtils.copyProperties(genCliente, clienteDTO);
			genClienteDTOs.add(clienteDTO);
		}
		culturaDTO.setgENClienteCollection(genClienteDTOs);

		GENPais genPais = cultura.getFinCodPai();

		BeanUtils.copyProperties(genPais, genPaisDTO);
		return culturaDTO;
	}

	public static GENCliente genCClienteDTOToGENCliente(GENClienteDTO dto) {
		GENCliente genCliente = new GENCliente();

		GENCultura genCultura = new GENCultura();

		BeanUtils.copyProperties(dto, genCliente);

		GENCulturaDTO culturaDTO = dto.getInIdCultura();
		if (culturaDTO != null)
			BeanUtils.copyProperties(culturaDTO, genCultura);
		genCliente.setInIdCultura(genCultura);
		return genCliente;
	}

	public static GENClienteDTO genClientToGENClientDTO(GENCliente cliente) {
		GENClienteDTO clienteDTO = new GENClienteDTO();
		GENCulturaDTO genCulturaDTO = new GENCulturaDTO();

		
		if(cliente.getImLogo()!=null){
			//for image 
			BASE64Encoder base64Encoder = new BASE64Encoder();
			StringBuilder imageString = new StringBuilder();
			imageString.append("data:image/jpg;base64,");
			imageString.append(base64Encoder.encode(cliente.getImLogo()));
			clienteDTO.setImage(imageString.toString());
		}
		BeanUtils.copyProperties(cliente, clienteDTO);

		GENCultura genCultura = cliente.getInIdCultura();
		if (genCultura != null)
			BeanUtils.copyProperties(genCultura, genCulturaDTO);
		clienteDTO.setInIdCultura(genCulturaDTO);
		return clienteDTO;
	}

	public static MEmpl mEmplDTOToMEmpl(MEmplDTO dto) {
		MEmpl mEmpl = new MEmpl();
		MEmplPK mEmplPK = new MEmplPK();
		MOrga mOrga = new MOrga();
		MOrgaPK mOrgaPK = new MOrgaPK();

		BeanUtils.copyProperties(dto, mEmpl);

		MEmplPKDTO emplPKDTO = dto.getmEmplPK();
		BeanUtils.copyProperties(emplPKDTO, mEmplPK);
		mEmpl.setMEmplPK(mEmplPK);

		MOrgaDTO mOrgaDTO = dto.getmOrga();
		BeanUtils.copyProperties(mOrgaDTO, mOrga);

		MOrgaPKDTO mOrgaPKDTO = mOrgaDTO.getmOrgaPK();
		BeanUtils.copyProperties(mOrgaPKDTO, mOrgaPK);
		mOrga.setMOrgaPK(mOrgaPK);
		mEmpl.setMOrga(mOrga);

		return mEmpl;

	}

	public static MOVDispositivo mOVDispositivoDTOToMOVDispositivo(MOVDispositivoDTO dto) {
		MOVDispositivo movDispositivo = new MOVDispositivo();

		MOVDispositivoPK dispositivoPK = new MOVDispositivoPK();
		MOVEstado movEstado = new MOVEstado();
		MOVModeloDispositivo modeloDispositivo = new MOVModeloDispositivo();

		BeanUtils.copyProperties(dto, movDispositivo);

		MOVModeloDispositivoDTO movModeloDispositivoDTO = dto.getFinCodModDis();
		BeanUtils.copyProperties(movModeloDispositivoDTO, modeloDispositivo);
		movDispositivo.setFinCodModDis(modeloDispositivo);

		MOVDispositivoPKDTO dispositivoPKDTO = dto.getmOVDispositivoPK();
		BeanUtils.copyProperties(dispositivoPKDTO, dispositivoPK);
		movDispositivo.setMOVDispositivoPK(dispositivoPK);

		MOVEstadoDTO movEstadoDTO = dto.getFinEst();
		BeanUtils.copyProperties(movEstadoDTO, movEstado);
		movDispositivo.setFinEst(movEstado);

		return movDispositivo;
	}

	public static MOVDeviceAppDTO movDeviceAppToMOVDeviceAppDTO(MOVDeviceApp movDeviceApp) {
		MOVDeviceAppDTO deviceAppDTO = new MOVDeviceAppDTO();
		//MOVDispositivoDTO dispositivoDTO = new MOVDispositivoDTO();
		//MOVDispositivoPKDTO dispositivoPKDTO = new MOVDispositivoPKDTO();

		BeanUtils.copyProperties(movDeviceApp, deviceAppDTO);

		/*MOVDispositivo dispositivo = movDeviceApp.getDispositivo();
		//BeanUtils.copyProperties(dispositivo, dispositivoDTO);
		try{
			dispositivoDTO.setBtSopLin(dispositivo.getBtSopLin());
			dispositivoDTO.setBtVig(dispositivo.getBtVig());
		}catch(RuntimeException e){
			//e.getMessage();
		}
		
		dispositivoDTO.setDcMonto(dispositivo.getDcMonto());
		dispositivoDTO.setDtFecIng(dispositivo.getDtFecIng());
		dispositivoDTO.setFechaFactura(dispositivo.getFechaFactura());
		dispositivoDTO.setFechaInicioContrato(dispositivo.getFechaInicioContrato());
		
		deviceAppDTO.setDispositivo(dispositivoDTO);

		System.out.println(dispositivo.getMOVDispositivoPK()+"==================");
		
		MOVDispositivoPK movDispositivoPK = dispositivo.getMOVDispositivoPK();
		//BeanUtils.copyProperties(movDispositivoPK, dispositivoPKDTO);
		dispositivoPKDTO.setFinCodCli(movDispositivoPK.getFinCodCli());
		dispositivoPKDTO.setPvcCodIMEI(movDispositivoPK.getPvcCodIMEI());
		dispositivoDTO.setmOVDispositivoPK(dispositivoPKDTO);*/

		return deviceAppDTO;
	}

	public static SEGUsuario segUsuarioDTOToSEGUsuario(SEGUsuarioDTO segUsuarioDTO) {
		SEGUsuario segUsuario = new SEGUsuario();

		SEGUsuarioPK segUsuarioPK = new SEGUsuarioPK();
		MEmpl mEmpl = new MEmpl();
		MEmplPK mEmplPK = new MEmplPK();
		//SEGUsuarioConfiguracion segUsuarioConfiguracion = new SEGUsuarioConfiguracion();
		//SEGUsuarioConfiguracionPK segUsuarioConfiguracionPK = new SEGUsuarioConfiguracionPK();
		Collection<SEGUsuarioHistorico> segUsuarioHistoricos = new ArrayList<>();

		SEGUsuarioPKDTO usuarioPKDTO = segUsuarioDTO.getsEGUsuarioPK();
		BeanUtils.copyProperties(usuarioPKDTO, segUsuarioPK);
		segUsuario.setSEGUsuarioPK(segUsuarioPK);

		MEmplDTO mEmplDTO = segUsuarioDTO.getmEmpl();
		BeanUtils.copyProperties(mEmplDTO, mEmpl);

		MEmplPKDTO emplPKDTO = mEmplDTO.getmEmplPK();
		BeanUtils.copyProperties(emplPKDTO, mEmplPK);
		mEmpl.setMEmplPK(mEmplPK);
		segUsuario.setMEmpl(mEmpl);

		/*
		 * segUsuarioDTO.getsEGUsuarioConfiguracions();
		 * 
		 * SEGUsuarioConfiguracionPKDTO
		 * segUsuarioConfiguracionPKDT=segUsuarioConfiguracionDTO.
		 * getsEGUsuarioConfiguracionPK(); if(segUsuarioConfiguracionPKDT!=null)
		 * BeanUtils.copyProperties(segUsuarioConfiguracionPKDT,
		 * segUsuarioConfiguracionPK);
		 * 
		 * segUsuarioConfiguracion.setSEGUsuarioConfiguracionPK(
		 * segUsuarioConfiguracionPK);
		 * 
		 * BeanUtils.copyProperties(segUsuarioConfiguracionDTO,
		 * segUsuarioConfiguracion);
		 */
		// segUsuario.setSEGUsuarioConfiguracion(segUsuarioConfiguracion);

		for (SEGUsuarioHistoricoDTO segUsuarioHistoricoDTO : segUsuarioDTO.getsEGUsuarioHistoricoCollection()) {
			SEGUsuarioHistorico segUsuarioHistorico = new SEGUsuarioHistorico();
			SEGUsuarioHistoricoPK segUsuarioHistoricoPK = new SEGUsuarioHistoricoPK();

			SEGUsuarioHistoricoPKDTO segUsuarioHistoricoPKDTO = segUsuarioHistoricoDTO.getsEGUsuarioHistoricoPK();
			if (segUsuarioHistoricoPKDTO != null)
				BeanUtils.copyProperties(segUsuarioHistoricoPKDTO, segUsuarioHistoricoPK);

			if (segUsuarioHistoricoDTO != null)
				BeanUtils.copyProperties(segUsuarioHistoricoDTO, segUsuarioHistorico);

			segUsuarioHistorico.setSEGUsuarioHistoricoPK(segUsuarioHistoricoPK);
			segUsuarioHistoricos.add(segUsuarioHistorico);
		}

		BeanUtils.copyProperties(segUsuarioDTO, segUsuario);

		segUsuario.setSEGUsuarioHistoricoCollection(segUsuarioHistoricos);

		return segUsuario;
	}

	public static SEGUsuarioDTO segUsuarioToSEGUsuarioDTO(SEGUsuario segUsuario) {
		SEGUsuarioDTO segUsuarioDTO = new SEGUsuarioDTO();
		SEGUsuarioPKDTO segUsuarioPKDTO = new SEGUsuarioPKDTO();

		Set<SEGPerfilDTO> segPerfilDTOs = new HashSet<>();
		for (SEGPerfil segPerfil : segUsuario.getSegPerfils()) {
			SEGPerfilPK segPerfilPK = segPerfil.getSEGPerfilPK();
			SEGPerfilPKDTO segPerfilPKDTO = new SEGPerfilPKDTO();
			BeanUtils.copyProperties(segPerfilPK, segPerfilPKDTO);
			SEGPerfilDTO segPerfilDTO = new SEGPerfilDTO();
			BeanUtils.copyProperties(segPerfil, segPerfilDTO);
			segPerfilDTO.setsEGPerfilPK(segPerfilPKDTO);
			segPerfilDTOs.add(segPerfilDTO);
		}
		BeanUtils.copyProperties(segUsuario.getSEGUsuarioPK(), segUsuarioPKDTO);
		if (segUsuario.getImImagen() != null) {
			//for image 
			BASE64Encoder base64Encoder = new BASE64Encoder();
			StringBuilder imageString = new StringBuilder();
			imageString.append("data:image/jpg;base64,");
			imageString.append(base64Encoder.encode(segUsuario.getImImagen()));
			segUsuarioDTO.setImage(imageString.toString());
		}
		BeanUtils.copyProperties(segUsuario, segUsuarioDTO);
		segUsuarioDTO.setsEGUsuarioPK(segUsuarioPKDTO);
		segUsuarioDTO.setSegPerfils(segPerfilDTOs);
		return segUsuarioDTO;
	}
	
	public static MOVDeviceAppResponseDTO movDeviceAppToMOVDeviceAppResponseDTO(MOVDeviceApp deviceApp){
		MOVDeviceAppResponseDTO  response=new MOVDeviceAppResponseDTO();
		response.setAppName(deviceApp.getAppName());
		response.setPackageName(deviceApp.getPackageName());
		response.setId(deviceApp.getId());
		response.setBlocked(deviceApp.getBlocked());
		return response;
	}

}
