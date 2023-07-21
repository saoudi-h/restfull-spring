package com.saoudi.learnrestapi.services;

import com.saoudi.learnrestapi.Person;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.util.*;

@Service
public class PersonService {
    private static List<Person> personDB = new ArrayList<>();
    static
    {
        personDB.add(new Person(1,"zidane","zinedine","zin@dine.fr","061234564", LocalDate.of(2000,3,1)));
        personDB.add(new Person(2,"FOO","BAR","zin@dine.fr","061234564",LocalDate.of(2000,6,1)));
        personDB.add(new Person(3,"ziZOU","zinedine","zin@dine.fr","061234564",LocalDate.of(2000,1,1)));
    }

    public List<Person> getDB(){
        return personDB;
    }

    public Person getById(int id){
        return personDB.stream().filter((p)->p.getId()==id).findFirst().orElse(null);
    }

    public boolean delete(int id){
        return personDB.removeIf((p)->p.getId()==id);
    }

    public boolean add(Person person){
        if(personDB.stream().filter((p)->p.getId()==person.getId()).count()>0)
            return false;

        personDB.add(person);
        return true;
    }

    public boolean update(Person person){
        Optional<Person>  opPerson = personDB.stream().filter((p)->p.getId()==person.getId()).findFirst();
        if(!opPerson.isPresent()) return false;
        opPerson.get().setId(person.getId());
        opPerson.get().setEmail(person.getEmail());
        opPerson.get().setFirstname(person.getFirstname());
        opPerson.get().setLastname(person.getLastname());
        opPerson.get().setPhone(person.getPhone());
        opPerson.get().setBirthDate(person.getBirthDate());
        return true;
    }

    public boolean patch(int id, Map<String,Object> champs){
        Optional<Person>  opPerson = personDB.stream().filter((p)->p.getId()==id).findFirst();
        if(!opPerson.isPresent() || champs.size()==0) return false;

        Person person = opPerson.get();
        champs.forEach((key,value)-> {
            Field champ = ReflectionUtils.findField(Person.class,  key);
            champ.setAccessible(true);
            ReflectionUtils.setField(champ, person, value);
        });
        return true;

    }
}
