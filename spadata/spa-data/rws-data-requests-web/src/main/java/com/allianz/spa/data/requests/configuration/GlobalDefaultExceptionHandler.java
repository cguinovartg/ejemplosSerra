package com.allianz.spa.data.requests.configuration;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;

import com.allianz.rest.support.service.GlobalExceptionHandlerBase;

@ControllerAdvice  
@RestController  
public class GlobalDefaultExceptionHandler extends GlobalExceptionHandlerBase  {
	
}