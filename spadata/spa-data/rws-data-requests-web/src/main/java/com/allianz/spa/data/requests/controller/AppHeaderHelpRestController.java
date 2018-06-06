package com.allianz.spa.data.requests.controller;

import org.dozer.DozerBeanMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.allianz.rest.support.model.RESTResponseBean;
import com.allianz.spa.data.requests.model.dto.AppHeaderHelpDTO;
import com.allianz.rws.frontend.core.components.service.AppHeaderHelpRestService;

/**
 * Handles requests for the ApplicationHeaderHelp service.
 */
@RestController
public class AppHeaderHelpRestController implements AppHeaderHelpRestApi {

	private static Logger logger = LoggerFactory.getLogger(AppHeaderHelpRestController.class);

	@Autowired
	private AppHeaderHelpRestService appHeaderHelpService;
	
	@Autowired
	private DozerBeanMapper mapper;

	@Override
	public @ResponseBody ResponseEntity<?> getAppHeaderHelp(
			@RequestParam(value = "pageID", required = false) String pageID,
			@RequestHeader HttpHeaders headers) {

		logger.info("Init getAppHeaderHelp");

		com.allianz.rws.frontend.core.components.model.dto.AppHeaderHelpDTO appHeaderHelpDTO = appHeaderHelpService
				.getApplicationHelp(pageID, "ngx-data-requests");

		AppHeaderHelpDTO appHeaderHelpDTOres = mapper.map(appHeaderHelpDTO, AppHeaderHelpDTO.class);

		return RESTResponseBean.builder().success(true).data(appHeaderHelpDTOres).status(HttpStatus.OK)
				.buildResponseEntity();
	}
}
