import React from 'react';

import styles from './NotFoundPage.less';


export default function NotFoundPage() {
  return (
    <div className={styles['content']}>
      <h2>
        Страница не найдена!
      </h2>

      <h3>
        Возможно, данная страница была удалена, либо указан неверный адрес
      </h3>
    </div>
  );
}
