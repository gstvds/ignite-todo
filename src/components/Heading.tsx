import classnames from 'classnames';

import styles from './Heading.module.css';

interface HeadingProps {
  title: string;
  counter: number;
  variant?: 'created' | 'completed'
  total?: number;
}

export function Heading({ title, variant = 'created', counter, total = 0 }: HeadingProps) {
  return (
    <div className={styles.heading}>
      <strong
        className={classnames(
          styles.headingTitle,
          {
            [styles.completedTitle]: variant === 'completed',
          }
        )}
      >
        {title}
      </strong>
      <div>
        <span>{counter}{total > 0 && ` de ${total}`}</span>
      </div>
    </div>
  );
}