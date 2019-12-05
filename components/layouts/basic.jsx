import React from 'react';

const BasicLayout = (props) => {
  const [header, main, aside, footer] = props.children;
  return (
    <div>
      <header>
        {header}
      </header>
      <main>
        {main}
      </main>
      <aside>
        {aside}
      </aside>
      <footer>
        {footer}
        <p>Copyright &copy; 2019</p>
      </footer>
    </div>
  );
};

BasicLayout.sections = ['header', 'main', 'aside', 'footer'];

export default BasicLayout;