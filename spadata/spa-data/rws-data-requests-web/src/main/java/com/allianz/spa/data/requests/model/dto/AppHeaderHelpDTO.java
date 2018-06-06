package com.allianz.spa.data.requests.model.dto;

public class AppHeaderHelpDTO {
	
	private String pageID;
	private String context;
	private String url;
	private String description;
	private String lang;
	
	public AppHeaderHelpDTO() {
		this.onInit();
	}
	
	private void onInit() {
		this.pageID = "";
		this.context = "";
		this.url = "";
		this.description = "";
		this.lang = "";
	}

	public String getPageID() {
		return pageID;
	}

	public void setPageID(String pageID) {
		this.pageID = pageID;
	}

	public String getContext() {
		return context;
	}

	public void setContext(String context) {
		this.context = context;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}
}
