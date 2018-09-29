package com.skilldistillery.eventtracker.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4201"})
public class PingController {
	
	@RequestMapping(path="ping")
	public String ping() {
		return "pong";
	}

}
