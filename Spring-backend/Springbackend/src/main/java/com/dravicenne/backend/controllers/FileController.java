package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.Medecin;
import com.dravicenne.backend.models.Patient;
import com.dravicenne.backend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@AllArgsConstructor
@RestController
@RequestMapping(path ="/file")
public class FileController {

    private final UserService userService;
    // emplacement du fichier
    public static final String DIRECTORY = System.getProperty("user.home") + ("/Documents/Mes_Projets/PFE/Programmation/Angular-frontend/src/assets/files/");

     // upload
    @PostMapping(value ="/upload/patient/{username}")
    public ResponseEntity<List<String>> profilePatient(@RequestParam("files")List<MultipartFile> multipartFiles,
                                                       @PathVariable final String username)throws IOException {
        List<String> filenames = new ArrayList<>();

        for(MultipartFile file: multipartFiles){
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            Path fileStorage = get(DIRECTORY, filename)
                    .toAbsolutePath()
                    .normalize();
            copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
            filenames.add(filename);
        }
        this.userService.setProfilePatient(filenames.get(0),username);
        return ResponseEntity.ok().body(filenames);
    }

    @PostMapping(value ="/upload/medecin/{cin}")
    public ResponseEntity<List<String>> profileMedecin(@RequestParam("files")List<MultipartFile> multipartFiles,
                                                       @PathVariable final String cin)throws IOException {
        List<String> filenames = new ArrayList<>();

        for(MultipartFile file: multipartFiles){
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            Path fileStorage = get(DIRECTORY, filename)
                    .toAbsolutePath()
                    .normalize();
            copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
            filenames.add(filename);
        }
        this.userService.setProfileMedecin(filenames.get(0),cin); // save in database
        return ResponseEntity.ok().body(filenames);
    }

    // download
    @GetMapping(value = "download/{filename}")
    public ResponseEntity<Resource>downloadFiles(@PathVariable final String filename) throws IOException{
        Path filePath = get(DIRECTORY)
                .toAbsolutePath()
                .normalize()
                .resolve(filename);

        if(!Files.exists(filePath)){
            throw new FileNotFoundException(filename + " File not found ");
        }

        Resource resource = new UrlResource(filePath.toUri());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("File-Name", filename);
        httpHeaders.add(HttpHeaders.CONTENT_DISPOSITION,"attachment;File-Name=" + resource.getFilename());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType((Files.probeContentType(filePath))))
                .headers(httpHeaders)
                .body(resource);
    }
}
