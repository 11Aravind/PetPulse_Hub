import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaBox, 
  FaListAlt, 
  FaShoppingCart, 
  FaUserCog, 
  FaImages, 
  FaBlog, 
  FaChevronDown, 
  FaChevronUp, 
  FaPlus, 
  FaChevronRight,
  FaChevronLeft
} from 'react-icons/fa';
import { useEffect, useState } from 'react';

const menuItems = [
  { 
    title: 'Dashboard', 
    path: '/',
    icon: <FaHome className="w-5 h-5" />,
    exact: true
  },
  { 
    title: 'Products', 
    path: '/productdetails',
    icon: <FaBox className="w-5 h-5" />
  },
  { 
    title: 'Categories', 
    path: '/categories',
    icon: <FaListAlt className="w-5 h-5" />,
    submenu: [
      { title: 'All Categories', path: '/categories' }
    ]
  },
  { 
    title: 'Orders', 
    path: '/orderdetails',
    icon: <FaShoppingCart className="w-5 h-5" />
  },
  { 
    title: 'Blogs', 
    path: '/blogs',
    icon: <FaBlog className="w-5 h-5" />
  },
  { 
    title: 'Gallery', 
    path: '/gallery',
    icon: <FaImages className="w-5 h-5" />
  },
  { 
    title: 'Caretakers', 
    path: '/caretaking',
    icon: <FaUserCog className="w-5 h-5" />
  },
];

const NavItem = ({ item, isActive, isOpen, onToggle, isSidebarOpen }) => {
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const navigate = useNavigate();
  
  if (hasSubmenu) {
    return (
      <div className="mb-1">
        <button
          onClick={() => onToggle(item.path)}
          className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
            isActive ? 'bg-indigo-900 text-white' : 'text-indigo-100 hover:bg-indigo-700'
          }`}
        >
          <div className="flex items-center">
            <span className="flex-shrink-0">{item.icon}</span>
            {isSidebarOpen && <span className="ml-3">{item.title}</span>}
          </div>
          {isSidebarOpen && (
            <span className="ml-2">
              {isOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </span>
          )}
        </button>
        
        {isOpen && isSidebarOpen && (
          <div className="mt-1 ml-8 space-y-1">
            {item.submenu.map((subItem) => (
              <Link
                key={subItem.path}
                to={subItem.path}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === subItem.path
                    ? 'bg-indigo-900 text-white'
                    : 'text-indigo-200 hover:bg-indigo-700'
                }`}
              >
                {subItem.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors mb-1 ${
        isActive ? 'bg-indigo-900 text-white' : 'text-indigo-100 hover:bg-indigo-700'
      }`}
    >
      <span className="flex-shrink-0">{item.icon}</span>
      {isSidebarOpen && <span className="ml-3">{item.title}</span>}
    </Link>
  );
};

const Sidebar = ({ isOpen: isSidebarOpen, onToggle }) => {
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState({});
  
  const toggleSubmenu = (path) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };
  
  // Auto-expand submenu if on a submenu page
  useEffect(() => {
    const currentItem = menuItems.find(item => 
      item.submenu?.some(subItem => location.pathname === subItem.path)
    );
    
    if (currentItem?.path) {
      setOpenSubmenus(prev => ({
        ...prev,
        [currentItem.path]: true
      }));
    }
  }, [location.pathname]);

  return (
    <div 
      className={`bg-indigo-800 text-white transition-all duration-300 ease-in-out flex flex-col ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-indigo-700">
        {isSidebarOpen && <h1 className="text-xl font-bold">PetPulse Hub</h1>}
        <button 
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-4 px-2">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path) && 
                (item.path !== '/' || location.pathname === '/');
                
            return (
              <NavItem
                key={item.path}
                item={item}
                isActive={isActive}
                isOpen={!!openSubmenus[item.path]}
                onToggle={toggleSubmenu}
                isSidebarOpen={isSidebarOpen}
              />
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
