package com.example.shared;

public interface IMapper<Entity, Dto> {
    Dto toDto(Entity entity);
    Entity toEntity(Dto entityDto);
}
