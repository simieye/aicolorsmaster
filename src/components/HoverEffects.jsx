// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { cn } from '@/lib/utils';

export const HoverCard = ({
  children,
  className = '',
  hoverClassName = '',
  scale = true,
  shadow = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return <div className={`
        transition-all duration-300 ease-out
        ${scale ? 'hover:scale-105' : ''}
        ${shadow ? 'hover:shadow-lg' : ''}
        ${isHovered ? hoverClassName : ''}
        ${className}
      `} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} {...props}>
      {children}
    </div>;
};
export const HoverButton = ({
  children,
  className = '',
  hoverBg = 'hover:bg-primary/10',
  hoverScale = true,
  ...props
}) => {
  return <button className={`
        transition-all duration-200 ease-out
        ${hoverBg}
        ${hoverScale ? 'hover:scale-105 active:scale-95' : ''}
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${className}
      `} {...props}>
      {children}
    </button>;
};
export const HoverImage = ({
  src,
  alt,
  className = '',
  zoom = 1.1,
  overlay = false,
  overlayContent = null,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return <div className={`
        relative overflow-hidden
        ${className}
      `} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} {...props}>
      <img src={src} alt={alt} className={`
          w-full h-full object-cover
          transition-transform duration-300 ease-out
          ${isHovered ? `scale-${zoom}` : 'scale-100'}
        `} />
      
      {overlay && <div className={`
          absolute inset-0 bg-black/40
          transition-opacity duration-300 ease-out
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          {overlayContent && <div className="absolute inset-0 flex items-center justify-center">
              {overlayContent}
            </div>}
        </div>}
    </div>;
};
export const HoverTooltip = ({
  children,
  content,
  position = 'top',
  className = '',
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };
  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 -mt-1 border-t-gray-900 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 -mb-1 border-b-gray-900 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 transform -translate-y-1/2 -ml-1 border-l-gray-900 border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 transform -translate-y-1/2 -mr-1 border-r-gray-900 border-t-transparent border-b-transparent border-l-transparent'
  };
  return <div className="relative inline-block" {...props}>
      <div onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} className={className}>
        {children}
      </div>

      {showTooltip && content && <div className={`
          absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap
          transition-opacity duration-200
          ${positionClasses[position]}
        `}>
          {content}
          <div className={`
            absolute w-0 h-0 border-4
            ${arrowClasses[position]}
          `}></div>
        </div>}
    </div>;
};
export const RippleEffect = ({
  children,
  className = '',
  ...props
}) => {
  const [ripples, setRipples] = useState([]);
  const createRipple = e => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size
    };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };
  return <div className={`
        relative overflow-hidden
        ${className}
      `} onMouseDown={createRipple} {...props}>
      {children}
      
      {ripples.map(ripple => <span key={ripple.id} className="absolute bg-white/30 rounded-full animate-ping" style={{
      left: ripple.x,
      top: ripple.y,
      width: ripple.size,
      height: ripple.size,
      animation: 'ripple 0.6s ease-out'
    }} />)}
    </div>;
};
export const SlideInOnHover = ({
  children,
  direction = 'left',
  distance = 10,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const transformClasses = {
    left: isHovered ? 'translate-x-0' : `translate-x-${distance}`,
    right: isHovered ? 'translate-x-0' : `-translate-x-${distance}`,
    up: isHovered ? 'translate-y-0' : `translate-y-${distance}`,
    down: isHovered ? 'translate-y-0' : `-translate-y-${distance}`
  };
  return <div className={`
        transition-transform duration-300 ease-out
        ${transformClasses[direction]}
        ${className}
      `} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} {...props}>
      {children}
    </div>;
};
export default HoverEffects;