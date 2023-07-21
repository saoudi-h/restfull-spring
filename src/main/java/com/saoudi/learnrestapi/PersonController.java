package com.saoudi.learnrestapi;

import com.saoudi.learnrestapi.services.PersonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.time.LocalDate;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping(path="/personnes")
public class PersonController {

    // TODO create core Personcontroller

    private PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping

    public List<Person> getAll(){
        return personService.getDB();
    }

    @GetMapping(path="{id}")
    public Person getById(@PathVariable int id){
        return personService.getById(id);
    }


    @DeleteMapping(path="{id}")
    public boolean delete(@PathVariable int id){
        return personService.delete(id);
    }

    @PostMapping
    public boolean add(@RequestBody Person person){
        person.setId(new Random().nextInt(2000 - 1000 + 1) + 1000);
        return personService.add(person);
    }

    @PutMapping(path="{id}")
    public boolean update(@PathVariable int id, @RequestBody Person person){
        person.setId(id);
        return personService.update(person);
    }

    @PatchMapping(path="{id}")
    public boolean patch(@PathVariable int id, @RequestBody Map<String,Object> champs){
        return personService.patch(id,champs);
    }


}
