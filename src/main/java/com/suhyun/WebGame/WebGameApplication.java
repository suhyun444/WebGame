package com.suhyun.WebGame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@SpringBootApplication
public class WebGameApplication {

	@GetMapping("")
	public String entry()
	{
		return "redirect:snake";
	}
	@GetMapping("snake")
	public String snake()
	{
		return "snake.html";
	}
	
	public static void main(String[] args) {
		SpringApplication.run(WebGameApplication.class, args);
	}

}
