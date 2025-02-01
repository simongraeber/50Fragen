package com.fragen.quiz;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import javax.sql.DataSource;

@SpringBootApplication
public class ProjectApplication implements CommandLineRunner {
	private static final Logger log = LoggerFactory.getLogger(ProjectApplication.class);

	private final DataSource dataSource;

	@Autowired
	public ProjectApplication(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
	}

	public void run(String... args) {
		log.info("Starting Project Application");
		log.info("DataSource = {}", dataSource);
	}
}
