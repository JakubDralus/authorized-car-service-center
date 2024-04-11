package com.example.shared;

public interface IMapper<Entity, Dto> {
    Dto toDto(Entity entity);
    void toEntity(Dto Dto, Entity entity);
}
