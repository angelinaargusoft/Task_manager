CREATE TABLE IF NOT EXISTS Tasks (
    id CHAR(36) PRIMARY KEY,
    project_id CHAR(36) NOT NULL,
    created_by CHAR(36) NOT NULL,
    assigned_by CHAR(36) NOT NULL,
    assigned_to CHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_task_project FOREIGN KEY (project_id) REFERENCES Projects(id) ON DELETE CASCADE,
    CONSTRAINT fk_task_created FOREIGN KEY (created_by) REFERENCES Members(id) ON DELETE CASCADE,
    CONSTRAINT fk_task_assigned_by FOREIGN KEY (assigned_by) REFERENCES Members(id) ON DELETE CASCADE,
    CONSTRAINT fk_task_assigned_to FOREIGN KEY (assigned_to) REFERENCES Members(id) ON DELETE CASCADE
);