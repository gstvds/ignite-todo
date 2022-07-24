import { InputHTMLAttributes } from 'react';
import { PlusCircle } from 'phosphor-react';

import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onCreate: () => void;
  disabled?: boolean;
}

export function Input({ onCreate, disabled = false, ...rest }: InputProps) {
  return (
    <form className={styles.container} onSubmit={onCreate}>
      <input {...rest} />
      <button type="submit" onClick={onCreate} disabled={disabled}>
        Criar
        <PlusCircle size={16} weight="bold" />
      </button>
    </form>
  );
}
