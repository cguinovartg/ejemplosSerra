package com.allianz.spa.data.requests.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;


@Api(tags = {"application-header-help"})
@RequestMapping(path = { "/api/application-header-help", "/api/v1/application-header-help" }, produces = {MediaType.APPLICATION_JSON_VALUE} )
public interface AppHeaderHelpRestApi {
	
	@ApiOperation(
			value = "Find menu", 
		    notes = "edit returns"
		    )
	  	@ApiResponses(
	  		value = { 
	  			@ApiResponse(code = 500, message = "Internal server error"),
	  			@ApiResponse(code = 404, message = "Location not found") 
	  		})
		@ApiImplicitParams({
			@ApiImplicitParam(name = "pageID", value = "page Id", required = false, dataType = "string", paramType = "query"),
		})
	@RequestMapping(method = RequestMethod.GET)
	ResponseEntity<?> getAppHeaderHelp(
			@RequestParam(value = "pageID", required = false) String pageID,
			@RequestHeader HttpHeaders headers);	
}