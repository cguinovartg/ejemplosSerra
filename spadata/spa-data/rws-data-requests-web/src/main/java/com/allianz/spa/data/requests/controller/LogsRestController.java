package com.allianz.spa.data.requests.controller;

import org.dozer.DozerBeanMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.allianz.rest.support.model.RESTResponseBean;
import com.allianz.spa.data.requests.model.dto.LogsDTO;
import com.allianz.rws.frontend.log.service.LogsRestService;

/**
 * Handles requests for the Logs service.
 */
@RestController
public class LogsRestController implements LogsRestApi {

	private static Logger logger = LoggerFactory.getLogger(LogsRestController.class);

	@Autowired
	private LogsRestService logsRestService;

	@Autowired
	private DozerBeanMapper mapper;

	@Override
	public @ResponseBody ResponseEntity<?> logger(@RequestBody LogsDTO input) {

		logger.info("Init logger");

		com.allianz.rws.frontend.log.model.dto.LogsDTO logsDto = mapper.map(input,
				com.allianz.rws.frontend.log.model.dto.LogsDTO.class);
		logsDto.setContext("ngx-data-requests");
		logsRestService.logger(logsDto);

		return RESTResponseBean.builder().success(true).status(HttpStatus.OK).buildResponseEntity();

	}
}
