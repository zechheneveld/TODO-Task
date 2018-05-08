package com.zech.mongoTODO.repository;

import com.zech.mongoTODO.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task, String> {
}
