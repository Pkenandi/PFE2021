package com.dravicenne.backend.controllers;

import com.dravicenne.backend.services.CodeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@ResponseBody
@RequestMapping(path = "/api/code")
public class CodeController {
    private final CodeService codeService;

}
