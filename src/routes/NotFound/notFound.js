import React from 'react';

import styles from './NotFound.less';


export default function NotFound() {
  return (
    <div className={styles['container']}>
      <h2>
        Страница не найдена!
      </h2>

      <h3>
        Возможно, данная страница была удалена, либо указан неверный адрес
      </h3>
    </div>
  );
}
