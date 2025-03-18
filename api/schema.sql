CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    -- status TEXT CHECK (status IN ('todo', 'in_progress', 'done')),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE IF NOT EXISTS subtasks (
--     id TEXT PRIMARY KEY,
--     parent_id TEXT,
--     todo_id TEXT NOT NULL,
--     title TEXT NOT NULL,
--     description TEXT,
--     status TEXT CHECK (status IN ('todo', 'in_progress', 'done')),
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
--     FOREIGN KEY (parent_id) REFERENCES subtasks(id) ON DELETE CASCADE
-- );