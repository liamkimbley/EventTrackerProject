package com.skilldistillery.eventtracker.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin({"*", "http://localhost:4201"})
public class RootController {
	
	@RequestMapping(path="/")
    public String home() {
        return "index.html";
    }

}
