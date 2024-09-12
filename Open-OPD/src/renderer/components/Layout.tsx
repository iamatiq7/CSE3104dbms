/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Channels from 'Channels';
import React from 'react';

interface LayoutProp {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProp> = ({ children }) => {
  return (
    <div className="drawer drawer-mobile relative">
      <input
        id="my-drawer-2"
        type="checkbox"
        defaultChecked
        className="drawer-toggle"
      />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side max-w-xs">
        <label htmlFor="my-drawer-2" className="drawer-overlay" />
        <ul className="menu p-4 pb-0 overflow-y-auto w-80 bg-base-300 text-base-content">
          <li className="pt-5">
            <label htmlFor="subject-modal" className="btn btn-primary">
              ADD Subject
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Layout;
