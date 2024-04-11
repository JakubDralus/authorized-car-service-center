package com.example.shared;

import org.springframework.data.crossstore.ChangeSetPersister;

public interface IService<T> {
    //basic CRUD operations
    T get(Long id);
    T create(T data);
    T update(T data);
    Boolean delete(Long id);
}
