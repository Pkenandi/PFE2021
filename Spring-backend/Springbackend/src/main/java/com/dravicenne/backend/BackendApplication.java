package com.dravicenne.backend;

import com.dravicenne.backend.users.User;
import com.dravicenne.backend.users.UserRepository;
import com.dravicenne.backend.users.medecin.MedecinRepository;
import com.dravicenne.backend.users.patient.Patient;
import com.dravicenne.backend.users.patient.PatientRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.time.LocalDate;
import java.util.Arrays;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {

		ApplicationContext ctx = SpringApplication.run(BackendApplication.class, args);

	}

	@Bean
	public CorsFilter corsFilter()
	{
		CorsConfiguration corsConfiguration =  new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin","Content-Type","Accept","Authorization","Origin, Accept",
				"X-Requested-With","Access-Control-Request-Method","Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin","Content-Type","Accept","Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Origin","Access-Control-Allow-Credentials"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET","POST","DELETE","PUT","OPTIONS"));
		UrlBasedCorsConfigurationSource basedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		basedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter((CorsConfigurationSource) basedCorsConfigurationSource);
	}

}
