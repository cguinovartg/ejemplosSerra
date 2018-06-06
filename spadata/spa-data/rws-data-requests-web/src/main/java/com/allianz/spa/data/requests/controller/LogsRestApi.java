package com.allianz.spa.data.requests.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.allianz.spa.data.requests.model.dto.LogsDTO;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;


@Api(tags = {"logs"})
@RequestMapping(path = { "/api/logs", "/api/v1/logs" }, produces = {MediaType.APPLICATION_JSON_VALUE} )
public interface LogsRestApi {
	
	@ApiOperation(
			value = "Create logs", 
		    notes = "Create logs")
	  	@ApiResponses(
	  		value = { 
	  			@ApiResponse(code = 500, message = "Internal server error"),
	  		})
	@RequestMapping(method = RequestMethod.POST)
	ResponseEntity<?> logger(LogsDTO emp);	
}
