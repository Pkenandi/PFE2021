package com.dravicenne.backend.controllers;

import com.dravicenne.backend.models.Mail;
import com.dravicenne.backend.services.MailService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@ResponseBody
@AllArgsConstructor
@RequestMapping("mail")
public class MailController {
    private final MailService mailService;

    @PostMapping(value = "/send")
    public void send(@RequestBody final Mail mail){
        this.mailService.sendMail(mail);
    }

}
