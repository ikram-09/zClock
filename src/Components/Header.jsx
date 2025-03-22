import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Handle scroll behavior
    useEffect(() => {
        const handleScroll = () => {
            setIsHeaderScrolled(window.scrollY >= 85);
            closeMenu(); // Close menu when scrolling
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle click outside and Escape key
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.menu') && !event.target.closest('.burger')) {
                closeMenu();
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') closeMenu();
        };

        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isMenuOpen]);

    return (
        <header className={`header ${isHeaderScrolled ? 'on-scroll' : ''}`} id="header">
            <nav className="navbar container">
                <Link to="/" className="brand">My Clock</Link>
                
                {/* Burger button with improved accessibility */}
                <button 
                    className={`burger ${isMenuOpen ? 'is-active' : ''}`} 
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                    role="button"
                    tabIndex={0}
                >
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                </button>

                {/* Navigation menu */}
                <div className={`menu ${isMenuOpen ? 'is-active' : ''}`} id="menu">
                    <ul className="menu-inner">
                        <li>
                            <Link to="/cities" onClick={closeMenu}>Cities</Link>
                        </li>
                        <li>
                            <Link to="/calendar" onClick={closeMenu}>Calendar</Link>
                        </li>
                    </ul>
                </div>

                {/* Fixed Discover link */}
                <Link to="/discover" className="menu-block" onClick={closeMenu}>
                    Discover
                </Link>
            </nav>
        </header>
    );
};

export default Header;