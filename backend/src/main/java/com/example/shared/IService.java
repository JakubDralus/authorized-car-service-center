package com.example.shared;

public interface IService<T> {
    //basic CRUD operations
    T create(T data);
    T get(Long id);
    T update(T data);
    Boolean delete(Long id);
}
