package com.fragen.frontend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * This class is responsible for forwarding all requests to the React frontend.
 */
@Controller
public class ReactController {

    @RequestMapping(value = "/{path:[^\\.]*}", method = RequestMethod.GET)
    public String redirect(@PathVariable String path) {
        return "forward:/index.html";
    }

    // to allow for edirot urls like .../editor/test_123
    @RequestMapping(value = "/editor/{path:[^\\.]*}", method = RequestMethod.GET)
    public String redirectEditor(@PathVariable String path) {
        return "forward:/index.html";
    }
}

