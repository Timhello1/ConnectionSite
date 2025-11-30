'use client';

import { Box, IconButton } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { useRef, useEffect, useState } from 'react';

interface CustomScrollbarProps {
  children: React.ReactNode;
  className?: string;
}

export default function CustomScrollbar({ children, className }: CustomScrollbarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [showUpButton, setShowUpButton] = useState(false);
  const [showDownButton, setShowDownButton] = useState(false);
  const [thumbPosition, setThumbPosition] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const updateScrollbar = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      
      setShowUpButton(scrollTop > 0);
      setShowDownButton(scrollTop < maxScroll - 1);
      
      // Calculate thumb position and height
      if (maxScroll > 0) {
        const trackHeight = clientHeight - (showUpButton ? 32 : 8) - (showDownButton ? 32 : 8);
        const thumbH = Math.max(20, (clientHeight / scrollHeight) * trackHeight);
        const thumbTop = showUpButton ? 32 : 8;
        const availableSpace = trackHeight - thumbH;
        const thumbPos = (scrollTop / maxScroll) * availableSpace;
        
        setThumbHeight(thumbH);
        setThumbPosition(thumbTop + thumbPos);
      } else {
        setThumbHeight(0);
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      updateScrollbar();
      container.addEventListener('scroll', updateScrollbar);
      const resizeObserver = new ResizeObserver(updateScrollbar);
      resizeObserver.observe(container);
      
      return () => {
        container.removeEventListener('scroll', updateScrollbar);
        resizeObserver.disconnect();
      };
    }
  }, [showUpButton, showDownButton]);

  const scrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: -100, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 100, behavior: 'smooth' });
    }
  };

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    const startY = e.clientY;
    const startScrollTop = scrollContainerRef.current?.scrollTop || 0;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!scrollContainerRef.current) return;
      
      const deltaY = moveEvent.clientY - startY;
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const trackHeight = clientHeight - (showUpButton ? 32 : 8) - (showDownButton ? 32 : 8);
      const thumbH = Math.max(20, (clientHeight / scrollHeight) * trackHeight);
      const availableSpace = trackHeight - thumbH;
      
      const scrollDelta = (deltaY / availableSpace) * maxScroll;
      scrollContainerRef.current.scrollTop = Math.max(0, Math.min(maxScroll, startScrollTop + scrollDelta));
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const hasScroll = thumbHeight > 0 && thumbHeight < (scrollContainerRef.current?.clientHeight || 0);

  return (
    <Box 
      className={className}
      sx={{ 
        position: 'relative', 
        height: '100%', 
        width: '100%',
        display: 'flex',
      }}
    >
      <Box
        ref={scrollContainerRef}
        className="custom-scrollbar-content"
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {children}
      </Box>
      
      {/* Custom Scrollbar */}
      {hasScroll && (
        <Box
          className="custom-scrollbar"
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {/* Up Button */}
          {showUpButton && (
            <IconButton
              size="small"
              onClick={scrollUp}
              sx={{
                pointerEvents: 'auto',
                position: 'absolute',
                top: 4,
                zIndex: 1,
                color: 'text.secondary',
                opacity: 0.6,
                '&:hover': {
                  color: 'primary.main',
                  opacity: 1,
                  bgcolor: 'rgba(217, 119, 6, 0.1)',
                },
              }}
            >
              <KeyboardArrowUp fontSize="small" />
            </IconButton>
          )}

          {/* Vertical Line */}
          <Box
            sx={{
              position: 'absolute',
              top: showUpButton ? '32px' : '8px',
              bottom: showDownButton ? '32px' : '8px',
              width: '1px',
              bgcolor: 'rgba(217, 119, 6, 0.2)',
              pointerEvents: 'none',
            }}
          />

          {/* Scrollbar Thumb */}
          {hasScroll && (
            <Box
              ref={thumbRef}
              onMouseDown={handleThumbMouseDown}
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                top: `${thumbPosition}px`,
                width: '4px',
                height: `${thumbHeight}px`,
                bgcolor: 'rgba(217, 119, 6, 0.5)',
                borderRadius: '2px',
                cursor: isDragging ? 'grabbing' : 'grab',
                pointerEvents: 'auto',
                transition: isDragging ? 'none' : 'background-color 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(217, 119, 6, 0.8)',
                },
              }}
            />
          )}

          {/* Down Button */}
          {showDownButton && (
            <IconButton
              size="small"
              onClick={scrollDown}
              sx={{
                pointerEvents: 'auto',
                position: 'absolute',
                bottom: 4,
                zIndex: 1,
                color: 'text.secondary',
                opacity: 0.6,
                '&:hover': {
                  color: 'primary.main',
                  opacity: 1,
                  bgcolor: 'rgba(217, 119, 6, 0.1)',
                },
              }}
            >
              <KeyboardArrowDown fontSize="small" />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
}