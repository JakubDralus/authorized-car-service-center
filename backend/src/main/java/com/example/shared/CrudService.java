package com.example.shared;

public interface CrudService<T> {
    //basic CRUD operations
    T get(Long id);
    T create(T data);
    T update(T data);
    void delete(Long id);
}
