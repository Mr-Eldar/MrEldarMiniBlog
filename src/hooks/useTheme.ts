import { useLayoutEffect, useState } from 'react'

export const useTheme = () => {
   const [theme, setTheme] = useState<'light' | 'dark'>(() => {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
   })

   useLayoutEffect(() => {
      document.body.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
   }, [theme])

   return { theme, setTheme }
};
