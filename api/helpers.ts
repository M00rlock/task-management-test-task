// helpers.ts
import { Database } from 'sqlite3';
import { ITask, ISubtask } from './tasks.interface';

/**
 * Generates a hierarchical ID based on parent ID and existing siblings.
 * @param parentId - The parent task ID (or null for top-level tasks).
 * @param existingSiblings - Array of existing sibling tasks.
 * @returns The generated hierarchical ID.
 */
export function generateId(parentId: string | null, existingSiblings: ITask[]): string {

    return (existingSiblings.length + 1).toString();

    // if (!parentId) {
    //     // Generate top-level task ID ("1", "2", "3", etc.)
    //     return (existingSiblings.length + 1).toString();
    // } else {
    //     // Generate subtask ID based on parent (e.g., "1.1", "1.2", "1.2.1")
    //     const siblingNumbers = existingSiblings
    //         .filter(s => s.parent_id === parentId)
    //         .map(s => parseInt(s.id.split('.').pop()!, 10))
    //         .sort((a, b) => a - b);

    //     const nextNumber = siblingNumbers.length ? siblingNumbers[siblingNumbers.length - 1] + 1 : 1;
    //     return `${parentId}.${nextNumber}`;
    // }
}

/**
 * Recursively inserts subtasks into the database.
 * @param db - The SQLite database instance.
 * @param subtasks - Array of subtasks to insert.
 * @param todo_id - The parent todo ID.
 * @param parent_id - The parent subtask ID (or null for top-level subtasks).
 * @returns A promise resolving when all subtasks are inserted.
 */
// export function addSubtasks(db: Database, subtasks: ISubtask[], todo_id: string, parent_id: string | null): Promise<void> {
//     return new Promise((resolve, reject) => {
//         db.all('SELECT id, parent_id FROM subtasks', [], (err: Error | null, existingSubtasks: IExistingSiblings[]) => {
//             if (err) return reject(err);

//             let count = subtasks.length;

//             if (count === 0) return resolve();

//             subtasks.forEach(subtask => {
//                 const subtaskId = generateId(parent_id, existingSubtasks);
                
//                 db.run(
//                     'INSERT INTO subtasks (id, parent_id, todo_id, title, description, status) VALUES (?, ?, ?, ?, ?, ?)',
//                     [subtaskId, parent_id, todo_id, subtask.title, subtask.description, subtask.status || 'todo'],
//                     function (err) {
//                         if (err) return reject(err);

//                         if (subtask.subtasks && subtask.subtasks.length > 0) {
//                             addSubtasks(db, subtask.subtasks, todo_id, subtaskId).then(() => {
//                                 count--;
//                                 if (count === 0) resolve();
//                             }).catch(reject);
//                         } else {
//                             count--;
//                             if (count === 0) resolve();
//                         }
//                     }
//                 );
//             });
//         });
//     });
// }
