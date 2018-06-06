package com.allianz.spa.data.requests.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.allianz.spa.data.requests.service.ConfigurationService;

@Service
public class ConfigurationServiceImpl implements ConfigurationService {
	
	@Value("${clientApp.resourceId}")
	private String clientAppResourceId;

	public String getClientAppResourceId() {
		return clientAppResourceId;
	}
	
}
