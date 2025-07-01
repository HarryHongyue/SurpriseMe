import React from 'react';

/**
 * Professional Footer component inspired by tech industry leaders
 * Horizontal layout with clean sections and modern design
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          {/* Company/Brand Section */}
          <div className="footer-column">
            <div className="logo">
              <img src="/logo.png" alt="SurpriseMe" style={{height: '32px', width: 'auto'}} />
              <span style={{fontSize: '1.5rem', marginLeft: '8px'}}>SurpriseMe</span>
            </div>
            <p style={{marginTop: '15px', lineHeight: '1.6', color: '#aaa'}}>
              Bringing surprise and joy to your browsing.<br />
              A Chrome extension that transforms your<br />
              everyday web experience into something magical.
            </p>
            <div className="social-links">
              <a href="https://github.com/HarryHongyue/SurpriseMe" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" aria-label="Chrome Web Store">
                <i className="fab fa-chrome"></i>
              </a>
              {/* <a href="https://twitter.com/surpriseme_ext" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a> */}
              <a href="mailto:support@surpriseme.com" aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="footer-column">
            <h3>Navigation</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="/download">Download</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="footer-column">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li><a href="/docs">Documentation</a></li>
              <li><a href="/tutorials">Tutorials</a></li>
              <li><a href="/api">API Reference</a></li>
              <li><a href="/changelog">Changelog</a></li>
              <li><a href="/community">Community</a></li>
            </ul>
          </div>
          
          {/* Contact & Legal */}
          <div className="footer-column" style={{
            flex: '0 0 auto',
            minWidth: 'max-content',
            whiteSpace: 'nowrap'
          }}>
            <h3>Connect</h3>
            <ul className="footer-links" style={{whiteSpace: 'nowrap'}}>
              <li style={{display: 'flex', alignItems: 'center', whiteSpace: 'nowrap'}}>
                <i className="fas fa-map-marker-alt" style={{
                  marginRight: '8px', 
                  color: 'var(--primary-color)',
                  flexShrink: 0
                }}></i>
                Worldwide
              </li>
              <li style={{display: 'flex', alignItems: 'center', whiteSpace: 'nowrap'}}>
                <i className="fas fa-envelope" style={{
                  marginRight: '8px', 
                  color: 'var(--primary-color)',
                  flexShrink: 0
                }}></i>
                <a href="mailto:support@surpriseme.com" style={{whiteSpace: 'nowrap'}}>
                  support@surpriseme.com
                </a>
              </li>
              <li style={{display: 'flex', alignItems: 'center', whiteSpace: 'nowrap'}}>
                <i className="fas fa-phone" style={{
                  marginRight: '8px', 
                  color: 'var(--primary-color)',
                  flexShrink: 0
                }}></i>
                <a href="/support" style={{whiteSpace: 'nowrap'}}>
                  24/7 Support
                </a>
              </li>
            </ul>
            <div style={{marginTop: '20px'}}>
              <ul className="footer-links" style={{
                fontSize: '0.85rem',
                whiteSpace: 'nowrap'
              }}>
                <li><a href="/privacy" style={{whiteSpace: 'nowrap'}}>Privacy Policy</a></li>
                <li><a href="/terms" style={{whiteSpace: 'nowrap'}}>Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px'}}>
            <p>&copy; {currentYear} SurpriseMe. All rights reserved.</p>
            <div style={{display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.9rem'}}>
              <span style={{color: '#aaa'}}>Made with ❤️ for Chrome users</span>
              <div style={{display: 'flex', gap: '15px'}}>
                <a href="/sitemap" style={{color: '#aaa', fontSize: '0.85rem'}}>Sitemap</a>
                <a href="/rss" style={{color: '#aaa', fontSize: '0.85rem'}}>RSS</a>
                <span style={{color: '#555'}}>|</span>
                <span style={{color: '#aaa', fontSize: '0.85rem'}}>Status: All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;