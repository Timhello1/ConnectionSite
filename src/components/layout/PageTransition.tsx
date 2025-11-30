'use client';

import { Box, Slide, Fade } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState, ReactNode, useRef } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isVisible, setIsVisible] = useState(true);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setIsVisible(true);
        prevPathnameRef.current = pathname;
      }, 150);

      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Slide
        direction="left"
        in={isVisible}
        timeout={400}
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Fade in={isVisible} timeout={400}>
            <Box sx={{ width: '100%', height: '100%' }}>
              {displayChildren}
            </Box>
          </Fade>
        </Box>
      </Slide>
    </Box>
  );
}

