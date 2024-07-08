import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { menus } from '../../config/menus';
import './Menu.css';

function Menu() {
  const { user } = useAuth();

  return (
    <div className="menu-container">
      {menus.map((menu) => (
        <div key={menu.name} className="menu-section">
          <h2>{menu.name}</h2>
          <div className="cards-container">
            {menu.actions.map(
              (action) =>
                user?.permissions.includes(action.permission) &&
                (action.route ? (
                  <Link key={action.name} to={action.route} className="card-link">
                    <div className="card">{action.name}</div>
                  </Link>
                ) : (
                  <div key={action.name} className="card disabled">
                    {action.name}
                  </div>
                )),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Menu;
