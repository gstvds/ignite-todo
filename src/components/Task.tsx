import classnames from 'classnames';
import { Trash, Circle, CheckCircle } from 'phosphor-react';

import styles from './Task.module.css';

interface TaskProps {
  title: string;
  onCheck: () => void;
  onDelete: () => void;
  completed?: boolean;
}

export function Task({ title, onCheck, onDelete, completed }: TaskProps) {
  return (
    <div className={styles.container}>
      <div>
        {completed ? (
          <CheckCircle className={styles.checked} weight="fill" onClick={onCheck} />
        ) : (
          <Circle className={styles.unchecked} onClick={onCheck} />
        )}
        <span
          onClick={onCheck}
          className={classnames(
            styles.taskText,
            {
              [styles.checkedText]: completed
            }
          )}
        >
          {title}
        </span>
      </div>
      <Trash size={24} className={styles.trash} onClick={onDelete} />
    </div>
  )
}