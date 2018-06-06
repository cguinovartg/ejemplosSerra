package com.allianz.spa.data.requests.model.dto;

public class LogsDTO {

	private String type;
	private String route;
	private String userAgent;
	private String content;
	
	public LogsDTO() {
		this.type = "";
		this.route = "";
		this.userAgent = "";
		this.content = "";
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getRoute() {
		return route;
	}

	public void setRoute(String route) {
		this.route = route;
	}

	public String getUserAgent() {
		return userAgent;
	}

	public void setUserAgent(String userAgent) {
		this.userAgent = userAgent;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
