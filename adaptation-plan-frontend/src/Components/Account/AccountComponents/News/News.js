import React, { useEffect } from 'react';
import './News.css';

function News() {
  
  useEffect( () => {
    document.title = 'Новости'
  }, [])
  
  return (
    <div className="news">
      Пока нет новостей!
    </div>
  );
}

export default News;