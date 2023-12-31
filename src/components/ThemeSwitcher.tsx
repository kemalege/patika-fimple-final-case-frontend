import { useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
  const { toggleColorMode } = useColorMode()

  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const chakraMode = localStorage.getItem('chakra-ui-color-mode');
    if (chakraMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toggleColorMode()
  };
  return (
    <button onClick={handleThemeSwitch}>Switch Theme</button> 
  )
}

export default ThemeSwitcher