import { useState } from 'react';
import { ClipboardText } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid';

import { Header } from './components/Header';
import { Input } from './components/Input';
import { Task } from './components/Task';
import { Heading } from './components/Heading';

import './global.css';
import styles from './App.module.css';

interface Task {
  id: string;
  title: string;
  completed?: boolean;
}

function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleCreateTask() {
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: uuidv4(),
        title: taskTitle,
        completed: false,
      },
    ]);
    setTaskTitle('');
  }

  function handleCheckTask(taskId: string) {
    setTasks(tasks.map((task) => {
      if (task.id === taskId) return { ...task, completed: !task.completed }
      return task
    }));
  }

  function handleDeleteTask(taskId: string) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          <div className={styles.inputWrapper}>
            <Input
              disabled={taskTitle === ''}
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              onSubmit={handleCreateTask}
              placeholder="Adicione uma nova tarefa"
              onCreate={handleCreateTask}
            />
          </div>
          <main className={styles.taskContainer}>
            <div className={styles.headingsContainer}>
              <Heading title="Tarefas criadas" counter={tasks.length} />
              <Heading
                title="Concluídas"
                counter={tasks.reduce((acc, task) => {
                  if (task.completed) acc += 1;
                  return acc;
                }, 0)
                }
                total={tasks.length}
                variant="completed"
              />
            </div>
            <div className={styles.taskWrapper}>
              {
                tasks.length === 0 ? (
                  <div className={styles.emptyContainer}>
                    <ClipboardText size={56} />
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <span>Crie tarefas e organize seus itens a fazer</span>
                  </div>
                ) : (
                  <>
                    {
                      tasks
                        .sort((taskA, taskB) => {
                          if (taskA.completed && !taskB.completed) return 1;
                          if (!taskA.completed && taskB.completed) return -1;
                          else return 0;
                        })
                        .map((task) => (
                          <Task
                            key={task.id}
                            title={task.title}
                            onCheck={() => handleCheckTask(task.id)}
                            onDelete={() => handleDeleteTask(task.id)}
                            completed={task.completed}
                          />
                        ))
                    }
                  </>
                )}
            </div>
          </main>
        </div>
      </div >
    </div >
  )
}

export default App
